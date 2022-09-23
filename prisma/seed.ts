import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "joaopaulo167@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("123123123", 10);

  const user = await prisma.user.create({
    data: {
      email,

      password: {
        create: {
          hash: hashedPassword,
        },
      },
      city: "São Paulo",
      neighborhood: "Vila Mariana",
    },
  });

  await prisma.report.create({
    data: {
      title: "My first report",
      body: "Hello, world!",
      userId: user.id,
      categories: {
        create: [
          {
            name: "Crime",
          },
          {
            name: "Violência",
          }
        ],
      },
    },
  });

  await prisma.report.create({
    data: {
      title: "My second report",
      body: "Hello, world!",
      userId: user.id,
      categories: {
        create: [
          {
            name: "Crime",
          },
          {
            name: "Violência",
          }
        ],
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
