import axios, { AxiosStatic } from "axios";

export class API {
  http: AxiosStatic;
  constructor() {
    this.http = axios;
    this.http.defaults.baseURL = 'http://localhost:5000/api/'
  }

  public getDrivers = () => {
    return this.http.get('drivers/');
  };
}

export default new API();
