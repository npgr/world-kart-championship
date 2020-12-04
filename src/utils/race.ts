import { POINTS_TABLE } from './constants';

export function getPointsByPosition(position: number) {
  return position < POINTS_TABLE.length ? POINTS_TABLE[position - 1] : 0;
}

export function convertToMiliseconds(time: string) {
  const hms = time.split(':');
  return (
    parseInt(hms[0]) * 3600000 +
    parseInt(hms[1]) * 60000 +
    Math.round(parseFloat(hms[2]) * 1000)
  );
}

export const getRaceIdFromName = (name: string) =>
  name.replace(/\s/g, '_').toLocaleLowerCase();
