import { API_SERVER } from "./constants";

const fetchRequest = ({ url, method, param, handler }) => {
  return fetch(
    url,
    param && {
      method: method,
      body: JSON.stringify(param),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      handler.onSuccess(data);
      return data;
    })
    .catch((err) => handler.onError(err));
};

export const getPosts = (handler) => fetchRequest({ url: `${API_SERVER}/posts`, handler });
