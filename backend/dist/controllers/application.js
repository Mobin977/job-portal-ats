import { prisma } from '../config/prisma.js';
export const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const candidate = await prisma.candidate.findUnique({ where: { userId: req.user.id } });
        if (!candidate) {
            res.status(403).json({ error: 'Candidate context profiling not valid.' });
            return;
        }
        if (!req.file) {
            res.status(400).json({ error: 'Resume manifest upload stream required.' });
            return;
        }
        const job = await prisma.job.findUnique({ where: { id: String(jobId) } });
        if (!job) {
            res.status(404).json({ error: 'Target posting record unavailable.' });
            return;
        }
        const simulatedParsedText = req.file.buffer.toString('utf-8', 0, 1000) + " " + candidate.skills.join(" ");
        const matches = job.requirements.filter((reqSkill) => simulatedParsedText.toLowerCase().includes(reqSkill.toLowerCase()));
        const atsScore = Math.round((matches.length / job.requirements.length) * 100) || 0;
        const application = await prisma.application.create({
            data: {
                jobId: job.id,
                candidateId: candidate.id,
                parsedText: simulatedParsedText,
                atsScore,
                status: 'APPLIED',
            },
        });
        res.status(201).json({ message: 'Submission indexed securely.', application });
    }
    catch (error) {
        res.status(500).json({ error: 'Submission runtime processor error.' });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Explicit type-casting patches the strict unique inputs matching restriction
        const application = await prisma.application.update({
            where: {
                id: String(id)
            },
            data: {
                status: status
            },
        });
        res.status(200).json(application);
    }
    catch (error) {
        res.status(500).json({ error: 'Applicant tracking update trace failed.' });
    }
};
export const getRecruiterApplications = async (req, res) => {
    try {
        const recruiter = await prisma.recruiter.findUnique({ where: { userId: req.user.id } });
        if (!recruiter) {
            res.status(403).json({ error: 'Unauthorized profile record entry.' });
            return;
        }
        const entries = await prisma.application.findMany({
            where: { job: { recruiterId: recruiter.id } },
            include: {
                job: { select: { title: true } },
                candidate: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
            },
            orderBy: { atsScore: 'desc' },
        });
        res.status(200).json(entries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve applications.' });
    }
};
//# sourceMappingURL=application.js.map