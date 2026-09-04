import { PrismaClient, Role, ApplicationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[SEEDER UNIT]: Starting platform database provisioning runtime...');

  // 1. Wipe any leftover data to prevent duplicate primary key failures
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.recruiter.deleteMany({});
  await prisma.candidate.deleteMany({});
  await prisma.user.deleteMany({});

  const defaultPasswordHash = await bcrypt.hash('TestPassword123', 12);

  // 2. Provision Corporate Recruiters
  const recruiterUser = await prisma.user.create({
    data: {
      email: 'recruiter@talentforge.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Sarah',
      lastName: 'Jenkins',
      role: Role.RECRUITER,
      recruiter: {
        create: {
          companyName: 'TalentForge Tech Corp',
        }
      }
    },
    include: { recruiter: true }
  });

  // 3. Provision Administrative Systems Account
  await prisma.user.create({
    data: {
      email: 'admin@talentforge.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Alex',
      lastName: 'Mercer',
      role: Role.ADMIN,
    }
  });

  // 4. Distribute Technical Job Openings
  const jobReact = await prisma.job.create({
    data: {
      recruiterId: recruiterUser.recruiter!.id,
      title: 'Senior React Developer (TypeScript)',
      location: 'Remote, US',
      salaryRange: '$120,000 - $145,000',
      requirements: ['React', 'TypeScript', 'Tailwind', 'Redux'],
      description: 'We are seeking an expert developer to handle core scaling patterns across frontend platform layers.'
    }
  });

  const jobNode = await prisma.job.create({
    data: {
      recruiterId: recruiterUser.recruiter!.id,
      title: 'Full-Stack Node.js Engineer',
      location: 'New York, NY',
      salaryRange: '$130,000 - $160,000',
      requirements: ['Node.js', 'PostgreSQL', 'Prisma', 'Express'],
      description: 'Join our backend squad managing cloud routing engines and data pipeline architectures.'
    }
  });

  // 5. Provision Mock Candidates with matching Skill Profiles
  const candidateUser1 = await prisma.user.create({
    data: {
      email: 'john.doe@gmail.com',
      passwordHash: defaultPasswordHash,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.CANDIDATE,
      candidate: {
        create: {
          skills: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
        }
      }
    },
    include: { candidate: true }
  });

  const candidateUser2 = await prisma.user.create({
    data: {
      email: 'jane.smith@gmail.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Jane',
      lastName: 'Smith',
      role: Role.CANDIDATE,
      candidate: {
        create: {
          skills: ['Node.js', 'PostgreSQL', 'Prisma', 'AWS'],
        }
      }
    },
    include: { candidate: true }
  });

  // 6. Connect Active Pipeline Applications via ATS Scoring Matrix
  await prisma.application.create({
    data: {
      jobId: jobReact.id,
      candidateId: candidateUser1.candidate!.id,
      status: ApplicationStatus.INTERVIEW,
      atsScore: 75,
      parsedText: 'John Doe resume tracking file. Fluent in React, TypeScript, Tailwind design implementations.'
    }
  });

  await prisma.application.create({
    data: {
      jobId: jobNode.id,
      candidateId: candidateUser2.candidate!.id,
      status: ApplicationStatus.APPLIED,
      atsScore: 100,
      parsedText: 'Jane Smith engineer profiling documentation. Native backend developer specializing in Node.js, PostgreSQL relational frameworks, and Prisma models.'
    }
  });

  console.log('[SEEDER UNIT]: Database population pipeline finalized cleanly!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
