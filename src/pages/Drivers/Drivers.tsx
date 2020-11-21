import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../store/drivers/drivers.actions';

const Drivers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return <div>Drivers page</div>;
};

export default Drivers;
