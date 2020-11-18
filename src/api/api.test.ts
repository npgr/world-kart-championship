import axios, { AxiosStatic } from "axios";
import api from "./api";

jest.mock("axios");

describe("API tests", () => {
  let mockedAxios: jest.Mocked<AxiosStatic>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<AxiosStatic>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Delete: example code
  describe("Prueba API", () => {
    test("should return user data on getPrueba() with all parameters", async () => {
      const MOCK_USER_ID = 99;
      const MOCK_PARAMS = { userId: MOCK_USER_ID };

      const EXPECTED_DATA = { data: "OK" };
      const EXPECTED_CALL = `prueba/?user=${MOCK_USER_ID}`;

      mockedAxios.get.mockResolvedValueOnce({
        data: EXPECTED_DATA,
      });

      expect(await api.getPrueba(MOCK_PARAMS)).toEqual({
        data: EXPECTED_DATA,
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(EXPECTED_CALL);
    });
  });
});
