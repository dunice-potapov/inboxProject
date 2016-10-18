function DialogController($scope, $mdDialog, GmailApiService, message_id) {
  console.log("message_id", message_id);
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