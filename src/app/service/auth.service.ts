import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { Plugins } from '@capacitor/core';

export interface AuthResponseData {
  user_id: string;
  nom: string;
  prenom: string;
  expiration: string;
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {

        return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          //return 1;
          console.log('Userid Observable',user);
          return user.user_id;
        } else {
          //return 1;
          //console.log('null')
          return null;
        }
      })
    );
    // return Plugins.Storage.get({key : "authData"}).then(val => {
    //   if (val) {
    //     let authData = JSON.parse(val.value);
    //     console.log(authData);
    //     //let user_id = (authData.userId);
    //     return this._user.next(authData);
    //   } else {
    //     return null;
    //   }
    // })
}



  get token() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  
  constructor(
    private http: HttpClient) { }
    
    //server: string = 'https://fatigue-covid.univ-st-etienne.fr/server_api/';
    server: string = 'https://trainimm.univ-st-etienne.fr/server_api/';
    //server : string = 'http://localhost/TRAINIMM_V2/server_api/';
    //server: string = 'https://www.beyondthecourt.fr/server_api/';


    login(object) {
let type = 'application/json; charset=utf-8';
let headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
let options = {headers:headers};
let file = 'login.php';
console.log('here');


      return this.http
        .post<AuthResponseData>(this.server + file, JSON.stringify(object), options)
        .pipe(tap(this.setUserData.bind(this)));
    }

    autoLogin() {
      console.log('autologin');
      return from(Plugins.Storage.get({ key: 'authData' })).pipe(
        map(storedData => {
          
          if (!storedData || !storedData.value) {
            return null;
          }
          const parsedData = JSON.parse(storedData.value) as {
            user_id: string,
            nom: string,
            prenom: string,
            token: string,
            tokenExpirationDate: string
          };
          const expirationTime = new Date(parsedData.tokenExpirationDate);
          if (expirationTime <= new Date()) {
            return null;
          }
          const user = new User(
            parsedData.user_id,
            parsedData.nom,
            parsedData.prenom,
            parsedData.token,
            expirationTime
          );
          return user;
        }),
        tap(user => {
          if (user) {
            this._user.next(user);
            this.autoLogout(user.tokenDuration);
          }
        }),
        map(user => {
          return !!user;
        })
      );
    }

    logout() {
      if (this.activeLogoutTimer) {
        clearTimeout(this.activeLogoutTimer);
      }
      this._user.next(null);
      Plugins.Storage.remove({ key: 'authData' });
    }

    ngOnDestroy() {
      if (this.activeLogoutTimer) {
        clearTimeout(this.activeLogoutTimer);
      }
    }

    private autoLogout(duration: number) {
      if (this.activeLogoutTimer) {
        clearTimeout(this.activeLogoutTimer);
      }
      this.activeLogoutTimer = setTimeout(() => {
        this.logout();
      }, duration);
    }

    private setUserData(userData: AuthResponseData) {
      console.log(userData);
      const expirationTime = new Date(
        new Date().getTime() + +userData['result'].expiration * 1000
      );
      const user = new User(
        userData['result'].user_id,
        userData['result'].nom,
        userData['result'].prenom,
        userData['result'].token,
        expirationTime,
      );
      
      this._user.next(user);
      //this.autoLogout(user.tokenDuration);
      this.storeAuthData(
        userData['result'].user_id,
        userData['result'].nom,
        userData['result'].prenom,
        userData['result'].token,
        expirationTime.toISOString()
      );
    }

    private storeAuthData(
      user_id: string,
      nom: string,
      prenom: string,
      token: string,
      tokenExpirationDate: string
    ) {
      const data = JSON.stringify({
        user_id: user_id,
        nom: nom,
        prenom: prenom,
        token: token,
        tokenExpirationDate: tokenExpirationDate
      });
      Plugins.Storage.set({ key: 'authData', value: data });
    }

}
