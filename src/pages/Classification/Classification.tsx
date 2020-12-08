import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { getDrivers } from '../../store/drivers/drivers.actions';
import {
  selectDrivers,
  selectIsLoading,
} from '../../store/drivers/drivers.selectors';
import { ApiIndicator } from '../../store/shared';
import { Driver } from '../../models/Driver';
import { LoadingScreen, Table } from '../../components/UI';
import ROUTES from '../../routes';
import { Typography } from '@material-ui/core';

interface IDriversProps {
  history: History;
}

const Drivers = ({ history }: IDriversProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);
  const drivers = useSelector(selectDrivers);
  const { formatMessage } = useIntl();

  const columns = [
    {
      id: 'position',
      label: formatMessage({ id: 'driver.position' }),
    },
    {
      id: 'name',
      label: formatMessage({ id: 'driver.name' }),
    },
    { id: 'age', label: formatMessage({ id: 'driver.age' }) },
    {
      id: 'team',
      label: formatMessage({ id: 'driver.team' }),
    },
    {
      id: 'totalPoints',
      label: formatMessage({ id: 'driver.points' }),
    },
  ];

  const formatTableRows = (drivers: Driver[]) =>
    drivers.map((driver) => ({
      ...driver,
      onClick: () => history.push(ROUTES.DRIVER.replace(':id', driver.id)),
    }));

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h6">
        {formatMessage({ id: 'driver.classification' })}
      </Typography>
      {isLoading === ApiIndicator.Start ? (
        <LoadingScreen />
      ) : (
        <Box width="45rem">
          {isLoading === ApiIndicator.Success && (
            <Table columns={columns} rows={formatTableRows(drivers)} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Drivers;
