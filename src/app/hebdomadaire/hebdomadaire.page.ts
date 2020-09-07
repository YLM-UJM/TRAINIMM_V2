import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hebdomadaire',
  templateUrl: './hebdomadaire.page.html',
  styleUrls: ['./hebdomadaire.page.scss'],
})
export class HebdomadairePage implements OnInit {


questions = [
  {
    id: 1,
    type: 'singleInput',
    text: 'Quel était votre poids au réveil ce matin ?',
    textType: 'number',
    required: true,
    placeholder: 'Entrez ici',
    answer: ''
  },
  {
    id: 2,
    type: 'rating',
    text: 'Quel a été votre niveau de forme cette semaine ?',
    subtitle: '0 : très mauvaise - 10 : très bonne',
    min: 0,
    max: 10,
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    answer: 0,
    move: false
  },
  {
    id: 3,
    type: 'singleChoice',
    text: 'Avez-vous été blessé cette semaine ?',
    items: [
      { id: 1, text: 'Oui' },
      { id: 2, text: 'Non' }
    ],
    subtitle : 'Si oui, remplissez le questionnaire blessure',
    required: true,
    answer: ''
  },
  {
    id: 4,
    type: 'rating',
    text: 'Cette semaine, quel a été votre niveau de fatigue générale ?',
    subtitle: '0 : aucune fatigue - 10 : très grosse fatigue',
    min: 0,
    max: 10,
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    answer: 0
  },
  {
    id: 5,
    type: 'rating',
    text: 'Cette semaine, quel a été votre niveau de douleur aux jambes ?',
    subtitle: '0 : aucune douleur - 10 : grosse douleur',
    min: 0,
    max: 10,
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true, 
    answer: 0
  },
  {
    id: 6,
    type: 'rating',
    text: 'Cette semaine, quel a été votre niveau de stress ?',
    subtitle: '0 : très faible - 10 : très fort',
    min: 0,
    max: 10,
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    answer: 0
  },
  {
    id: 7,
    type: 'singleChoice',
    text: 'Avez-vous fait le test du parcours habituel ?',
    items: [
      { id: 1, text: 'Oui' },
      { id: 2, text: 'Non' }
    ],
    required: true, 
    answer: 0
  },
  {
    id: 8,
    type: 'temps',
    text: 'Si oui, quel est votre temps ?',
    dateType: '',
    Format: 'dateTimeTypes.militarmmss',
    required: false,
    placeholder: 'Selectionnez ici',
    h: null,
    mn: null,
  },
  {
    id: 9,
    type: 'singleInput',
    text: 'Si oui, votre fréquence cardiaque (bpm)',
    textType: 'number',
    required: false,
    placeholder: 'Entrez ici (ex: 145)',
    answer: ''
  }
];

user_id: string;
server: string;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router
  ) {

    this.authService.userId.subscribe(resData => {
      this.user_id = resData;
      //console.log(this.user_id);
  });
  this.server = this.authService.server;
   }

  ngOnInit() {
    console.log(this.questions);
  }

  ionViewWillEnter(){
    this.authService.userId.subscribe(resData=> {
      this.user_id = resData;
    })
  }

  focus(id: number){
    console.log(id);
    this.questions[id-1].move = true;
    console.log(this.questions);
  }

  addEvent() {
    if (this.questions[0].answer == '') {
      console.log('poids manquant')
    } else if (!this.questions[1].move) {
      console.log('not change');
    } else if (this.questions[2].answer == '') {
      console.log('blesse non rempli');
    } else if (!this.questions[3].move) {
      console.log('not change');
    } else if (!this.questions[4].move) {
      console.log('not change');
    } else if (!this.questions[5].move) {
      console.log('not change');
    } else if (this.questions[6].answer == '') {
      console.log('parcours habituel');
    } else if (this.questions[6].answer == 'Oui' && this.questions[7].h == null && this.questions[7].mn == null) {
      console.log('votre temps ? ');
    } else if (this.questions[6].answer == 'Oui' && this.questions[8].answer == '') {
      console.log('votre fc ? ');
    } else {
      let body = {
        events: 'events',
        eventType: 'HEBDOMADAIRE',
        user_id: this.user_id,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date (),
        allDay: 1,
        poids: this.questions[0].answer,
        niveau_forme: this.questions[1].answer,
        blesse: this.questions[2].answer,
        fatigue_generale: this.questions[3].answer,
        douleurs_jambes: this.questions[4].answer,
        stress: this.questions[5].answer,
        parcours_habituel: this.questions[6].answer,
        temps: this.convertToTime(this.questions[7].h, this.questions[7].mn),
        fc: this.questions[8].answer == '' ? 0 : this.questions[8].answer
      }
      console.log(body);
      this.http.post(this.server + 'file_aski.php',body).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['./tabs/tab1'])
        let message = "Questionnaire ajouté.";
        let header = 'Succès';
        this.showAlert(message, header);


    });
    }

  }

  convertToTime(h: number,mn:number){
    let MN: string;
    let H: string;
    console.log(mn)
   //console.log(mn);
   //console.log(s);
   console.log('here');
   if (h == undefined) {
     H = '00';
   } else {
     H = h.toString()
   }
   if (mn == undefined) {
     MN = '00';
   } else {
     MN = mn.toString();
     console.log(MN);
     if (mn < 10) {
       console.log('moins 10')
       MN = '0' + mn.toString()
     }
   }
     return H + MN + '00';
 }

 private showAlert(message: string, titre: string) {
  this.alertCtrl
    .create({
      header: titre,
      message: message,
      buttons: ['OK']
    })
    .then(alertEl => alertEl.present());
}

}
