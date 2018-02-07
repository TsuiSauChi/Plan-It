import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import Web3 from 'web3';

/*
  Generated class for the NodejsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3Provider {
  web3: any
  constructor() {
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }

  get() {
    return this.web3;
  }

  getAccounts() {
    return this.web3.eth.getAccounts()
  }
}
