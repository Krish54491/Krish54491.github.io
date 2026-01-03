import { addComment } from "comment";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    console.log("Received request for:", url.pathname);
    if (url.pathname === "/api/add-comment") {
      return await addComment(request);
    }

    return new Response(null, { status: 404 });
  },
};
