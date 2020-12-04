import * as raceUtils from './race';
import { POINTS_TABLE } from './constants';

describe('Race utils', () => {
  test('it should replace blanks with underscore on getRaceIdFromName(name)', () => {
    const MOCK_RACE_NAME = 'The race  1';
    const EXPECTED_RACE_ID = 'the_race__1';

    expect(raceUtils.getRaceIdFromName(MOCK_RACE_NAME)).toBe(EXPECTED_RACE_ID);
  });

  test('it should get points according race position on getPointsByPosition(position)', () => {
    for (let position = 1; position < 35; position++) {
      expect(raceUtils.getPointsByPosition(position)).toBe(
        POINTS_TABLE[position - 1]
      );
    }
  });

  test('it should convert a time hh:mm:ss into milliseconds on convertToMiliseconds(time)', () => {
    const MOCK_TIME = '1:1:1.234';
    const EXPECTED_MILLISECONDS = 3661234;

    expect(raceUtils.convertToMiliseconds(MOCK_TIME)).toBe(
      EXPECTED_MILLISECONDS
    );
  });
});
