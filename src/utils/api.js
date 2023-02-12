import { API_SERVER } from "./constants";

const fetchRequest = (url, method, param) => {
  return fetch(
    url,
    param && {
      method: method,
      body: JSON.stringify(param),
    }
  );
};

export const getPosts = ({ onSuccess, onError }) =>
  fetchRequest(`${API_SERVER}/posts`)
    .then((res) => res.json())
    .then((data) => {
      onSuccess(data);
      return data;
    })
    .catch((err) => onError(err));
