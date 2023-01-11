import "./index.css";

export class Post {
  constructor(post) {
    this.thumbnail = post.thumbnail;
    this.title = post.title;
    this.description = post.description;
    this.date = post.date;
  }

  create() {
    const $post = document.createElement("li");
    const $thumbContainer = document.createElement("div");
    const $textContainer = document.createElement("div");
    const $thumbnail = document.createElement("img");
    const $title = document.createElement("h2");
    const $description = document.createElement("p");
    const $date = document.createElement("p");

    $post.appendChild($thumbContainer);
    $post.appendChild($textContainer);

    $thumbContainer.appendChild($thumbnail);
    $thumbnail.setAttribute("src", this.thumbnail);

    $textContainer.appendChild($title);
    $textContainer.appendChild($description);
    $textContainer.appendChild($date);

    $title.innerText = this.title;
    $description.innerText = this.description;
    $date.innerText = this.date;

    $post.classList.add("post_item");
    $thumbnail.classList.add("post_thumbnail");
    $title.classList.add("post_title");
    $description.classList.add("post_description");
    $date.classList.add("post_date");

    return $post;
  }
}
