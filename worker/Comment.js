/**
 *
 * @param {Request} request
 * @returns
 */
export async function addComment(request) {
  // decode the request body
  const searchParams = new URL(request.url).searchParams;
  const username = searchParams.get("username");
  const content = searchParams.get("content");
  // attempts to add a comment to the database
  // if failed
  return Response.json(
    { success: false, message: "Failed to add comment" },
    { status: 500 }
  );
  // else return Response.json({ success: true }, { status: 200 });
}
