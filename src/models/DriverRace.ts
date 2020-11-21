export class DriverRace {
  constructor(
    public driverId: string,
    public raceId: string,
    public time: string,
    public position: number,
    public points: number,
    public accumulatedPoints: number
  ) {}
}
