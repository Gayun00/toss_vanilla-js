interface AxiosParams<TParams = Params, TData = object> {
  url: string;
  method?: AxiosMethod;
  params?: TParams;
  data?: TData;
  options?: AxiosOptions<TData>;
}

export type Params = Record<string, string>;
type AxiosMethod = "get" | "post" | "put" | "delete";

export interface AxiosOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

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

export const axios = {
  get<TParams extends Params, TData>({ url, params, data, options }: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      url,
      params,
      data,
      options,
    });
  },
  post<TParams extends Params, TData>({ url, params, data, options }: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      url,
      method: "post",
      params,
      data,
      options,
    });
  },
  put<TParams extends Params, TData>({ url, params, data, options }: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      url,
      method: "put",
      params,
      data,
      options,
    });
  },
  delete<TParams extends Params, TData>({ url, params, data, options }: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      url,
      method: "delete",
      params,
      data,
      options,
    });
  },
};
