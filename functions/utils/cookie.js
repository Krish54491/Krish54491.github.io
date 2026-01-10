import { parse } from "cookie";
import { getDb } from "../../db/drizzle.js";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export function getAuthCookie(request) {
  const cookies = parse(request.headers.get("Cookie") || "");

  const authCookie = cookies["krish-auth"];
  //console.log("Auth Cookie:", authCookie);
  if (!authCookie) {
    throw new Error("No auth cookie found");
  }

  return authCookie;
}

export async function getUserFromCookie(request) {
  const authCookie = getAuthCookie(request);
  const userResults = await getDb()
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, authCookie))
    .limit(1);
  if (!userResults[0]) {
    throw new Error("User not found");
  }
  return userResults[0];
}
