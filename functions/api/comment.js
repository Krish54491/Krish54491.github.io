import { createClient } from "@supabase/supabase-js";

/**
 *
 * @param {Request} request
 * @returns
 */
export async function onRequest({ request, env }) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // request should always have action parameter: add, list, delete and a page parameter to identify the page
  // for add action, it should have username and content parameters
  // for delete action, it should have comment id parameter or username and content to identify the comment to delete
  // for list action, it should have page parameter to identify the page and pagination parameters later on
  const searchParams = new URL(request.url).searchParams;
  const action = searchParams.get("action");
  const page = searchParams.get("page");

  if (!action || !page) {
    return Response.json(
      { success: false, message: "Missing action or page parameter" },
      { status: 400 }
    );
  }

  try {
    if (action === "add") {
      // test function curl "http://127.0.0.1:8788/api/Comment?action=add&page=home&username=testuser&content=This is a test comment"
      const username = searchParams.get("username");
      const content = searchParams.get("content");
      if (!username || !content) {
        return Response.json(
          { success: false, message: "Missing username or content" },
          { status: 400 }
        );
      }
      return await addComment(page, username, content, supabase);
    } else if (action === "list") {
      // test function curl "http://127.0.0.1:8788/api/Comment?action=list&page=testpage&amount=4"
      const amount = Number(searchParams.get("amount"))
        ? Number(searchParams.get("amount"))
        : 100;
      if (isNaN(amount)) {
        return Response.json(
          { success: false, message: "Invalid amount parameter" },
          { status: 400 }
        );
      }
      return await listComments(page, amount, supabase);
    } else if (action === "delete") {
      // test function curl "http://127.0.0.1:8788/api/Comment?action=delete&page=testpage"
      const username = searchParams.get("username");
      const id = searchParams.get("id");
      if (!username || !id) {
        return Response.json(
          { success: false, message: "Missing username or id or both" },
          { status: 400 }
        );
      }
      return await deleteComment(page, username, id, supabase);
    }
    return Response.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

async function addComment(page, username, content, supabase) {
  const { data, error } = await supabase.from("comments").insert([
    {
      page: page,
      username: username,
      content: content,
    },
  ]);
  if (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
  return Response.json(
    { success: true, message: "Comment added successfully" },
    { status: 200 }
  );
}
async function listComments(page, amount, supabase) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("page", page)
    .order("created_at", { ascending: false })
    .limit(amount); // limit to 100 comments for now
  if (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
  return Response.json({ success: true, comments: data }, { status: 200 });
}
async function deleteComment(page, username, id, supabase) {
  // delete comment by id or other identifier
  // has extra parameter to check for which comment to delete
  // comment has to belong to the user in order to be deleted or admin
  // admin perms will be added later
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("username", username)
    .eq("page", page);
  if (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
  return Response.json(
    { success: true, message: "Comment deleted successfully" },
    { status: 200 }
  );
}

// comments general structure
//  id: uuid default gen_random_uuid() primary key,
//  page: string (not null)
//  username: string (should never be null)
//  content: string (not null)
//  created_at: timestamp default now()
