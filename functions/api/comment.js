/**
 *
 * @param {Request} request
 * @returns
 */
export async function onRequest({ request }) {
  // decode the request body
  const searchParams = new URL(request.url).searchParams;
  const action = searchParams.get("action");
  if (action === "add") {
    const username = searchParams.get("username");
    const content = searchParams.get("content");
    //return await addComment(request);

    return Response.json(
      { success: false, message: "Failed to add comment" },
      { status: 500 }
    );
    // else return Response.json({ success: true }, { status: 200 });
  }
  return Response.json(
    { success: false, message: "Invalid action" },
    { status: 400 }
  );
}
