import { currentEnv } from "../utils/env";

export const getApiUrl = () => {
  const API_URLS: { [key: string]: string } = {
    local: "http://localhost:5000/api/",
    development: "TBD",
    production: "/api/",
  };
  return currentEnv ? API_URLS[currentEnv] : "/api/";
};
