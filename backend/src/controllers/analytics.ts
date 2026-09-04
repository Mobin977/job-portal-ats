import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

/**
 * Computes deep core platform engagement analysis datasets for administrative roles
 */
export const getMetrics = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Collect fundamental record counting parameters simultaneously
    const [totalJobs, totalApplications, rawStatusGroupings] = await prisma.$transaction([
      prisma.job.count(),
      prisma.application.count(),
      prisma.application.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
        orderBy: {
          status: 'asc',
        },
      }),
    ]);

    // Explicit type casting avoids any strict compiler mapping resolution complaints
    const statusDistribution = rawStatusGroupings.map((group) => {
      const counts = group._count as { id: number } | null | undefined;
      return {
        status: String(group.status),
        count: counts?.id ?? 0,
      };
    });

    res.status(200).json({
      totalJobs,
      totalApplications,
      statusDistribution,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'System processing error compiled while computing analytics matrix.',
    });
  }
};
