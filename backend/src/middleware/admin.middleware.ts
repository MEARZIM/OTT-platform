import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AdminRole } from "@prisma/client";

import { prisma } from "../libs/prisma";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

        // Verify JWT Token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        // Find admin in database
        const admin = await prisma.admin.findUnique({
            where: { id: decoded.id },
        });

        if (!admin || admin.role !== AdminRole.ADMIN) {
            return res.status(403).json({ message: "Access denied. Only admins are allowed." });
        }

        req.user = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};