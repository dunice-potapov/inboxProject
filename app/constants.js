angular.module('heroApp', [])
  .constant('confGmail', {
    client_id: '26051947364-1ui81sac3cle9qjs904ucg1u165sjajh.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    maxResults: 5
  });