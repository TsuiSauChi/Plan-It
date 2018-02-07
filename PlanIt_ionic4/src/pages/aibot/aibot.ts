import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the AibotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var ApiAIPromises: any;
@IonicPage()
@Component({
  selector: 'page-aibot',
  templateUrl: 'aibot.html',
})
export class AibotPage {
  answer;

  constructor(public platform: Platform, public ngZone: NgZone) {
    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "56f15bbfce634125b47323c07f910cee"
      })
        .then((result) => console.log(result))
    });
  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
      .then(({ result: { fulfillment: { speech } } }) => {
        this.ngZone.run(() => {
          this.answer = speech;
        });
      })
  }

}
