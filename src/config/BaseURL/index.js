import API from "../API";
import Axios from "axios";

export const Api = API;
export const BASE_URL = "https://www.omdbapi.com";
export const http = Axios.create({
  baseURL: BASE_URL,
});
