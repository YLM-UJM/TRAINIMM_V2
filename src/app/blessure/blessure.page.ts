import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blessure',
  templateUrl: './blessure.page.html',
  styleUrls: ['./blessure.page.scss'],
})
export class BlessurePage implements OnInit {

  questions =  [
    {
      id: 1,
      type: 'singleChoice',
      answer: '',
      text: 'Avez-vous modifié votre entrainement suite à votre blessure ?',
      items: [
        { id: 1, text: 'Oui' },
        { id: 2, text: 'Non' }
      ],
      required: true
    },
    {
      id: 2,
      type: 'singleChoice',
      answer: '',
      text: 'Nombre de jours d’entrainement perdu ?',
      items: [
        { id: 1, text: '0' },
        { id: 2, text: '1' },
        { id: 3, text: '2' },
        { id: 4, text: '3' },
        { id: 5, text: '4' },
        { id: 6, text: '5' },
        { id: 7, text: '6' },
        { id: 8, text: '7' }
      ],
      required: true
    },
    {
      id: 3,
      type: 'singleChoice',
      answer: '',
      text: 'Avez-vous eu une blessure ou un problème physique durant cette semaine ?',
      items: [
        { id: 1, text: 'Non' },
        // tslint:disable-next-line: max-line-length
        { id: 2, text: 'Oui, mais participation complète à l\'entrainement ou en compétition, malgré une blessure/problème physique' },
        // tslint:disable-next-line: max-line-length
        { id: 3, text: 'Oui, mais participation réduite à l\'entrainement ou en compétition, à cause d une blessure/problème physique'},
        // tslint:disable-next-line: max-line-length
        { id: 4, text: 'Oui, mais aucune participation possible à l\'entrainement ou en compétition, à cause d une blessure/problème physique' },
        { id: 5, text: 'Remarque libre', other: { type: 'text', placeholder: 'Précisez', required: true, answer: '' } }
      ],
      required: true
    },
    {
      id: 4,
      type: 'singleChoice',
      answer: '',
      text: 'Combien de blessure, douleur ou problème physique avez-vous présenté la semaine dernière ?',
      items: [
        { id: 1, text: '1' },
        { id: 2, text: '2' },
        { id: 3, text: '3'},
        { id: 4, text: '4' },
        { id: 5, text: '5' },
        { id: 6, text: '>5' }
      ],
      required: true
    },
    {
      id: 5,
      type: 'singleInput',
      subtitle:'entrez un chiffre',
      answer: '',
      text: 'Combien de NOUVEAUX épisodes de blessure, douleur ou problème physique avez-vous présenté la semaine dernière ?',
      textType: 'number',
      required: true,
      placeholder: 'Entrez ici un chiffre'
    },
    {
      id: 6,
      type: 'singleInput',
      answer: '',
      subtitle:'entrez un chiffre',
      text: 'Combien d\'ANCIENS épisodes de blessure, douleur ou problème physique avez-vous présenté la semaine dernière ?',
      textType: 'number',
      required: true,
      placeholder: 'Entrez ici un chiffre'
    },
    {
      id: 7,
      type: 'singleChoice',
      answer: '',
      text: 'Localisation de la blessure',
      items: [
        { id: 1, text: 'Pied' },
        { id: 2, text: 'Tibia' },
        { id: 3, text: 'Genou' },
        { id: 4, text: 'Cuisse' },
        { id: 5, text: 'Hanche'},
        { id: 6, text: 'Dos' },
        { id: 7, text: 'Abdos' },
        { id: 8, text: 'Autre', other: { type: 'text', placeholder: 'Précisez', required: true, answer: '' } }
      ],
      required: true
    },
    {
      id: 8,
      type: 'datetime',
      text: 'Date des premiers signes',
      time: '',
      dateType: '',
      Format : '',
      required: true,
      placeholder: 'Sélectionnez ici'
    },
    {
      id: 9,
      type: 'singleChoice',
      text: 'Circonstances de survenue',
      answer: '',
      items: [
        { id: 1, text: 'Entrainement' },
        { id: 2, text: 'Compétition' },
        { id: 3, text: 'Hors course à pied' }
      ],
      required: true
    },
    {
      id: 10,
      type: 'singleChoice',
      text: 'Mode de survenue',
      answer: '',
      items: [
        { id: 1, text: 'Brutal (chute, entorse)' },
        { id: 2, text: 'Progressif (situation non violente, douleur qui aumgente progressivement)' }
      ],
      required: true
    },
    {
      id: 11,
      type: 'singleChoice',
      answer: '',
      text: 'Avez-vous des difficultés pour participer à l\'entrainement ou aux compétitions à cause de ce problème de santé ?',
      items: [
        { id: 1, text: 'Participation complète sans gêne' },
        { id: 2, text: 'Participation complète mais avec gêne' },
        { id: 3, text: 'Participation réduite à cause de la gêne' },
        { id: 4, text: 'Participation impossible' }
      ],
      required: true
    },
    {
      id: 12,
      type: 'singleChoice',
      answer: '',
      text: 'Avez-vous eu d\'autres blessures ? Si oui, refaite le questionnaire',
      items: [
        { id: 1, text: 'Oui' },
        { id: 2, text: 'Non' }
      ],
      required: true
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
    // if (this.questions[0].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 1.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[1].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 2.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[2].answer == '' || (this.questions[2].answer == 'Remarque libre' && this.questions[2].items[4]['other']['answer'] == '' )) {
    //   let message = "Vous n'avez pas répondu à la question 3.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[3].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 4.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[4].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 5.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[5].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 6.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[6].answer == '' || (this.questions[6].answer == 'Autre' && this.questions[6].items[7]['other']['answer'] == '' )) {
    //   let message = "Vous n'avez pas répondu à la question 7.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[7].time == '') {
    //   let message = "Vous n'avez pas répondu à la question 8.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[8].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 9.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[9].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 10.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[10].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 11.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else if (this.questions[11].answer == '') {
    //   let message = "Vous n'avez pas répondu à la question 12.";
    //   let header = 'Oubli';
    //   this.showAlert(message, header);
    // } else {
      let body = {
        events: 'events',
        eventType: 'BLESSURE',
        user_id: this.user_id,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date (),
        allDay: 1,
        Q1: this.questions[0].answer,
        Q2: parseInt(this.questions[1].answer),
        Q3: this.questions[2].answer,
        Q3_autre: this.questions[2].items[4]['other']['answer'],
        Q4: (this.questions[3].answer),
        Q5: (this.questions[4].answer),
        Q6: (this.questions[5].answer),
        Q7: this.questions[6].answer,
        Q7_autre: this.questions[6].items[7]['other']['answer'],
        Q8: this.questions[7].time,
        Q9: this.questions[8].answer,
        Q10: this.questions[9].answer,
        Q11: this.questions[10].answer,
        Q12: this.questions[11].answer
      }
      console.log(body);
      this.http.post(this.server + 'file_aski.php',body).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['./tabs/tab1'])
        let message = "Questionnaire ajouté.";
        let header = 'Succès';
        this.showAlert(message, header);


    });
    //}

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
