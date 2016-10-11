function InboxItemController() {
  //console.log('email', this.email)
}

angular.module('heroApp').component('inboxItem', {
  templateUrl: 'inboxItem.html',
  controller: InboxItemController,
  bindings: {
    email: '='
  }
});