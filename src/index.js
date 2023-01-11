import { App } from "./components/App.js";
import { Post } from "./components/Post";
import "./css/reset.css";

const app = new App();

const fetchPosts = async () => {
  const res = await fetch("http://localhost:5000/posts");
  const json = await res.json();
  renderPosts(json);
};

const renderPosts = (postList) => {
  // TODO: add mapping post to render postlist
  const post = postList[0];

  const $post = new Post(post);
  app.add($post.create());
};

fetchPosts();
