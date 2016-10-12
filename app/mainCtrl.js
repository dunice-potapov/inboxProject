angular.module('heroApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$timeout', '$scope', 'confGmail', 'GmailApiService'];

function MainCtrl($timeout, $scope, confGmail, GmailApiService) {

  var vm = this;
  vm.emails = [];
  vm.emailsHere = false;

  function init() {
    GmailApiService.getEmails()
      .then(function (emails) {
        vm.emails = emails;
        vm.emailsHere = true;
      });
  }

  $scope.signOut = function() {
    GmailApiService.signOut();
  };

  init();
}