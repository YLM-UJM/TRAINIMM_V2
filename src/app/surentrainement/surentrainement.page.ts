import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surentrainement',
  templateUrl: './surentrainement.page.html',
  styleUrls: ['./surentrainement.page.scss'],
})
export class SurentrainementPage implements OnInit {

questions = [
  {
    id: 1,
    type: 'rating',
    text: 'Mon niveau de performance est : ',
    subtitle: '0 : très mauvais - 10 : très bon',
    min: '0',
    max: '10',
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    move: false,
  },
  {
    id: 2,
    type: 'rating',
    text: 'Je me fatigue : ',
    subtitle: '0 : très lentement - 10 : très vite',
    min: '0',
    max: '10',
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    move: false,
  },
    {
    id: 3,
    type: 'rating',
    text: 'Je récupère de mon état de fatigue : ',
    subtitle: '0 : très lentement - 10 : très rapidement',
    min: '0',
    max: '10',
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    move: false,
  },
  {
    id: 4,
    type: 'rating',
    text: 'Je me sens : ',
    subtitle: '0 : très détendu - 10 : très anxieux',
    min: '0',
    max: '10',
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    move: false,
  },
  {
    id: 5,
    type: 'rating',
    text: 'J’ai la sensation que ma force musculaire a : ',
    subtitle: '0 : diminuée - 10 : augmentée',
    min: '0',
    max: '10',
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    move: false,
  },
  {
    id: 6,
    type: 'rating',
    text: 'J’ai la sensation que mon endurance a : ',
    subtitle: '0 : diminuée - 10 : augmentée',
    min: '0',
    max: '10',
    precisionMin : '0',
    precisionMax : '10',
    step: 1,
    required: true,
    move: false
  },
  {
  id: 7,
  type: 'singleChoice',
  text: 'Ce dernier mois mon niveau de performance sportive / mon état de forme a diminué',
  items: [
    { id: 1, text: 'Oui', checked: false },
    { id: 2, text: 'Non', checked: false }
  ],
  required: true
},
{
  id: 8,
  type: 'singleChoice',
  text: 'Je ne soutiens pas autant mon attention',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' },
  ],
  required: true
},
{
  id: 9,
  type: 'singleChoice',
  text: 'Mes proches trouvent que mon comportement a changé',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 10,
  type: 'singleChoice',
  text: 'J’ai une sensation de poids sur la poitrine',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 11,
  type: 'singleChoice',
  text: 'J’ai une sensation de palpitations',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 12,
  type: 'singleChoice',
  text: 'J’ai une sensation de gorge serrée',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 13,
  type: 'singleChoice',
  text: 'J’ai moins d’appétit qu’avant',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 14,
  type: 'singleChoice',
  text: 'Je mange davantage',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 15,
  type: 'singleChoice',
  text: 'Je dors moins bien',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 16,
  type: 'singleChoice',
  text: 'Je somnole et baille dans la journée',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 17,
  type: 'singleChoice',
  text: 'Les séances me paraissent trop rapprochées',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 18,
  type: 'singleChoice',
  text: 'Mon désir sexuel a diminué',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},

{
  id: 19,
  type: 'singleChoice',
  text: 'Je fais des contre-performances',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 20,
  type: 'singleChoice',
  text: 'Je m\'enrhume fréquemment',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 21,
  type: 'singleChoice',
  text: 'Je grossis',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 22,
  type: 'singleChoice',
  text: 'J’ai des problèmes de mémoire',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 23,
  type: 'singleChoice',
  text: 'Je me sens souvent fatigué',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 24,
  type: 'singleChoice',
  text: 'Je me sens en état d’infériorité',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 25,
  type: 'singleChoice',
  text: 'J’ai des crampes, courbatures, douleurs musculaires fréquentes',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 26,
  type: 'singleChoice',
  text: 'J’ai plus souvent mal à la tête',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 27,
  type: 'singleChoice',
  text: 'Je manque d’entrain',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 28,
  type: 'singleChoice',
  text: 'J’ai parfois des malaises ou des étourdissements',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 29,
  type: 'singleChoice',
  text: 'Je me confie moins facilement',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 30,
  type: 'singleChoice',
  text: 'Je suis souvent patraque',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 31,
  type: 'singleChoice',
  text: 'J’ai plus souvent mal à la gorge',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 32,
  type: 'singleChoice',
  text: 'Je me sens nerveux, tendu, inquiet',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 33,
  type: 'singleChoice',
  text: 'Je supporte moins bien mon entrainement',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 34,
  type: 'singleChoice',
  text: 'Mon coeur bat plus vite qu’avant au repos',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 35,
  type: 'singleChoice',
  text: 'Mon coeur bat plus vite qu’avant à l’effort',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 36,
  type: 'singleChoice',
  text: 'Je suis souvent mal fichu',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 37,
  type: 'singleChoice',
  text: 'Je me fatigue plus facilement',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 38,
  type: 'singleChoice',
  text: 'J’ai souvent des troubles digestifs',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 39,
  type: 'singleChoice',
  text: 'J’ai envie de rester au lit',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 40,
  type: 'singleChoice',
  text: 'J’ai moins confiance en moi',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 41,
  type: 'singleChoice',
  text: 'Je me blesse facilement',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 42,
  type: 'singleChoice',
  text: 'J’ai plus de mal à rassembler mes idées',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 43,
  type: 'singleChoice',
  text: 'J’ai plus de mal à me concentrer dans mon activité sportive',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 44,
  type: 'singleChoice',
  text: 'Mes gestes sportifs sont moins précis, moins habiles',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 45,
  type: 'singleChoice',
  text: 'J’ai perdu de la force, du punch',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 46,
  type: 'singleChoice',
  text: 'J’ai l’impression de n’avoir personne de proche à qui parler',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 47,
  type: 'singleChoice',
  text: 'Je dors plus',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 48,
  type: 'singleChoice',
  text: 'Je tousse plus souvent',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 49,
  type: 'singleChoice',
  text: 'Je prends moins de plaisir à mon activité sportive',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 50,
  type: 'singleChoice',
  text: 'Je prends moins de plaisir à mes loisirs',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 51,
  type: 'singleChoice',
  text: 'Je m’irrite plus facilement',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 52,
  type: 'singleChoice',
  text: 'J’ai une baisse de rendement dans mon activité scolaire ou professionelle',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 53,
  type: 'singleChoice',
  text: 'Mon entourage trouve que je deviens moins agréable à vivre',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 54,
  type: 'singleChoice',
  text: 'Les séances sportives me paraissent trop difficiles',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 55,
  type: 'singleChoice',
  text: 'C’est ma faute si je réussis moins bien',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 56,
  type: 'singleChoice',
  text: 'J’ai les jambes lourdes',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 57,
  type: 'singleChoice',
  text: 'J’égare plus facilement les objets (clefs, etc)',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 58,
  type: 'singleChoice',
  text: 'Je suis pessimiste, j’ai des idées noires',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 59,
  type: 'singleChoice',
  text: 'Je maigris',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
},
{
  id: 60,
  type: 'singleChoice',
  text: 'Je me sens moins motivé, j’ai moins de volonté, moins de ténacité',
  items: [
    { id: 1, text: 'Oui' },
    { id: 2, text: 'Non' }
  ],
  required: true
}
];

