import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

import { ChatRoomPage } from '../chat-room/chat-room'
import Web3 from 'web3';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages = [];
  nickname = '';
  message = '';
  image = '';
  web3: any

  constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.nickname = this.navParams.get('nickname');

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }

  sendMessage() {
    if (this.nickname == "James") {
      this.image = "../../assets/imgs/tsuis.jpg"
    } else if (this.nickname == "Nishikiri") {
      this.image = "../../assets/imgs/planner1.png"
    }
    this.socket.emit('add-message', { text: this.message, image: this.image });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ChatRoom() {
    this.navCtrl.push(ChatRoomPage);
  }

  sendTransaction() {
    var amount = this.web3.utils.toWei('0.01', 'ether');
    this.web3.personal.unlockAccount("0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef","password",15000); // unlock for a long time
    this.web3.personal.unlockAccount("0xf17f52151ebef6c7334fad080c5704d77216b732","password",15000); // unlock for a long time
    this.web3.eth.sendTransaction({
      from: "0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef",
      to: "0xf17f52151ebef6c7334fad080c5704d77216b732",
      value: amount
    });

    this.web3.eth.getBalance("0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef").then(function (balance) {
      console.log(balance);
    });
  }
}