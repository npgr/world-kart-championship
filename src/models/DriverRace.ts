export class DriverRace {
  constructor(
    public driverId: string,
    public raceId: string,
    public time: string,
    public milliseconds: number,
    public racePosition: number,
    public points: number,
    public accumulatedPoints: number,
    public generalPosition: number
  ) {}
}
