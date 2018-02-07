// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.directives',
  'ion-affix',
  'starter.profile',
  'Web3'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      ApiAIPlugin.init(
        {
          subscriptionKey: "cb9693af-85ce-4fbf-844a-5563722fc27f",
          clientAccessToken: "56f15bbfce634125b47323c07f910cee ", // insert your client access key here
          lang: "en" // set lang tag from list of supported languages
        },
        function (result) {
          console.log("Sucess", result)
        },
        function (error) {
          console.log("Fail")
        }
      );
    });

  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
    $ionicConfigProvider.backButton.text('');
    $ionicConfigProvider.spinner.icon('dots');
    $ionicConfigProvider.navBar.alignTitle('left');

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })


      .state('app.general', {
        url: '/general',
        views: {
          'menuContent': {
            templateUrl: 'templates/general.html',
            controller: 'GeneralController'
          }
        }
      })

      .state('app.profile', {
        url: '/profile',
        views: {
          'profile': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/general');
  });
