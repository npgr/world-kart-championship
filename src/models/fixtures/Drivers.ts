import { Driver, DriverRace, Race } from '../index';

interface IDriversData {
  drivers: Driver[];
  driversRaces: DriverRace[];
  races: Race[];
}

const MOCK_DRIVERS_DATA: IDriversData = {
  drivers: [
    {
      age: 38,
      id: '1',
      name: 'Padilla Adkins',
      picture: 'http://placehold.it/64x64',
      team: 'EURON',
      totalPoints: 96,
      position: 1,
    },
    {
      age: 39,
      id: '2',
      name: 'Richards Floyd',
      picture: 'http://placehold.it/64x64',
      team: 'VENDBLEND',
      totalPoints: 88,
      position: 2,
    },
  ],
  driversRaces: [
    {
      accumulatedPoints: 48,
      driverId: '1',
      milliseconds: 4299515,
      points: 48,
      racePosition: 1,
      generalPosition: 1,
      raceId: 'race_0',
      time: '1:11:39.515',
    },
    {
      accumulatedPoints: 44,
      driverId: '2',
      milliseconds: 4613224,
      points: 44,
      racePosition: 2,
      generalPosition: 2,
      raceId: 'race_0',
      time: '1:16:53.224',
    },
    {
      accumulatedPoints: 96,
      driverId: '1',
      milliseconds: 4644312,
      points: 48,
      racePosition: 1,
      generalPosition: 1,
      raceId: 'race_1',
      time: '1:17:24.312',
    },
    {
      accumulatedPoints: 88,
      driverId: '2',
      milliseconds: 5492533,
      points: 44,
      racePosition: 2,
      generalPosition: 2,
      raceId: 'race_1',
      time: '1:31:32.533',
    },
  ],
  races: [
    {
      id: 'race_0',
      name: 'Race 0',
    },
    {
      id: 'race_1',
      name: 'Race 1',
    },
  ],
};

export const driversDataMockBuilder = () => MOCK_DRIVERS_DATA;
