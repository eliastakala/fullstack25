import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("renders content correctly", () => {
  const user = {
    name: "Remi",
    username: "remil",
    id: "test user id",
  };
  const blog = {
    id: "testing id",
    title: "testing title",
    author: "Remi",
    user: { id: "test user id" },
    url: "test url",
    likes: 2,
  };

  render(<Blog blog={blog} user={user} />);

  const titleElement = screen.queryByText("testing title Remi");
  expect(titleElement).toBeDefined();
  const urlElement = screen.queryByText("test url");
  expect(urlElement).toBeNull();
  const likesElement = screen.queryByText(2);
  expect(likesElement).toBeNull();
});

test("buttons work", async () => {
  const user = {
    name: "Remi",
    username: "remil",
    id: "test user id",
  };
  const blog = {
    id: "testing id",
    title: "testing title",
    author: "Remi",
    user: { id: "test user id" },
    url: "test url",
    likes: 2,
  };

  render(<Blog blog={blog} user={user} />);
  const button = screen.getByText("show details");
  const userui = userEvent.setup();
  await userui.click(button);
  const titleElement = screen.queryByText("testing title Remi");
  expect(titleElement).toBeDefined();
  const urlElement = screen.queryByText("test url");
  expect(urlElement).toBeDefined();
  const likesElement = screen.queryByText(2);
  expect(likesElement).toBeDefined();
});

test("liking twice", async () => {
  const user = {
    name: "Remi",
    username: "remil",
    id: "test user id",
  };
  const blog = {
    id: "testing id",
    title: "testing title",
    author: "Remi",
    user: { id: "test user id" },
    url: "test url",
    likes: 2,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} user={user} like={mockHandler} />);
  const button = screen.getByText("show details");
  const userui = userEvent.setup();
  await userui.click(button);

  const mockUser = userEvent.setup();
  const likeButton = screen.getByText("like");
  await mockUser.click(likeButton);
  await mockUser.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("blog creation", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByRole("textbox", { name: "title:" });
  const inputAuthor = screen.getByRole("textbox", { name: "author:" });
  const inputUrl = screen.getByRole("textbox", { name: "url:" });
  const sendButton = screen.getByText("save");
  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "test user...");
  await user.type(inputUrl, "test url...");
  await user.click(sendButton);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("test user...");
  expect(createBlog.mock.calls[0][0].url).toBe("test url...");
});
