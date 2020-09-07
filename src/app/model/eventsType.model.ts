export class eventsType {
    constructor(
      public user_id: number,
      public unique_id: number,
      public title: string,
      public date: string,
      public startTime: string,
      public endTime: string,
      public allDay: boolean
    ) {}
  }
