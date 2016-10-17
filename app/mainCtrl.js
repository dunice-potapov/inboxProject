angular.module('heroApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$timeout', '$scope', 'confGmail', 'GmailApiService'];

function MainCtrl($timeout, $scope, confGmail, GmailApiService) {

  var vm = this;
  vm.emails = [];
  vm.showedEmails = [];
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

  $scope.loadMore = function() {
    console.log('LOAD_MORE', vm.emails.length);
    if (!vm.emails.length) return;
    GmailApiService.getEmails()
      .then(function (emails) {
        vm.emails = vm.emails.concat(emails);
      });

  };

  init();
}