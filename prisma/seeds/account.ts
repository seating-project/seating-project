import * as argon2 from "argon2";
import { type PrismaClient } from "@prisma/client";

export default async function seedAccounts(prisma: PrismaClient) {
  const password = await argon2.hash("seats@123");

  const user = await prisma.user.create({
    data: {
      email: "seats@admin.com",
      password,
      name: "Seats Admin",
      emailVerified: new Date(),
    },
  });

  console.log("User created: ", user)

}
