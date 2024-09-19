import argon2 from "argon2";

export async function giveHash(password: string) {
    const hashedPassword = await argon2.hash(password);
    console.log(hashedPassword)
    return hashedPassword;
}