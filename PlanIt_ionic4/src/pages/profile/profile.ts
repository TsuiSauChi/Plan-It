import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetailsPage } from '../details/details';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  web3: any
  planner: any;
  name: any;
  language: any;
  country: any;
  birth: any;
  travel: any;
  image: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.planner = navParams.get('planner');
    this.name = this.planner.name;
    this.language = this.planner.language;
    this.country = this.planner.country;
    this.birth = this.planner.birth;
    this.travel = this.planner.travel;
    this.image = this.planner.image
  }

  toDetails() {
    this.navCtrl.push(DetailsPage);
  }
}
