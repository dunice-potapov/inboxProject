angular.module('heroApp').component('emailList', {
  templateUrl: 'emailList/emailList.html',
  controller: MainCtrl,
  bindings: {
    email: '='
  }
});