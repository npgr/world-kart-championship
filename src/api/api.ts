import axios, { AxiosStatic } from "axios";
import { getApiUrl } from "./api.helpers";
import { IGetUserParams } from "./api.d";

export class API {
  http: AxiosStatic;
  constructor() {
    this.http = axios;
    this.http.defaults.baseURL = getApiUrl();
  }

  // Delete: example code
  public getPrueba = (params: IGetUserParams) => {
    return axios.get(`prueba/?user=${params.userId}`);
  };
}

export default new API();
