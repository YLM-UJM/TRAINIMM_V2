import { Injectable } from '@angular/core';
import { eventsType } from './../model/eventsType.model';
import { BehaviorSubject } from 'rxjs';
import { take, switchMap, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { DblinkService } from './dblink.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  server: string;

  private _Event = new BehaviorSubject<eventsType[]>([
  ]);

  get Events() {
    return this._Event.asObservable();
  }
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private postService: DblinkService
    ) { 
      this.server = this.authService.server;

    }

  fetchEvents(champ: string) {
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        //console.log(userId);
        return this.http.get(this.server + `json.php?table=${'EVENTS'}&id=${userId}&champ=${champ}`);
      }),
      map(resData => {
        //console.log(resData);
        const events = [];
        for (const user_id in resData) {
            events.push(
              //new eventsType(
                {
                  unique_id: parseInt(resData[user_id].unique_id),
                  user_id: parseInt(resData[user_id].user_id),
                  title: resData[user_id].eventType,
                  date: resData[user_id].date,
                  startTime: new Date(resData[user_id].startTime),
                  endTime: new Date(resData[user_id].endTime),
                  allDay: resData[user_id].allDay == '0' ? false : true,
                }

              )
              //)
        }
        return events;
        // return [];
      }),
      tap(events => {
        this._Event.next(events);
      })
    );
  }

  // addEvent(
  //   title: string,
  //   date: string,
  //   color: string
  // ) {
  //   const newEvent = new personnalEvent(
  //     title,
  //     date,
  //     color
  //   );
  //   this.Events.pipe(take(1)).subscribe(events =>  {
  //     this._Event.next(events.concat(newEvent))

  //   })
  // }

  // addEvent(
  //   title: string,
  //   duree: string,
  //   difficulte: string,
  //   date: string,
  //   color: string
  // ) {
  //   let generatedId: string;
  //   let fetchedUserId: string;
  //   let newEvent: eventsType;
  //   return this.authService.userId.pipe(
  //     take(1),
  //     switchMap(userId => {
  //       //let unique_id = Math.floor(Math.random()*100000);
  //       //console.log(unique_id);
  //       let body = {
  //         user_id: userId,
  //         survey_type: "AP",
  //         title: title,
  //         duree: duree,
  //         difficulte: difficulte,
  //         date: date,
  //         color: color,
  //         //unique_id: unique_id,
  //         aksi: 'Activity'
  //       };

  //       return this.postService.postData(body,'file_aski.php');
  //     }),
  //     take(1),
  //     switchMap(resData => {
  //       console.log(resData);
  //       newEvent = new eventsType(
  //         resData['unique_id'],
  //         title,
  //         date,
  //         color,
  //         duree,
  //         difficulte,
  //       )
  //       console.log(resData);
  //       return this.Events;
  //     }),
  //     take(1),
  //     tap(Events => {
  //       this._Event.next(Events.concat(newEvent));
  //     })
  //   );
  //   // return this.places.pipe(
  //   //   take(1),
  //   //   delay(1000),
  //   //   tap(places => {
  //   //     this._places.next(places.concat(newPlace));
  //   //   })
  //   // );
  // }

  // updateEvent(
  //   unique_id: number,
  //   title: string,
  //   duree: string,
  //   difficulte: string,
  //   date: string,
  //   color: string
  // ) {
  //   let updatedEvent: eventsType[];
  //   return this.authService.userId.pipe(
  //     take(1),
  //     switchMap(resData => {
  //       let user_id = resData;
  //       let body = {
  //         unique_id : unique_id,
  //         user_id : user_id,
  //         survey_type: "AP",
  //         title : title,
  //         duree : duree,
  //         difficulte : difficulte,
  //         date : date,
  //         color: color,
  //         aksi : 'updateActivity'
  //       }
  //       return this.postService.postData(body,'file_aski.php');
  //     }),
  //     take(1),
  //     switchMap(resData => {
  //       console.log(resData);
  //       return this.fetchEvents('*');
  //     }
  //     ),
  //     take(1),
  //     tap(events=> {
  //       console.log(events);
  //       const updatedEventIndex = events.findIndex(ev => ev.id === unique_id);
  //       updatedEvent = [...events];
  //       const oldEvent = updatedEvent[updatedEventIndex];
  //       console.log(oldEvent.id);
  //       updatedEvent[updatedEventIndex] = new eventsType(
  //         oldEvent.id,
  //         title,
  //         date,
  //         color
  //       );
  //       this._Event.next(updatedEvent);
  //     })
  //   )

  // }

  // deleteEvent(unique_id: string) {
  //   return this.authService.userId.pipe(
  //     take(1),
  //     switchMap(userId => {
  //       let body = {
  //         user_id: parseInt(userId),
  //         unique_id: parseInt(unique_id),
  //         aksi: 'delete'
  //       }
  //       return this.postService.postData(body,'file_aski.php'
  //       );
  //     }),
  //     switchMap(resData => {
  //       console.log(resData);
  //       return this.fetchEvents('*');
  //     }),
  //     take(1),
  //     tap(Events => {
  //       this._Event.next(Events.filter(ev => ev.id !== parseInt(unique_id)));
  //     })
  //   );
  // }

  // updatePlace(placeId: string, title: string, description: string) {
  //   let updatedPlaces: Place[];
  //   let fetchedToken: string;
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap(token => {
  //       fetchedToken = token;
  //       return this.places;
  //     }),
  //     take(1),
  //     switchMap(places => {
  //       if (!places || places.length <= 0) {
  //         return this.fetchPlaces();
  //       } else {
  //         return of(places);
  //       }
  //     }),
  //     switchMap(places => {
  //       const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
  //       updatedPlaces = [...places];
  //       const oldPlace = updatedPlaces[updatedPlaceIndex];
  //       updatedPlaces[updatedPlaceIndex] = new Place(
  //         oldPlace.id,
  //         title,
  //         description,
  //         oldPlace.imageUrl,
  //         oldPlace.price,
  //         oldPlace.availableFrom,
  //         oldPlace.availableTo,
  //         oldPlace.userId,
  //         //oldPlace.location
  //       );
  //       return this.http.put(
  //         `https://todo-6934e.firebaseio.comoffered-places/${placeId}.json?auth=${fetchedToken}`,
  //         { ...updatedPlaces[updatedPlaceIndex], id: null }
  //       );
  //     }),
  //     tap(() => {
  //       this._places.next(updatedPlaces);
  //     })
  //   );
  // }
}
