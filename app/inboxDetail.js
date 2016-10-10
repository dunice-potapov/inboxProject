function InboxDetailController() {

}

angular.module('heroApp').component('inboxDetail', {
  templateUrl: 'inboxDetail.html',
  controller: InboxDetailController,
  bindings: {
    hero: '='
  }
});