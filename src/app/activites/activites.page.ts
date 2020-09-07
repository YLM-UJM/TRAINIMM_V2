import { Component, OnInit } from '@angular/core';

// import { InAppBrowser } from 'ionic-native';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-activites',
  templateUrl: './activites.page.html',
  styleUrls: ['./activites.page.scss'],
})
export class ActivitesPage implements OnInit {
  activities;
  user_id;
  server;
  code;
  display = true;
  stravaButton = true;
  loading = true;

  constructor(public platform:Platform, public router: Router, public http: HttpClient, public authService: AuthService) { 
    this.authService.userId.subscribe(resData => {
      this.user_id = resData;
      //console.log(this.user_id);
  });
  this.server = this.authService.server;

  }

  ngOnInit() {
    let urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (code) {
      this.stravaButton = false;
      let body = {};
      console.log(code);
      this.http.post('https://www.strava.com/oauth/token?client_id=46746&client_secret=8bad82efd8778153f3ef2117460519eba779c077&code=' + code + '&grant_type=authorization_code',body).subscribe(resData => {
        body = {
          user_id:this.user_id,
          access_token: resData['access_token'],
          refresh_token: resData['refresh_token'],
          expires_at: resData['expires_at'],
          expires_in: resData['expires_in'],
          code: code,
          aski: 'stravaData'
        }
        let access_token = resData['access_token'];
        this.http.post(this.server + 'saveStrava.php',body).subscribe(resData=> {
          console.log(resData);
          this.http.get('https://www.strava.com/api/v3/athlete/activities' + '?access_token=' + access_token + '&per_page=200').subscribe(resData => {
            console.log(resData);
          this.activities = resData;  
          this.display = true;
          this.loading = false;
          })
        })
      })
    } else {
      this.stravaButton = false;
      this.http.get(this.server + `getStrava.php?id=${this.user_id}`).subscribe(resData=> {
        console.log(resData);
        if (resData[0]) {
          console.log('data ok')
          let access_token = resData[0]['access_token'];
          
          let timestamp_access_token = resData[0]['created_at'];
          let expires_in = resData[0]['expires_in'];
          let year = timestamp_access_token.substring(0,4);
          let month = timestamp_access_token.substring(5,7);
          let day = timestamp_access_token.substring(8,10);
          let heure = timestamp_access_token.substring(11,13);
          let minute = timestamp_access_token.substring(14,16);
          let sec = timestamp_access_token.substring(17,19);
          let timestamp_access_token_goodformat = new Date(year,month-1,day,heure,minute,sec);
          let currentDate = new Date();
          let access_token_expiration = Math.round(currentDate.getTime() - timestamp_access_token_goodformat.getTime()) / 1000;
          if (access_token_expiration > expires_in ) {
            console.log('ask new token');
            let refresh_token = resData[0]['refresh_token'];

            let body = {};
            this.http.post('https://www.strava.com/api/v3/oauth/token?client_id=46746&client_secret=8bad82efd8778153f3ef2117460519eba779c077&grant_type=refresh_token&refresh_token=' + refresh_token ,body).subscribe(resData=> {
            console.log(resData);
              let access_token = resData['access_token'];
              let refresh_token = resData['refresh_token'];
              let expires_in = resData['expires_in'];
              let expires_at = resData['expires_at'];
              let body = {
                user_id:this.user_id,
                access_token : access_token,
                refresh_token: refresh_token,
                expires_in: expires_in,
                expires_at: expires_at,
                aski: 'updateToken'
              };
              console.log(body);
              this.http.post(this.server + 'saveStrava.php',body).subscribe(resData=> {
                console.log(resData);
                this.http.get('https://www.strava.com/api/v3/athlete/activities' + '?access_token=' + access_token + '&per_page=200').subscribe(resData => {
                  this.activities = resData;  
                  this.display = true;
                  this.loading = false;
                })
              })
            })
          } else {
            console.log('token still valid')
            this.http.get('https://www.strava.com/api/v3/athlete/activities' + '?access_token=' + access_token + '&per_page=200').subscribe(resData => {
              console.log(resData);
              this.activities = resData;  
              this.display = true;
              this.loading = false;
            })
          }

        } else {
          this.loading = false;
          this.stravaButton = true;
          console.log('nothing need to click strava button')
        }
      })

    }

  }


  connectWithStrava() {
    this.router.navigateByUrl('http://www.google.fr');
  }



}
