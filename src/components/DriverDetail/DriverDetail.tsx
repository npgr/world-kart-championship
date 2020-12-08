import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  selectDriver,
  selectDriverRaces,
} from '../../store/drivers/drivers.selectors';
import Table from '../UI/Table';

interface IDriverDetail {
  id: string;
}

const DriverDetail = ({ id }: IDriverDetail) => {
  const [currentRace, setCurrentRace] = useState(0);
  const { formatMessage } = useIntl();
  const driver = useSelector(selectDriver)(id);
  const driverRaces = useSelector(selectDriverRaces)(id);
  useEffect(() => {
    const interval = setInterval(() => {
      currentRace < driverRaces.length && setCurrentRace(currentRace + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentRace, driverRaces]);

  const columns = [
    {
      id: 'raceName',
      label: formatMessage({ id: 'race.race' }),
    },
    {
      id: 'time',
      label: formatMessage({ id: 'race.time' }),
    },
    {
      id: 'racePosition',
      label: formatMessage({ id: 'race.position' }),
      align: 'center',
    },
    {
      id: 'points',
      label: formatMessage({ id: 'race.points' }),
      align: 'center',
    },
  ];

  const racesToShow = driverRaces.slice(0, currentRace);
  const currentClassification = currentRace
    ? driverRaces[currentRace - 1].generalPosition
    : 0;
  const accumulatedPoints = currentRace
    ? driverRaces[currentRace - 1].accumulatedPoints
    : 0;

  const getOutput = (label: string, value: string | number | undefined) =>
    `${formatMessage({ id: label })}: ${value}`;

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box display="flex" justifyContent="center">
        <Box>
          <img src={driver?.picture} width={180} alt={driver?.name || ''} />
        </Box>
        <Box style={{ padding: '1rem' }}>
          <Typography variant="h4">{driver?.name}</Typography>
          <Typography>{getOutput('driver.age', driver?.age)}</Typography>
          <Typography>{getOutput('driver.team', driver?.team)}</Typography>
          <Typography>
            {getOutput('driver.classification', currentClassification)}
          </Typography>
          <Typography>
            {getOutput('driver.points', accumulatedPoints)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box width="30rem">
          <Table columns={columns} rows={racesToShow} />
        </Box>
      </Box>
    </Box>
  );
};

export default DriverDetail;
