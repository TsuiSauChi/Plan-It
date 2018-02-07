angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicSideMenuDelegate, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function (e) {
    });

    $scope.preventFocus = function () {
      ionic.DomUtil.blurAll();
    }
  })

  .controller('GeneralController', function ($scope, $ionicScrollDelegate, $state) {

    $scope.profile = function () {
      console.log("test");
      $state.go("app.profile");
    }

    var MessageArray = [];
    $scope.message = MessageArray
    date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;


    $scope.message = {
      text: ''
    };

    $scope.messages = [
      { id: 1, user: 'Addison', avatar: 'img/PlanIt.png', date: '10:43 AM', text: 'Hi James! I am Addison, your personalised travel bot! Ask me questions like "Show me the best tibdit locations?"' }
    ];
    $scope.ajustarScroll = function () {

      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom(true);
    }

    $scope.sendMessage = function (message) {
      sendText(message.text);
      MessageArray.push({ user: 'James', avatar: 'img/james.jpg', date: strTime, text: message.text });
      $scope.messages = MessageArray
      $scope.message.text = '';
      $ionicScrollDelegate.scrollBottom(true);
    }

    function sendText(chatmsg) {
      try {
        ApiAIPlugin.requestText(
          {
            query: chatmsg
          },
          function (response) {
            // place your result processing here
            console.log(response)
            Message = response.result.fulfillment.speech;
            var myobj = JSON.parse(JSON.stringify({
              message: Message
            })
            )
            console.log(myobj);
            MessageArray.push({ user: 'Addision', avatar: 'img/PlanIt.png', date: strTime, text: myobj.message });
            $scope.message = MessageArray
          },
          function (error) {
            // place your error processing here
            alert(error);
          });
      } catch (e) {
        alert(e);
      }
    }
  })
