import { IArticles } from "./interfaces";
import { API_SERVER } from "./constants";
import { axios, AxiosOptions, Params } from "./axios";

export const getArticles = (handler: AxiosOptions<IArticles>) =>
  axios.get<Params, IArticles>({ url: `${API_SERVER}/posts`, options: handler });
