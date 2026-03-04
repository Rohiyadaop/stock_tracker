'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsersForNewsEmail = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        return users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name
        }));
    } catch (e) {
        console.error('Error fetching users for news email:', e)
        return []
    }
}
