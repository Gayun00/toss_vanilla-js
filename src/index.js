import { App } from "./components/App.js";
import { PostList } from "./components/PostList.js/index.js";
import "./css/reset.css";

const app = new App();

const createPosts = async () => {
  const res = await fetch("http://localhost:5000/posts");
  const json = await res.json();
  addPosts(json);
};

const addPosts = (postList) => {
  const $postList = new PostList(postList);
  // TODO: add post list wrapper component
  app.add($postList.render());
};

createPosts();
