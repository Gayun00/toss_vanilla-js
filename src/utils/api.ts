import { ApiHandlers, FetchRequest } from "./interfaces/index";
import { API_SERVER } from "./constants";

const fetchRequest = ({ url, method, param, handler }: FetchRequest) => {
  return fetch(
    url,
    param && {
      method: method,
      body: JSON.stringify(param),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      handler?.onSuccess(data);
      return data;
    })
    .catch((err) => handler?.onError(err));
};

export const getPosts = (handler: ApiHandlers) => fetchRequest({ url: `${API_SERVER}/posts`, handler });
