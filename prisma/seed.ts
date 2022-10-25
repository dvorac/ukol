import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.person.upsert({
    where: {
      uuid: 'd31a9675-3536-4222-a319-d631376012cf'
    },
    update: {},
    create: {
      name: 'Harry',
      uuid: 'd31a9675-3536-4222-a319-d631376012cf'
    }
  });
  await prisma.person.upsert({
    where: {
      uuid: 'cc899d16-3325-4f50-858a-a968576efb49'
    },
    update: {},
    create: {
      name: 'John',
      uuid: 'cc899d16-3325-4f50-858a-a968576efb49'
    }
  });
  await prisma.person.upsert({
    where: {
      uuid: '4ca7aee4-55a6-466c-91af-41fd5f74ae10'
    },
    update: {},
    create: {
      name: 'Kent',
      uuid: '4ca7aee4-55a6-466c-91af-41fd5f74ae10'
    }
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });