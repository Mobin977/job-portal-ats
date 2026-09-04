import { prisma } from '../config/prisma.js';
/**
 * Creates a new corporate posting layout linked to a recruiter profile
 */
export const createJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salaryRange } = req.body;
        // Validate request body structures
        if (!title || !description || !Array.isArray(requirements) || !location) {
            res.status(400).json({ error: 'Missing core descriptive parameters or malformed requirements layout.' });
            return;
        }
        // Verify requesting recruiter mapping records match a valid schema object
        const recruiter = await prisma.recruiter.findUnique({
            where: { userId: req.user.id }
        });
        if (!recruiter) {
            res.status(403).json({ error: 'Authorized corporate recruiter profile trace not found.' });
            return;
        }
        // Write operational layout into relational target matrices
        const job = await prisma.job.create({
            data: {
                recruiterId: recruiter.id,
                title: String(title),
                description: String(description),
                requirements: requirements.map(String),
                location: String(location),
                salaryRange: salaryRange ? String(salaryRange) : null,
            },
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ error: 'Job distribution registration fault across target metrics.' });
    }
};
/**
 * Executes high-performance search queries with flexible location or content text match queries
 */
export const searchJobs = async (req, res) => {
    try {
        const { search, location } = req.query;
        const targetJobs = await prisma.job.findMany({
            where: {
                isActive: true,
                AND: [
                    search ? {
                        OR: [
                            { title: { contains: String(search), mode: 'insensitive' } },
                            { description: { contains: String(search), mode: 'insensitive' } },
                        ]
                    } : {},
                    location ? {
                        location: { contains: String(location), mode: 'insensitive' }
                    } : {},
                ]
            },
            include: {
                recruiter: {
                    select: {
                        companyName: true,
                        companyLogo: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(targetJobs);
    }
    catch (error) {
        res.status(500).json({ error: 'Discovery index calculation query execution failure.' });
    }
};
//# sourceMappingURL=job.js.map