import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { ThemeService } from './../SERVICE/theme.service';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  user_id;
  server;

  constructor(private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private http: HttpClient) {
      this.authService.userId.subscribe(resData => {
        this.user_id = resData;
      });
      this.server = this.authService.server;
      Plugins.Storage.get({key : "displayInstruction"}).then(val => {
        //console.log(val);
        if (val.value == null) {
          Plugins.Storage.set({key: 'displayInstruction', value: 'false'});
          let message = "Sur l'ancienne version, vous deviez cliquer sur 'Commencer le test' après chaque test, vous n'avez plus à effectuer cette tâche. Quand vous cliquez sur 'Commencer le test', le test va se dérouler 12 fois.";
          let header = 'Attention !';
          this.showAlert(message, header);
        } else {
         
        }
      });
    }

  time:number;
  
  aColor = 'rgb(201, 91, 91)';
  temps1: number;
  temps2: number;
  TR: number;
  ClickEvent = 0;
  FirstTry = 'Commencer le test';
  SecondTry = 'Recommencer le test';
  numberOfTest = 0;
  SaveTR: any = [];
  bestScore: number;
  tooSoon = 1;
  isodate = new Date();
  date = new Date(this.isodate.getTime() - (this.isodate.getTimezoneOffset() * 60000));
  day: string;
  month: string;
  year: string;
  currentDate: string;
  submitValue: any = {};
  buttonIsAble = false;
  buttonName = 'Commencer le test';
  round = 0;
  begin = true;
  heightTestTop = '50%';
  heightTestBottom = '50%';
  timeOut;
  color = false;
  notGoodTime = false;

  newVariable() {
    this.aColor = 'rgb(201, 91, 91)';

    this.ClickEvent = 0;
    this.FirstTry = 'Commencer le test';
    this.SecondTry = 'Recommencer le test';
    this.numberOfTest = 0;
    this.SaveTR = [];
    this.tooSoon = 1;
    this.isodate = new Date();
    this.date = new Date(this.isodate.getTime() - (this.isodate.getTimezoneOffset() * 60000));
    this.buttonIsAble = false;
    this.buttonName = 'Commencer le test';
    this.round = 0;
    this.begin = true;
    this.heightTestTop = '50%';
    this.heightTestBottom = '50%';
    this.timeOut;
    this.color = false;
    this.notGoodTime = false;

  }


  ngOnInit() {
    // console.log(this.date.getMonth().toString());
    console.log(this.date);
  }

  ionViewWillEnter() {
    this.newVariable();

      this.authService.userId.subscribe(resData=> {
        this.user_id = resData;
        console.log(this.user_id);
      });
    this.date = new Date(this.isodate.getTime() - (this.isodate.getTimezoneOffset() * 60000));
    this.numberOfTest = 0;
    delete this.submitValue;
    this.submitValue = {};
    this.bestScore = 0;
    this.TR = 0;
    this.bestScore = 0;
    this.SaveTR = [];
    this.begin = true;
    this.heightTestTop = '50%';
    this.heightTestBottom = '50%';
    this.buttonName = 'Commencer le test';
  }

  ionViewDidLoad() {
    // this.beginTest();
    // this.onClick();
  }

  ionViewWillLeave(){
    console.log('leave');
    clearTimeout(this.timeOut);
  }

  beginTest() {
    this.ClickEvent = 0;
    this.aColor = 'rgb(201, 91, 91)';
    this.time = (Math.random() + 1) * 2500;
    this.heightTestBottom= '70%';
    this.heightTestTop = '30%';
    this.color = false;
    this.begin = false;
    this.tooSoon = 1;
    this.buttonIsAble = true;
    this.buttonName = 'Test en cours';
    console.log(this.ClickEvent);
    this.timeOut = setTimeout(() => {
      this.aColor = 'rgb(92, 92, 192)';
      this.temps1 = performance.now();
      this.ClickEvent = 1;
    }, this.time);
  }

  onClick() {
    if (this.ClickEvent === 0) {
      console.log('too soon');
      this.notGoodTime = true;
      setTimeout(() => {
      this.notGoodTime = false;
      this.temps1 = 0;
      this.temps2 = 0;
      clearTimeout(this.timeOut);
      this.TR = 0;
      this.beginTest();
      }, 2500);

    }
    if ( this.ClickEvent === 1) {
      this.temps2 = performance.now();
      this.TR = Math.floor(this.temps2 - this.temps1);
      if (this.TR < 100) {
        this.ClickEvent = 0;
        this.tooSoon = 2;
        this.temps1 = 0;
        this.temps2 = 0;
        clearTimeout(this.timeOut);
        this.TR = 0;
        this.beginTest();
        // this.ClickEvent = 2;
        // this.aColor = 'rgb(201, 91, 91)';
        // this.buttonIsAble = false;
        // this.buttonName = 'Recommencer le test';

      }
      else {
        this.ClickEvent = 0;
        this.SaveTR.push(this.TR);
        this.bestScore = Math.min.apply(Math, this.SaveTR);
        console.log(this.SaveTR);
        this.ClickEvent = 2;
        this.aColor = 'rgb(201, 91, 91)';
        this.numberOfTest++;
        this.buttonIsAble = false;
        this.buttonName = 'Commencer le test';
        this.round = this.round + 1;
        console.log(this.round);
        if (this.round == 12) {
          
          this.begin = true;
          this.buttonIsAble = false;
          console.log('test over');
          console.log(this.submitValue);
          let body = {
            events: 'events',
            eventType: 'TEMPS DE REACTION',
            user_id: this.user_id,
            date: new Date(),
            startTime: new Date(),
            endTime: new Date (),
            allDay: 1
          };
          let RESULT = {
            TR1: this.SaveTR[0],
            TR2: this.SaveTR[1],
            TR3: this.SaveTR[2],
            TR4: this.SaveTR[3],
            TR5: this.SaveTR[4],
            TR6: this.SaveTR[5],
            TR7: this.SaveTR[6],
            TR8: this.SaveTR[7],
            TR9: this.SaveTR[8],
            TR10: this.SaveTR[9],
            TR11: this.SaveTR[10],
            TR12: this.SaveTR[11]
          };
          Object.assign(body,RESULT);
          this.http.post(this.server + 'file_aski.php',body).subscribe(resData => {
            console.log(resData);
            this.router.navigate(['./tabs/tab1'])
            let message = "Meilleur score :" + ' ' +  this.bestScore.toString() + ' ms';
            let header = 'Test terminé !';
            this.showAlert(message, header);
        });
          
          // let message = "Meilleur score :" + ' ' +  this.bestScore.toString() + ' ms';
          // let header = 'Test terminé !';
          // this.showAlert(message, header);
          this.numberOfTest = 0;
          //this.bestScore = 0;
          this.SaveTR = [];
          this.TR = 0;
          this.round = 0;

        } else {
          this.beginTest();
        }

      }
  }
    
    // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < this.SaveTR.length; i++) {
    //   this.submitValue[i] = this.SaveTR[i];
    // }
    // this.date = new Date().toLocaleDateString();
    // console.log(this.date);

    this.day = this.date.getDate().toString();
    // this.month = this.date.getMonth().toString();
    // console.log(this.date.toISOString());
    this.month = this.date.toISOString().substring(5, 7);
    this.year = this.date.getFullYear().toString();
    this.currentDate = `${this.day}-${this.month}-${this.year}` + ' à ' + this.date.toISOString().substring(11, 19);

    // this.afs.collection('TEMPS_REACTION')
    // .doc(this.fireauth.auth.currentUser.displayName)
    // .collection(this.currentDate)
    // .doc(this.currentDate)
    // .set(this.submitValue);
  }

  private  async showAlert(message: string, titre: string) {
    this.alertCtrl
      .create({
        cssClass: 'alertClass',
        header: titre,
        message: message,
        buttons: ['OK']
      })
      .then(alertEl => alertEl.present());
  }

}
