import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  loadingBetweenPage(page: string) {

    this.loadingCtrl
    .create({ keyboardClose: true, message: 'Chargement...' })
    .then(loadingEl => {
      loadingEl.present();
      this.router.navigate([page]);
      setTimeout(() => {
        loadingEl.dismiss();
      }, 750);
    });
  }
}
