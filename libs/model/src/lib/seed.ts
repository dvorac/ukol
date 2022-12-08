import { PrismaClient } from '../generated'

const prisma = new PrismaClient();

const seedPriorities = async () => {
  const priorities = [
    {
      uuid: '23e09e34-a1f6-46c8-96a6-54ae106ec7c7',
      description: 'high',
      priority: 1
    },
    {
      uuid: '36bc9da3-46ae-42e7-b5d6-391a43081ada',
      description: 'med',
      priority: 2
    },
    {
      uuid: '62a6bd23-53d7-4325-bd4c-6334f33a0f75',
      description: 'low',
      priority: 3
    },
    {
      uuid: '63b53e3f-7043-44f9-84d6-4dd8ff4864e6',
      description: 'none',
      priority: -1,
    },
  ];

  const created = Array();
  for (let p of priorities) {
    const cp = await prisma.priority.upsert({
      where: {
        uuid: p.uuid
      },
      update: {},
      create: {
        uuid: p.uuid,
        description: p.description,
        priority: p.priority
      },
    });
    created.push(cp);
  }
  return created;
}

const seedTasks = async () => {
  const tasks = [
    {
      uuid: '36d5c38a-4b89-45bf-9c8e-85b62890e09b',
      description: 'high',
      priority: 1
    },
    {
      uuid: '0b1134b0-d79a-4d21-aba3-9a1c305318b8',
      description: 'med',
      priority: 1
    },
    {
      uuid: '6208e167-4023-4246-85e6-c4d57318b55c',
      description: 'low',
      priority: 1
    },
    {
      uuid: '06523306-b2f4-4a58-8756-3c36dcee722f',
      description: 'none',
      priority: -1,
    },
  ];

  for (let t of tasks) {
    await prisma.task.upsert({
      where: {
        uuid: t.uuid
      },
      update: {
        description: t.description
      },
      create: {
        uuid: t.uuid,
        description: t.description,
      },
    })
  }
}

const seed = async () => {
  await seedPriorities();
  await seedTasks();
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