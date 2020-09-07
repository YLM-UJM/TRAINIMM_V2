import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sommeil',
  templateUrl: './sommeil.page.html',
  styleUrls: ['./sommeil.page.scss'],
})
export class SommeilPage implements OnInit {
  questions =  [
    {
      id: 1,
      type: 'temps',
      text: 'A quelle heure vous êtes-vous endormis hier soir ?',
      dateType: '',
      Format: '',
      required: true,
      placeholder: 'Sélectionnez ici',
      h: null,
      mn: null
      
    },
    {
      id: 2,
      type: 'temps',
      text: 'A quelle heure vous êtes-vous réveillés ce matin ?',
      dateType: '',
      Format: '',
      required: true,
      placeholder: 'Sélectionnez ici',
      h: null,
      mn: null,
    },
    {
      id: 3,
      type: 'singleChoice',
      text: 'Combien de temps vous a-t-il fallu pour vous endormir la nuit dernière ?',
      answer: '',
      items: [
        { id: 1, text: '5 - Très peu de temps' },
        { id: 2, text: '4 - Peu de temps' },
        { id: 3, text: '3 - Moyennement long temps' },
        { id: 4, text: '2 - Longtemps' },
        { id: 5, text: '1 - Très longtemps (je suis resté éveillé longtemps)' },
        { id: 6, text: '0 - Ne sais pas' }
      ],
      required: true
    },
    {
      id: 4,
      type: 'singleChoice',
      text: 'Avez-vous bien dormi ?',
      answer: '',
      items: [
        { id: 1, text: '5 - Oui, de façon parfaite (d’un sommeil paisible, sans réveil nocturne)' },
        { id: 2, text: '4 - Oui, bien' },
        { id: 3, text: '3 - Moyennement bien' },
        { id: 4, text: '2 - Non, mal' },
        { id: 5, text: '1 - Non, très mal (sommeil agité, réveils fréquents)' },
        { id: 6, text: '0 - Ne sais pas' }
      ],
      required: true
    },
    {
      id: 5,
      type: 'singleChoice',
      text: 'Combien de temps avez-vous dormi ?',
      answer: '',
      items: [
        { id: 1, text: '5 - Très longtemps (je ne me suis pas réveillé spontanément)' },
        { id: 2, text: '4 - Longtemps' },
        { id: 3, text: '3 - Moyennement longtemps' },
        { id: 4, text: '2 - Peu de temps' },
        { id: 5, text: '1 - Très peu de temps (je me suis réveillé beaucoup trop tôt)' },
        { id: 6, text: '0 - Ne sais pas' }
      ],
      required: true
    },
    {
      id: 6,
      type: 'singleChoice',
      text: 'Vous êtes-vous réveillé au cours de la nuit ?',
      answer: '',
      items: [
        { id: 1, text: '5 - Jamais (j’ai dormi d’une seule traite)' },
        { id: 2, text: '4 - Rarement' },
        { id: 3, text: '3 - Relativement souvent' },
        { id: 4, text: '2 - Souvent' },
        { id: 5, text: '1 - Très souvent (réveils répétés)' },
        { id: 6, text: '0 - Ne sais pas' }
      ],
      required: true
    },
    {
      id: 7,
      type: 'singleChoice',
      text: 'Avez-vous fait des rêves ?',
      answer: '',
      items: [
        { id: 1, text: '5 - Aucun' },
        { id: 2, text: '4 - Quelques uns seulement' },
        { id: 3, text: '3 - Modérément' },
        { id: 4, text: '2 - Beaucoup' },
        { id: 5, text: '1 - Enormément et des rêves particulièrement marquants' },
        { id: 6, text: '0 - Ne sais pas' }
      ],
      required: true
    },
    {
      id: 8,
      type: 'singleChoice',
      text: 'Comment vous sentez-vous actuellement ?',
      answer: '',
      items: [
        { id: 1, text: '5 - En excellente forme' },
        { id: 2, text: '4 - En bonne forme' },
        { id: 3, text: '3 - Moyennement en forme' },
        { id: 4, text: '2 - En mauvaise forme' },
        { id: 5, text: '1 - En très mauvaise forme : fatigué, abattu' },
        { id: 6, text: '0 - Ne sais pas' }
      ],
      required: true
    },
    {
      id: 9,
      type: 'textArea',
      text: 'Commentaires éventuels : ',
      answer: '',
      required: false,
      placeholder: 'Ecrivez ici...'
    }
  ];

  server;
  user_id;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private router: Router
  ) { 
    this.server = this.authService.server;
    this.authService.userId.subscribe(resData => {
      this.user_id = resData
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.authService.userId.subscribe(resData=> {
      this.user_id = resData;
    })
  }

  addEvent() {
    if (this.questions[0].h == null && this.questions[0].mn == null) {
      let message = "Vous n'avez pas répondu à la question 1.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[1].h == null && this.questions[1].mn == null) {
      let message = "Vous n'avez pas répondu à la question 2.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[2].answer == '') {
      let message = "Vous n'avez pas répondu à la question 3.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[3].answer == '') {
      let message = "Vous n'avez pas répondu à la question 4.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[4].answer == '') {
      let message = "Vous n'avez pas répondu à la question 5.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[5].answer == '') {
      let message = "Vous n'avez pas répondu à la question 6.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[6].answer == '') {
      let message = "Vous n'avez pas répondu à la question 7.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else if (this.questions[7].answer == '') {
      let message = "Vous n'avez pas répondu à la question 8.";
      let header = 'Oubli';
      this.showAlert(message, header);
    } else {
      let body = {
        events: 'events',
        eventType: 'SOMMEIL',
        user_id: this.user_id,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date (),
        allDay: 1,
        Q1: this.convertToTime(this.questions[0].h, this.questions[0].mn),
        Q2: this.convertToTime(this.questions[1].h, this.questions[1].mn),
        Q3: this.questions[2].answer,
        Q4: this.questions[3].answer,
        Q5: this.questions[4].answer,
        Q6: this.questions[5].answer,
        Q7: this.questions[6].answer,
        Q8: this.questions[7].answer,
        Q9: this.questions[8].answer
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
