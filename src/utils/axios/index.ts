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

const request = <TParams, TData = object>({ url, method, params, data, options }: AxiosParams<TParams, TData>) => {
  const convertedParams = params
    ? Object.entries(params).reduce((newObj: Record<string, string>, [key, value]) => {
        newObj[key] = value.toString();
        return newObj;
      }, {})
    : "";

  const searchParams = new URLSearchParams(convertedParams).toString();
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
  get<TParams, TData>(params: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      ...params,
      method: "get",
    });
  },
  post<TParams, TData>(params: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      ...params,
      method: "post",
    });
  },
  put<TParams extends Params, TData>(params: AxiosParams<TParams, TData>): Promise<TData> {
    return request({
      ...params,
      method: "put",
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
