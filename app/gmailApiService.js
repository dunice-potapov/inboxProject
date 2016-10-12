angular.module('heroApp')
  .service('GmailApiService', GmailApiService);

GmailApiService.$inject = ['$q', 'confGmail'];

function GmailApiService($q, confGmail) {

  var vm = this;
  this.emails = [];
  this.getEmails = getEmails;
  this.signOut = signOut;


  function _auth() {
    var deferred = $q.defer();
    gapi.load('auth2', function() {//load in the auth2 api's, without it gapi.auth2 will be undefined
      gapi.auth2.init(
        {
          client_id: confGmail.client_id
        }
      );
      vm.GoogleAuth = gapi.auth2.getAuthInstance();
      _checkAuth(deferred);
    });

    return deferred.promise;
  }


  /**
   * Check if current user has authorized this application.
   */
  function _checkAuth(deferred) {
    gapi.auth.authorize(
      {
        'client_id': confGmail.client_id,
        'scope': confGmail.scopes.join(' '),
        'immediate': false
      },
      angular.bind(deferred, _handleAuthResult)
    );
  }

  function _handleAuthResult(authResult) {
    //var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      this.resolve(authResult);
    } else {
      this.reject(authResult.error || 'No result');
    }
  }

  /**
   * Load Gmail API client library. List labels once client library
   * is loaded.
   */
  function _loadGmailApi() {
    var deferred = $q.defer();
    gapi.client.load('gmail', 'v1', angular.bind(deferred, _listMessages));
    return deferred.promise;
  }

  function _listMessages() {
    var self = this;
    console.log('_listMessages');
    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'INBOX',
      'maxResults': confGmail.maxResults
    });

    if (request) {
      request.execute(function(resp) {
        var messages = resp.messages
          , fullMessages = [];

        messages.forEach(function(message) {
          if (message.id) {
            fullMessages.push(_sendMessageRequest(message.id));
          }
        });

        return $q.all(fullMessages)
          .then(function(messages) {
            self.resolve(messages);
          })
          .catch(function (err) {
            self.reject(err);
          });
      });
    }
  }

  function _sendMessageRequest(messageId) {
    var deferred = $q.defer();
    gapi.client.gmail.users.messages.get({
      'userId': 'me',
      'id': messageId,
      'format': 'full'
    })
      .execute(angular.bind(deferred, _appendMessageRow));

    return deferred.promise;
  }

  function _appendMessageRow(message) {
    var showedMessage = {};
    showedMessage.from = _getHeader(message.payload.headers, 'From') || '';
    showedMessage.subject = _getHeader(message.payload.headers, 'Subject') || '';
    showedMessage.formattedDate = _getHeader(message.payload.headers, 'Date') || '';
    showedMessage.date = message.internalDate || '';
    showedMessage.snippet = message.snippet || '';
    this.resolve(showedMessage);
  }

  function _getHeader(headers, index) {
    var header = '';
    angular.forEach(headers, function(value) {
      if (value.name === index) {
        header = value.value;
      }
    });
    return header;
  }

  function getEmails() {
    if(vm.GoogleAuth){
      return _loadGmailApi();
    } else {
      return _auth()
        .then(_loadGmailApi);
    }
  }

  function signOut() {
    if (vm.GoogleAuth) {
      vm.GoogleAuth.signOut();
    }
  }
}