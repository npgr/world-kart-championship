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

export const selectRaces = createSelector(
  [driverStateSelector],
  ({ races }) => races
);

export const selectDriversRaces = createSelector(
  [driverStateSelector],
  ({ driversRaces }) => driversRaces
);

export const selectIsLoading = createSelector(
  [driverStateSelector],
  ({ isLoading }) => isLoading
);
