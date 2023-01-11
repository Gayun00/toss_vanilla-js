import "./index.css";

export class Post {
  constructor(post) {
    this.thumbnail = post.thumbnail;
    this.title = post.title;
    this.description = post.description;
    this.date = post.date;
  }

  createPost() {
    // TODO: get root element by parameter
    const $root = document.querySelector(".root");

    const $postList = document.createElement("ul");
    const $postItem = document.createElement("li");
    const $thumbContainer = document.createElement("div");
    const $textContainer = document.createElement("div");
    const $thumbnail = document.createElement("img");
    const $title = document.createElement("h2");
    const $description = document.createElement("p");

    $root.appendChild($postList);

    $postList.appendChild($postItem);
    $postItem.appendChild($thumbContainer);
    $postItem.appendChild($textContainer);

    $thumbContainer.appendChild($thumbnail);
    $thumbnail.setAttribute("src", this.thumbnail);

    $textContainer.appendChild($title);
    $textContainer.appendChild($description);

    $title.innerText = this.title;
    $description.textContent = this.description;

    $postItem.classList.add("post_item");
    $thumbnail.classList.add("post_thumbnail");
  }
}
