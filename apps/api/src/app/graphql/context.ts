import { PrismaClient } from '@ukol/model'

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'query' }
  ]
});

prisma.$on('query', (e) => {
  console.log(`prisma `, e.query);
});

export const context: Context = {
  prisma: prisma,
}