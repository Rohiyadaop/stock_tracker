'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return [];

    const items = await prisma.watchlist.findMany({
      where: { userId: user.id },
      select: { symbol: true },
    });

    return items.map((i) => i.symbol);
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}
