import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import { Role } from '@prisma/client';

/**
 * Handles account creation and profile role mapping
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, role, companyName } = req.body;

    if (!email || !password || !firstName || !lastName || !role) {
      res.status(400).json({ error: 'Missing mandatory registration input fields.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email registration target occupied.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, passwordHash, firstName, lastName, role: role as Role },
      });

      if (role === 'CANDIDATE') {
        await tx.candidate.create({ data: { userId: user.id } });
      } else if (role === 'RECRUITER') {
        await tx.recruiter.create({
          data: { userId: user.id, companyName: companyName || 'Independent Operation' },
        });
      }
      return user;
    });

    res.status(201).json({ message: 'User setup finalized.', userId: result.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal system error during deployment.' });
  }
};

/**
 * Validates profiles and returns access session payloads
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required parameters.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ error: 'Invalid authentication profile.' });
      return;
    }

    const passes = await bcrypt.compare(password, user.passwordHash);
    if (!passes) {
      res.status(400).json({ error: 'Invalid authentication profile.' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env['JWT_SECRET'] || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login process operational failure.' });
  }
};
