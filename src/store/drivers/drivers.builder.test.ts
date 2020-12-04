import { driversBuilder } from './drivers.builder';
import { driversDataMockBuilder } from '../../models/fixtures/Drivers';
import { driversResponseMockBuilder } from '../../models/fixtures/DriversResponse';

describe('Drivers data builder', () => {
  test('return transformed data', () => {
    const MOCK_RESPONSE_DATA = driversResponseMockBuilder();
    const EXPECTED_TRANSFORMED_DATA = driversDataMockBuilder();

    const transformedData = driversBuilder(MOCK_RESPONSE_DATA);

    expect(transformedData).toEqual(EXPECTED_TRANSFORMED_DATA);
  });
});
