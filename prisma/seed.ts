import { prisma } from "@/server/db";
import seedAccounts from "./seeds/account";

async function main() {
  // const count = faker.number.int({
  //   min: 17,
  //   max: 20,
  // });
  // await seedProducts(prisma, count);
  // await seedCustomers(prisma, count);
  //   await seedCategories(prisma);
  //   await seedComponents(prisma);
  await seedAccounts(prisma);
}

main()
  .then(() => {
    console.log("Seeding complete ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
