import { Component } from '@angular/core';
import { SurveyService } from '../service/survey.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private surveyService: SurveyService
  ) {}

  goToSurentrainement() {
    this.surveyService.loadingBetweenPage('/surentrainement');
  }

  goToHebdomadaire() {
    this.surveyService.loadingBetweenPage('/hebdomadaire');
  }

  goToSommeil() {
    this.surveyService.loadingBetweenPage('/sommeil');
  }

  goToBlessure() {
    this.surveyService.loadingBetweenPage('/blessure');
  }

}
