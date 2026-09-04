import type { Request, Response } from 'express';
/**
 * Handles account creation and profile role mapping
 */
export declare const register: (req: Request, res: Response) => Promise<void>;
/**
 * Validates profiles and returns access session payloads
 */
export declare const login: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map