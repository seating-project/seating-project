import { prisma } from "@/server/db";
import seedAccounts from "./seeds/account";
import seedYears from "./seeds/years";
import seedDegrees from "./seeds/degrees";
import seedDepartments from "./seeds/departments";
import seedStudents from "./seeds/students";
import seedBuildings from "./seeds/buildings";
import seedBlocks from "./seeds/blocks";
import seedRooms from "./seeds/rooms";
import seedLogos from "./seeds/logos";
import seedTemplates from "./seeds/templates";
import updateStudent from "./seeds/updateStudent";

async function main() {
  // const count = faker.number.int({
  //   min: 17,
  //   max: 20,
  // });.
  await seedAccounts(prisma);
  await seedYears(prisma);
  await seedDegrees(prisma);  
  await seedDepartments(prisma);
  await seedStudents(prisma);
  await seedBuildings(prisma);
  seedBlocks(prisma);
  await seedRooms(prisma);
  await seedLogos(prisma);
  seedTemplates(prisma);
  
  await updateStudent(prisma);

}

main()
  .then(() => {
    console.log("Seeding complete ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
