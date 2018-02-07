import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { DetailsPage } from '../pages/details/details';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { ChatPage } from '../pages/chat/chat';
import { AibotPage } from '../pages/aibot/aibot';
import { FormPage } from '../pages/form/form';
import { LandingPage } from '../pages/landing/landing';
import { IonRating } from '../components/ion-rating/ion-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Web3Provider } from '../providers/web3/web3';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    DetailsPage,
    ChatRoomPage,
    ChatPage,
    AibotPage,
    FormPage,
    LandingPage,
    IonRating
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    DetailsPage,
    ChatRoomPage,
    ChatPage,
    AibotPage,
    FormPage,
    LandingPage,
    IonRating
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Web3Provider
  ]
})
export class AppModule { }
