const baseUrl = "/api/blogs";
const userUrl = "/api/users";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getUsers = async () => {
  const response = await fetch(userUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};

export const getBlogs = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return await response.json();
};

export const createBlog = async (newBlog) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(newBlog),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return await response.json();
};

export const removeBlog = async (id) => {
  const url = `${baseUrl}/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  return response.status;
};

export const updateBlog = async (updatedBlog) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBlog),
  };

  const response = await fetch(`${baseUrl}/${updatedBlog.id}`, options);

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  return await response.json();
};

export const commentBlog = async ({id, comment}) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({content: comment}),
  };

  const response = await fetch(`${baseUrl}/${id}/comments`, options);

  if (!response.ok) {
    throw new Error("Failed to comment a blog");
  }

  return await response.json();
};