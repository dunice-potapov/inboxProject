function LoginController($scope) {

  var self = this;

  $scope.GoogleAuth = undefined;

  gapi.load('auth2', function() {//load in the auth2 api's, without it gapi.auth2 will be undefined
    console.log('HHHHHH');
    gapi.auth2.init(
      {
        client_id: '26051947364-1ui81sac3cle9qjs904ucg1u165sjajh.apps.googleusercontent.com'
      }
    );



    var GoogleAuth = $scope.GoogleAuth = gapi.auth2.getAuthInstance();//get's a GoogleAuth instance with your client-id, needs to be called after gapi.auth2.init

    console.log('GoogleAuth', GoogleAuth);

    gapi.signin2.render(
      'signInButton', {
        'onsuccess': $scope.onSignIn,
        'onfailure': $scope.onFailure
      }
    );

    self.onLogInButtonClick = function() {
      //add a function to the controller so ng-click can bind to it
      GoogleAuth.signIn().then(function(response){//request to sign in
        console.log(response);
      });
    };
  });

  $scope.onSignIn = function(googleUser) {
    console.log('HEEEEERERERERE');
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  };

  $scope.onFailure = function() {
    console.log('FAILURE', arguments);
  };

  $scope.signOut = function() {
    $scope.GoogleAuth.signOut();
  }

}

angular.module('heroApp').component('logIn', {
  templateUrl: 'logIn.html',
  controller: LoginController,
  bindings: {
    hero: '='
  }
});