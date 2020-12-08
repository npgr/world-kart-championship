import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivers } from '../../store/drivers/drivers.actions';
import { selectIsLoading } from '../../store/drivers/drivers.selectors';
import { ApiIndicator } from '../../store/shared';
import { LoadingScreen } from '../../components/UI';
import DriverDetail from '../../components/DriverDetail';

interface MatchParams {
  id: string;
}

interface IDriverProps extends RouteComponentProps<MatchParams> {}

const Driver = ({
  match: {
    params: { id },
  },
}: IDriverProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    isLoading === ApiIndicator.Empty && dispatch(getDrivers());
  }, [dispatch, isLoading]);

  return isLoading === ApiIndicator.Start ? (
    <LoadingScreen />
  ) : (
    <DriverDetail id={id} />
  );
};

export default Driver;
