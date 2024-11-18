import { CONTRACTS, STATUS, WORK_TYPES } from "@/core/constants";
import { getAvatar } from "@/core/utils";
import { getRandomDateLastDays } from "@/core/utils/daysOnPast";
import { PrismaClient, Skill } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criação de Skills (5 de Front e 5 de Back)
  const skillNames = [
    { name: "React", level: "Advanced" },
    { name: "Next.js", level: "Intermediate" },
    { name: "CSS", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Node.js", level: "Advanced" },
    { name: "Nest.js", level: "Intermediate" },
    { name: "GraphQL", level: "Intermediate" },
    { name: "Docker", level: "Advanced" },
    { name: "MongoDB", level: "Intermediate" },
  ];

  // Criação do usuário
  const user = await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john.doe@example.com",
      skills: {
        create: skillNames.map((skill) => ({
          ...skill,
          createdAt: getRandomDateLastDays(90),
        })),
      },
    },
  });

  // Atualização da imagem
  await prisma.user.update({
    where: { id: user.id },
    data: {
      image: getAvatar({ variant: "notionists", seed: user.id }),
    },
  });

  const skills: Skill[] = await prisma.skill.findMany();

  // Função auxiliar para selecionar de 1 a 5 Skills aleatórias
  function getRandomSkills(skillsArray: Skill[]): Skill[] {
    const numSkills = Math.floor(Math.random() * 5) + 1; // Define entre 1 e 5
    const shuffledSkills = skillsArray.sort(() => 0.5 - Math.random());
    return shuffledSkills.slice(0, numSkills);
  }

  // Criação de 5 Applications
  for (let i = 1; i <= 5; i++) {
    const date = getRandomDateLastDays(90);
    const numDays = Math.floor(Math.random() * 5);
    const updateDate = new Date(date);
    updateDate.setDate(updateDate.getDate() + numDays);

    const lastStatus =
      STATUS[Math.floor(Math.random() * (STATUS.length - 1)) + 1];
    const contract = CONTRACTS[Math.floor(Math.random() * CONTRACTS.length)];
    const workStyle = WORK_TYPES[Math.floor(Math.random() * WORK_TYPES.length)];

    await prisma.application.create({
      data: {
        link: `https://company${i}.com`,
        company: `Company ${i}`,
        applicationDate: date,
        contractType: contract,
        workStyle: workStyle,
        compensation: 6000 + i * 1000,
        anotations: `Anotação da aplicação ${i}`,
        userId: user.id,
        createdAt: updateDate,
        title: `Aplicação ${i}`,
        status: lastStatus,

        skills: {
          connect: getRandomSkills(skills),
        },
        history: {
          createMany: {
            data: [
              {
                status: STATUS[0],
                anotation: "I applied for this job",
                createdAt: date,
              },
              {
                status: lastStatus,
                anotation: "I was accepted for this process",
                createdAt: updateDate,
              },
            ],
          },
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed created successfully!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
