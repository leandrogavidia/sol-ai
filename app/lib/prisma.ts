import { PrismaClient } from '@prisma/client'


export function getPrismaClient() {
    const prismaClient = new PrismaClient();

    return prismaClient
}

export async function getEmailInWhitelist(email: string) {
    const prisma = getPrismaClient();

    const result = await prisma.whitelistedEmail.findUnique({
        where: {
            email: email
        }
    });
    return result;
}

export async function getUser(email: string) {
    const prisma = getPrismaClient();

    const result = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return result;
}

export async function getUserWithPassword(email: string, password: string) {
    const prisma = getPrismaClient();

    const result = await prisma.user.findUnique({
        where: {
            email,
            password
        }
    });
    return result;
}

export async function createUser(email: string, password: string) {
    const prisma = getPrismaClient();

    const result = await prisma.user.create({
        data: {
            email,
            password
        }
    });
    return result;
}