const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "";

//console.log("B", import.meta.env);

export const API_ROUTES = {
  LOGIN: `${BASE_API_URL}/api/login`,
  COMMENTS: `${BASE_API_URL}/api/comment`,
  CHANGE_USERNAME: `${BASE_API_URL}/api/change-username`,
};
