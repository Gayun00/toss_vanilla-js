export const getPosts = async (errorCallback) => {
  //put onSuccess, onError handler as parameters
  try {
    const res = await fetch("http://localhost:5000/posts");
    const data = await res.json();
    return data;
  } catch (e) {
    errorCallback();
  }
};

const data = getPosts(); //promise<pending>
