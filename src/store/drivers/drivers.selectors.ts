import { createSelector } from 'reselect';
import { IDriversState } from './drivers.reducer';

interface IDriver {
  drivers: IDriversState;
}

const driverStateSelector = ({ drivers }: IDriver) => drivers;

export const selectDrivers = createSelector(
  [driverStateSelector],
  ({ drivers }) => drivers
);

export const selectDriver = createSelector(
  [driverStateSelector],
  ({ drivers }) => (id: string) => drivers.find((driver) => driver.id === id)
);

export const selectRaces = createSelector(
  [driverStateSelector],
  ({ races }) => races
);

export const selectDriverRaces = createSelector(
  [driverStateSelector],
  ({ driversRaces }) => (driverId: string) =>
    driversRaces.filter((race) => race.driverId === driverId)
);

export const selectIsLoading = createSelector(
  [driverStateSelector],
  ({ isLoading }) => isLoading
);
