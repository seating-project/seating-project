import { db } from "@/server/db";
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
import seedColleges from "./seeds/colleges";
import seedFromExcel from "./seeds/firstYearStudent";

async function main() {
  // const count = faker.number.int({
  //   min: 17,
  //   max: 20,
  // });
  // await seedAccounts(db);
  // await seedColleges(db)
  // await seedYears(db);
  // await seedDegrees(db);  
  // await seedDepartments(db);
  // await seedStudents(db);
  // await seedBuildings(db);
  // seedBlocks(db);
  // await seedRooms(db);
  // await seedLogos(db);
  // seedTemplates(db);
  // await updateStudent(db);
  // seedFromExcel(db);
}

main()
  .then(() => {
    console.log("Seeding complete ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
