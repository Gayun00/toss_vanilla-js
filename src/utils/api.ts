import { API_SERVER } from "./constants";

interface IFetchRequest {
  url: string;
  method?: string;
  param?: object;
  handler?: Handler;
}

export type Handler = {
  onSuccess: (data: unknown) => void;
  onError: (err: Error) => void;
};

const fetchRequest = ({ url, method, param, handler }: IFetchRequest) => {
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

export const getPosts = (handler: void) => fetchRequest({ url: `${API_SERVER}/posts`, handler });
