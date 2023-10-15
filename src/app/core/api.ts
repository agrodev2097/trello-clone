import axios from "axios";
import { config } from "@/app/core/config";

export const api = axios.create({
  baseURL: config.baseApiURI,
});
