const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@pharmacare.com' },
    update: {},
    create: {
      nom: 'Administrateur',
      email: 'admin@pharmacare.com',
      password,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'pharmacien@pharmacare.com' },
    update: {},
    create: {
      nom: 'Jean Pharmacien',
      email: 'pharmacien@pharmacare.com',
      password,
      role: 'PHARMACIEN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'caissier@pharmacare.com' },
    update: {},
    create: {
      nom: 'Marie Caissier',
      email: 'caissier@pharmacare.com',
      password,
      role: 'CAISSIER',
    },
  });

  console.log('Seed terminé — comptes de test créés (mot de passe: admin123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
