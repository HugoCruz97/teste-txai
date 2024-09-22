import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const adminMaster = await prisma.users.upsert({
    where: { cpf: 'admin-master' },
    update: {},
    create: {
      name: 'adminmaster',
      cpf: 'admin-master',
      email: 'adminmaster@txai',
      userName: 'admin-master',
      password: '123456789@',
      role: 'admin',
      Products: {
        create: {
          name: 'Notebook',
          price: 3000,
          quantity: 10
        },
      },
    },
  })
  const usuario1 = await prisma.users.upsert({
    where: { cpf: '00000000000' },
    update: {},
    create: {
      name: 'Usuario1',
      cpf: '00000000000',
      email: 'usuario1@txai',
      userName: 'usuario1',
      password: 'usuario1',
      role: 'user',
      Products: {
        create: {
          name: 'Notebook',
          price: 3000,
          quantity: 10
        },
      },
    },
  })
  const usuario2 = await prisma.users.upsert({
    where: { cpf: '11111111111' },
    update: {},
    create: {
      name: 'Usuario2',
      cpf: '11111111111',
      email: 'usuario2@txai',
      userName: 'usuario2',
      password: 'usuario2',
      role: 'user',
      Products: {
        create: [
          {
            name: 'Tablet',
            price: 1000,
            quantity: 15
          },
          {
            name: 'Mouse',
            price: 100,
            quantity: 10
          },
          {
            name: 'Keyboard',
            price: 250,
            quantity: 25
          },
        ]
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })