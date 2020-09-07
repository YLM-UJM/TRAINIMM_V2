import { Component, ViewChild } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { CalendarService } from '../service/calendar.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('f', { static: true }) form: NgForm;

    private eventsSub: Subscription;

  selectTime: boolean;
  eventSource = [];
  viewTitle;
  showAddEvent: boolean;
  spinner: boolean = false;
  minDate = new Date().toISOString();
  //allEvents = [];
  date = new Date();
  startDay = Math.floor(Math.random() * 90) - 45;
  endDay = Math.floor(Math.random() * 2) + this.startDay;
  startMinute = Math.floor(Math.random() * 24 * 60);
  endMinute = Math.floor(Math.random() * 180) + this.startMinute;
  startTime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + this.startDay, 0, this.date.getMinutes() + this.startMinute);
  endTime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + this.endDay, 0, this.date.getMinutes() + this.endMinute);
  events = [
    //   {
    //       title: 'ENT',
    //       startTime: this.startTime,
    //       endTime: this.endTime
    //   }
  ];

  date_selected: string;
  
  newEvent = {
    title: '',
    description: '',
    imageURL: '',
    startTime: '',
    endTime: ''
  };

  isToday:boolean;

  calendar = {
      mode: 'month',
      locale: 'fr',
      currentDate: new Date(),
      dateFormatter: {
          formatMonthViewDay: function(date:Date) {
              return date.getDate().toString();
          },
          formatMonthViewDayHeader: function(date:Date) {
              return 'MonMH';
          },
          formatMonthViewTitle: function(date:Date) {
              return 'testMT';
          },
          formatWeekViewDayHeader: function(date:Date) {
              return 'MonWH';
          },
          formatWeekViewTitle: function(date:Date) {
              return 'testWT';
          },
          formatWeekViewHourColumn: function(date:Date) {
              return 'testWH';
          },
          formatDayViewHourColumn: function(date:Date) {
              return 'testDH';
          },
          formatDayViewTitle: function(date:Date) {
              return 'testDT';
          }
      }
  };
  server : string = 'http://localhost/TRAINIMM_V2/server_api/';

  questions = [
    {
      id: 1,
      type: 'datetime',
      text: 'Début de la séance :',
      time: ''
    },
    {
      id: 2,
      type: 'datetime',
      text: 'Fin de la séance :',
      time: ''
    },
    {
      id: 3,
      type: 'singleChoice',
      text: 'Modalité de la séance',
      answer: '',
      items: [
        { id: 1, text: 'Course - Route', other : {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 2, text: 'Course - Trail', other : {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 3, text: 'Course - Montagne', other : {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 4, text: 'Course de piste', other : {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 5, text: 'Course de fond', other : {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 6, text: 'Ski de randonnée', other : {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 7, text: 'Vélo de route', other: {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 8, text: 'VTT', other: {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 9, text: 'Musculation en salle', other: {placeholder: 'Précisez', required: true, answer: '' }},
        { id: 10, text: 'Autre', other: {placeholder: 'Précisez', required: true, answer: '' }}
      ],
      required: true
    },
    {
      id: 4,
      type: 'temps',
      text: 'Durée de la séance (hh:mn)',
      h: null,
      mn: null,
      required: true,
      placeholder: 'Sélectionnez ici'
    },
    {
      id: 5,
      type: 'rating',
      text: 'Effort perçu',
      answer: '',
      subtitle: '0 : très facile - 10 : très difficle',
      min: 0,
      max: 10,
      precisionMin : '0',
      precisionMax : '10',
      step: 1,
      required: true
    },
    {
      id: 6,
      type: 'singleChoice',
      text: 'Type de séance',
      answer: '',
      items: [
        { id: 1, text: 'Compétition' },
        { id: 2, text: 'Haute intensité (VMA, seuil, etc.)' },
        { id: 3, text: 'Faible intensité (footing, séance longue, etc.' },
        { id: 4, text: 'Récupération' }
      ],
      required: true
    },
    {
      id: 7,
      type: 'singleInput',
      answer: '',
      text: 'Dénivelé de la séance (D+ en m)',
      textType: 'number',
      required: false,
      placeholder: 'Entrez ici (Ex : 500)'
    },
    {
      id: 8,
      type: 'singleInput',
      text: 'Distance de la séance (en km)',
      textType: 'number',
      answer: '',
      required: false,
      placeholder: 'Entrez ici (ex: 12.6)'
    },
    {
      id: 9,
      type: 'singleChoice',
      answer: '',
      text: 'Avez-vous fait plus d’une séance ? Si oui, quand vous aurez validé, refaite le questionnaire pour ce jour.',
      items: [
        { id: 1, text: 'Oui' },
        { id: 2, text: 'Non' }
      ],
      required: true
    }
  ];
  user_id: string;

  constructor(
      private http: HttpClient,
      private authService: AuthService,
      private calendarService: CalendarService,
      private alertCtrl: AlertController,
  ) {
    this.authService.userId.subscribe(resData => {
        this.user_id = resData;
        //console.log(this.user_id);
    })
    this.eventSource = this.events;
    //this.createRandomEvents();
    //console.log(this.minDate);
  }




  ngOnInit() {
    // console.log('onInit')
     this.eventsSub = this.calendarService.Events.subscribe(events => {
       this.eventSource = events;
       //console.log(this.eventSource);
     })
 
   }

   ionViewWillEnter() {


      this.authService.userId.subscribe(resData=> {
        this.user_id = resData;
      });

    //console.log('will Enter');
    //this.isLoading = true;
    this.calendarService.fetchEvents('*').subscribe(() => {
      //this.isLoading = false;
      //console.log(this.calendarEvents)
    });

  }

   focus(event){
     //console.log(event);
     this.selectTime = true;
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

   SelectedType(event) {
    //console.log(event)
   }



  singleChoiceSelected(item) {
    console.log(item);
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    // this.newEvent = {
    //   title: '',
    //   description: '',
    //   imageURL: '',
    //   startTime: '',
    //   endTime: ''
    // };
  }

  addEvent() {
    if (!this.selectTime) {
      let message = "Vous n'avez pas renseigné les horaires de votre séance.";
      let header = 'Erreur';
      this.showAlert(message, header);
    } else if (this.questions[2].answer == '') {
      let message = "Vous n'avez pas renseigné la modalité de votre séance.";
      let header = 'Erreur';
      this.showAlert(message, header);
    }
     else if ((this.questions[2].answer == 'Autre' && this.questions[2].items[9]['other']['answer'] == '')) {
      let message = "Vous n'avez pas renseigné le champ 'autre' de la modalité de votre séance";
      let header = 'Erreur';
      this.showAlert(message, header);
    } else if (this.questions[3].h == undefined && this.questions[3].mn == undefined ) {
      let message = "Vous n'avez pas renseigné la durée de votre séance";
      let header = 'Erreur';
      this.showAlert(message, header);
    } else if (this.questions[4].answer == '') {
      let message = "Vous n'avez pas renseigné l'effort perçu de votre séance";
      let header = 'Erreur';
      this.showAlert(message, header);
    } else if (this.questions[5].answer == '') {
      let message = "Vous n'avez pas renseigné le type de votre séance";
      let header = 'Erreur';
      this.showAlert(message, header);
    } else if (this.questions[8].answer == '') {
      let message = "Vous n'avez pas renseigné si vous avez fait ou non plus d'une séance ce jour";
      let header = 'Erreur';
      this.showAlert(message, header);
    }
    else {
      this.showHideForm();
      //console.log(this.events);

      //this.eventSource = this.events;
      let body = {
          events: 'events',
          eventType: 'ENTRAINEMENT',
          user_id: this.user_id,
          date: new Date(this.questions[0].time).toLocaleDateString(),
          startTime: new Date(this.questions[0].time),
          endTime: new Date (this.questions[1].time),
          allDay: 0,
          modalite: this.questions[2].answer,
          autre: this.questions[2].items[9]['other'] == '' ? '' : this.questions[2].items[9]['other']['answer'],
          duree: this.convertToTime(this.questions[3].h, this.questions[3].mn),
          rating: this.questions[4].answer,
          type: this.questions[5].answer,
          denivele: this.questions[6].answer == '' ? 0 : this.questions[6].answer,
          distance: this.questions[7].answer == '' ? 0 : this.questions[7].answer,
          autre_session : this.questions[8].answer
  
      };
      console.log(body);
            this.http.post(this.server + 'file_aski.php',body).subscribe(resData => {
            //console.log(resData);
        });
        console.log(this.eventSource);
        this.spinner = true,
        this.calendarService.fetchEvents('*').subscribe(() => {
        });
        this.eventsSub = this.calendarService.Events.subscribe(events => {
          this.eventSource = events;
          //console.log(this.eventSource);
          this.spinner = false;

        });
        let message = "Entrainement ajouté avec succès !";
        let header = 'Succès';
        this.showAlert(message, header);
    }
    this.selectTime = false;
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
}

onViewTitleChanged(title) {
    this.viewTitle = title;
}
eventTypethis
onEventSelected(event) {
    //console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
}

changeMode(mode) {
    this.calendar.mode = mode;
}

today() {
    this.calendar.currentDate = new Date();
}

onTimeSelected(ev: any) {
    //console.log(ev);
    const selected = new Date(ev.selectedTime);
    this.date_selected = selected.toLocaleDateString();
    this.questions[0].time = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.questions[1].time = (selected.toISOString());
  }

onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
}

createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }
    console.log(events);
    return events;
}

onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
}

markDisabled = (date:Date) => {
    var current = new Date();
    date.setHours(0, 0, 0);
    return date > current;
};

}
