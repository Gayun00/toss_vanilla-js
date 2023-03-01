import { ApiHandlers } from "./interfaces";
import { API_SERVER } from "./constants";
import { axios } from "./axios";

export const getPosts = (handler: ApiHandlers) => axios.get({ url: `${API_SERVER}/posts`, options: handler });
