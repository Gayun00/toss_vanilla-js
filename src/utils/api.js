export const getPosts = ({ onSuccess, onError }) =>
  fetch("http://localhost:5000/posts")
    .then((res) => res.json())
    .then((data) => {
      onSuccess(data);
      return data;
    })
    .catch((err) => onError(err));
