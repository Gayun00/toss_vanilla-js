import { PostList } from "../../components/PostList.js";

export class ListPage {
  constructor() {
    //
  }

  render() {
    const $listPage = document.createElement("div");

    const createPosts = async () => {
      const res = await fetch("http://localhost:5000/posts");
      const json = await res.json();
      addPosts(json);
    };

    const addPosts = (postList) => {
      const $postList = new PostList(postList);
      // TODO: add post list wrapper component
      $listPage.appendChild($postList.render());
    };

    createPosts();
    return $listPage;
  }
}
