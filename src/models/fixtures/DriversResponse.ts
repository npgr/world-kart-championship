import { DriversResponse } from '../DriversResponse';

const MOCK_DRIVERS_RESPONSE: DriversResponse[] = [
  {
    _id: '1',
    picture: 'http://placehold.it/64x64',
    age: 38,
    name: 'Padilla Adkins',
    team: 'EURON',
    races: [
      {
        name: 'Race 0',
        time: '1:11:39.515',
      },
      {
        name: 'Race 1',
        time: '1:17:24.312',
      },
    ],
  },
  {
    _id: '2',
    picture: 'http://placehold.it/64x64',
    age: 39,
    name: 'Richards Floyd',
    team: 'VENDBLEND',
    races: [
      {
        name: 'Race 0',
        time: '1:16:53.224',
      },
      {
        name: 'Race 1',
        time: '1:31:32.533',
      },
    ],
  },
];

export const driversResponseMockBuilder = () => MOCK_DRIVERS_RESPONSE;
