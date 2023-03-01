import { ApiHandlers, FetchRequest } from "./interfaces/index";
import { API_SERVER } from "./constants";

interface AxiosParams<TParams = Params, TData = object> {
  url: string;
  method?: AxiosMethod;
  params?: TParams;
  data?: TData;
  options?: AxiosOptions<TData>;
}

type Params = Record<string, string>;
type AxiosMethod = "get" | "post" | "put" | "delete";

interface AxiosOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

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

const request = <TParams extends Params, TData = object>({
  url,
  method,
  params,
  data,
  options,
}: AxiosParams<TParams, TData>) => {
  const searchParams = new URLSearchParams(params).toString();
  return fetch(`${url}?${searchParams}`, {
    method,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      options?.onSuccess && options.onSuccess(data);
      return data;
    })
    .catch((err) => options?.onError?.(err));
};

const axios = {
  get() {
    //
  },
  post() {
    //
  },
  put() {
    //
  },
  delete() {
    //
  },
};
