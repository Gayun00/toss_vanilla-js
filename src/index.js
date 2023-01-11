import { Post } from "./components/Post";
import "./css/reset.css";

const fetchPosts = async () => {
  const res = await fetch("http://localhost:5000/posts");
  const json = await res.json();

  // temporal code for test rendering post component.
  // TODO: split code
  const post = new Post(json[0]);
  post.createPost();
};

const posts = fetchPosts();
