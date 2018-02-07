import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  language: any;
  country: any;
  locals: any;
  budget: any;
  planner: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  submit() {
    let data = [
      parseFloat(this.language),
      parseFloat(this.country),
      parseFloat(this.locals),
      parseFloat(this.budget)
    ]
    var headers = new Headers();
    this.http.post('http://localhost:3000/form', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response', response);
      this.planner = response;
      this.navCtrl.push(ProfilePage, {
        planner: this.planner
      })
    });
  }

}
