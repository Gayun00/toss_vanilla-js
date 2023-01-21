export const getPosts = async (errorCallback) => {
  // TODO: add onError, onSuccess callback func handling
  try {
    const res = await fetch("http://localhost:5000/posts");
    const data = await res.json();
    return data;
  } catch (e) {
    errorCallback();
  }
};
