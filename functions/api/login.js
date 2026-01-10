import { eq } from "drizzle-orm";
import { getDb } from "../../db/drizzle";
import { usersTable } from "../../db/schema";

export async function onRequest({ request }) {
  if (request.method !== "POST") {
    return Response.json(
      { success: false, message: "Invalid request method" },
      { status: 405 }
    );
  }

  const body = await request.json();
  const { deviceId } = body;
  const db = getDb();

  if (!deviceId) {
    return Response.json(
      { success: false, message: "Missing deviceId" },
      { status: 400 }
    );
  }

  const userResults = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.mac_address, deviceId))
    .limit(1);

  let userId = userResults[0]?.id;

  if (!userResults[0]) {
    try {
      userId = (
        await db
          .insert(usersTable)
          .values({
            mac_address: deviceId,
          })
          .returning({
            id: usersTable.id,
          })
      )[0].id;
    } catch (error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }

  // Here you would typically check the credentials against a database
  // For now, we'll just return a success response
  return Response.json(
    { success: true, message: "Login successful" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `krish-auth=${userId}; HttpOnly; Path=/;`, // may hash it in the future
      },
    }
  );
}