noAnswer = [];
server;
user_id: string;

  constructor(
    private alertCtrl: AlertController,
    private http: HttpClient,
    private AuthService: AuthService,
    private router: Router
  ) { 
    this.server = this.AuthService.server;
  }

  ngOnInit() {
  }

  focus(id:number) {
    this.questions[id-1].move = true;

  }

  ionViewWillEnter(){
    this.AuthService.userId.subscribe(resData=> {
      this.user_id = resData;
    })
  }

  addEvent(){

    for (let i = 0; i< this.questions.length; i++) {
      if (!this.questions[i]['answer']) {
        this.noAnswer.push(i + 1);

      }
    }
    console.log(this.noAnswer);
      
    if (!this.questions[0].move) {
       console.log('question 1 ')
    } else if (!this.questions[1].move) {
       console.log('question 1 ')
    } else if (!this.questions[2].move) {
      console.log('question 1 ')
    } else if (!this.questions[3].move) {
      console.log('question 1 ')
    } else if (!this.questions[4].move) {
      console.log('question 1 ')
    } else if (!this.questions[5].move) {
      console.log('question 1 ')
    }  else if (this.noAnswer.length > 0) {
      let message = "Vous n'avez pas répondu au(x) question(s) N° : " + this.noAnswer.toString();
      let header = 'Réponse(s) manquante(s)';
      this.showAlert(message, header);
      this.noAnswer = [];
    } else {

      let body = {
        events: 'events',
        eventType: 'SURENTRAINEMENT',
        user_id: this.user_id,
        date: new Date(),
        startTime: new Date(),
        endTime: new Date (),
        allDay: 1,
      };

      let answer = {};
      for (let i = 1; i<61; i++) {
        let Q = 'Q' + i.toString();
        answer[Q] = this.questions[i-1]['answer'];
      }
      //answer['Q1'] = 10;
      //answer['Q2'] = 10;
      // for (let i = 0; i < this.questions.length; i++) {
      //   Object.defineProperty(body, 'Q' + (i+1).toString(), {value : parseInt(this.questions[i]['answer']), writable: true});
      // }
      Object.assign(body,answer);
      console.log(body);
      this.http.post(this.server + 'file_aski.php',body).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['./tabs/tab1'])
        let message = "Questionnaire ajouté.";
        let header = 'Succès';
        this.showAlert(message, header);
    });

    }
    //console.log(body)
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
