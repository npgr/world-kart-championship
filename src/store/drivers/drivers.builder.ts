import { Driver, Race, DriverRace, DriversResponse } from '../../models';
import {
  convertToMiliseconds,
  getRaceIdFromName,
  getPointsByPosition,
} from '../../utils/race';

export const driversBuilder = (data: DriversResponse[]) => {
  let driversInit: Driver[] = [];
  let drivers: Driver[] = [];
  let driversRacesInit: DriverRace[] = [];
  let driversRaces: DriverRace[] = [];
  let races: Race[] = [];
  let accumulatedPoints: { [key: string]: number } = {};

  const getPoints = (driverId: string, position: number) => {
    const points = getPointsByPosition(position);
    accumulatedPoints[driverId]
      ? (accumulatedPoints[driverId] += points)
      : (accumulatedPoints[driverId] = points);

    return { points, accumulatedPoints: accumulatedPoints[driverId] };
  };

  data.forEach(
    ({ _id: id, picture, age, name, team, races: oneDriverRaces }, index) => {
      if (index === 0) {
        races = oneDriverRaces.map(({ name }) => ({
          id: getRaceIdFromName(name),
          name: name,
        }));
      }
      driversInit = [
        ...driversInit,
        { id, picture, age, name, team, totalPoints: 0 },
      ];
      driversRacesInit = [
        ...driversRacesInit,
        ...oneDriverRaces.map(({ name, time }) => ({
          driverId: id,
          raceId: getRaceIdFromName(name),
          time: time,
          milliseconds: convertToMiliseconds(time),
          position: 0,
          points: 0,
          accumulatedPoints: 0,
        })),
      ];
    }
  );

  races.forEach(({ id: raceId }) => {
    const oneRace = driversRacesInit
      .filter((race) => race.raceId === raceId)
      .sort(function (a, b) {
        return a.milliseconds - b.milliseconds;
      })
      .map((race, index) => ({
        ...race,
        ...getPoints(race.driverId, index + 1),
        position: index + 1,
      }));
    driversRaces = [...driversRaces, ...oneRace];
  });

  drivers = driversInit.map((driver) => ({
    ...driver,
    totalPoints: accumulatedPoints[driver.id],
  }));

  return { drivers, races, driversRaces };
};
