import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_ROUTES } from "./utils/apiRoutes";
// this will a while so I'll start by writing what it should do first
// This component is not in pages because it will be used in almost every page

// Function that takes in a PageName: string and then returns the comments for that page
// The comments will be stored in a database, my first choice is supabase

// I'm going to make a backend api route to handle the comments, so the component will call that route
// The api route will handle fetching and adding comments to the database
export default function Comments() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(null); // Track which menu is open
  const location = useLocation(); // React Router hook to detect URL changes
  let page = location.pathname.substring(1); // Get the current page name from the URL
  console.log("Current page for comments:", page);
  if (page === "") {
    page = "home";
  }
  // Fetch comments when the component mounts or the URL changes
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${API_ROUTES.COMMENTS}?action=list&page=${encodeURIComponent(page)}`
        );
        const data = await response.json();
        if (data.success) {
          setComments(data.comments);
        } else {
          console.error("Failed to fetch comments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    fetchComments();
  }, [page]);

  // Handle adding a new comment
  async function handleAddComment(event) {
    event.preventDefault();
    if (!content) {
      alert("Please enter a comment.");
      return;
    }
    try {
      const response = await fetch(
        `${API_ROUTES.COMMENTS}?action=add&page=${encodeURIComponent(page)}&content=${encodeURIComponent(content)}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        // Refetch comments to include the new comment with its generated id
        const updatedComments = await fetch(
          `${API_ROUTES.COMMENTS}?action=list&page=${encodeURIComponent(page)}`
        );
        const updatedData = await updatedComments.json();
        if (updatedData.success) {
          setComments(updatedData.comments);
        }
        setContent("");
      } else {
        console.error("Failed to add comment:", data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  // Handle deleting a comment
  async function handleDeleteComment(commentId) {
    try {
      const response = await fetch(
        `${API_ROUTES.COMMENTS}?action=delete&page=${encodeURIComponent(page)}&id=${encodeURIComponent(
          commentId
        )}`,
        { method: "POST" }
      );
      const data = await response.json();
      if (data.success) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      } else {
        console.error("Failed to delete comment:", data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Comments
      </h2>
      <form onSubmit={handleAddComment} className="mb-6">
        <div className="mb-4">
          <textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 bg-inherit"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Add Comment
        </button>
      </form>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm relative"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-gray-100">
                {comment.username}
              </strong>{" "}
              - {new Date(comment.created_at).toLocaleString()}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              {comment.content}
            </p>
            <button
              onClick={() =>
                setMenuOpen((prev) => (prev === comment.id ? null : comment.id))
              }
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              &#x22EE;
            </button>
            {menuOpen === comment.id && (
              <div className="absolute top-8 right-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
