export class DriversResponse {
    constructor(
      public _id: string,
      public picture: string,
      public age: number,
      public name: string,
      public team: string,
      public races: {
          name: string,
          time: string
      }[]
    ) {}
  }