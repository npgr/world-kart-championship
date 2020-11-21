import axios, { AxiosStatic } from 'axios';
import api from './api';

jest.mock('axios');

describe('API tests', () => {
  let mockedAxios: jest.Mocked<AxiosStatic>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<AxiosStatic>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Drivers API', () => {
    test('should return drivers data on getDrivers()', async () => {
      const EXPECTED_DATA = ['driver1'];
      const EXPECTED_CALL = 'drivers/';

      mockedAxios.get.mockResolvedValueOnce({
        data: EXPECTED_DATA,
      });

      expect(await api.getDrivers()).toEqual({
        data: EXPECTED_DATA,
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(EXPECTED_CALL);
    });
  });
});
