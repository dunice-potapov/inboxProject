function InboxItemController($mdDialog, $sce) {
  //console.log('email', this.email);
  var vm = this;
  this.showMessage = function(ev) {
    //console.log('showMessage', ev);
    $mdDialog.show({
      controller: DialogController,
      template: '<div>' + vm.email.raw + '</div>',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false
    })
      .then(function(answer) {
        //console.log('CASE1');
      }, function() {
        //console.log('CASE2');
      });

  };
}

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

angular.module('heroApp').component('inboxItem', {
  templateUrl: 'inboxItem/inboxItem.html',
  controller: InboxItemController,
  bindings: {
    email: '='
  }
});