angular.module('heroApp')
  .filter('emailDateFilter', function() {

    return function(emails, listName) {
      var resultEmails = [];
      if (listName === 'today') {

        angular.forEach(emails, function(elem) {
          var elemDate = moment(Number(elem.date)).startOf('day').valueOf();
          var computedDate = moment().startOf('day').valueOf();
          if (elemDate === computedDate) {
            resultEmails.push(elem);
          }
        });
        return resultEmails;

      } else if (listName === 'yesterday') {

        angular.forEach(emails, function(elem) {
          var elemDate = moment(Number(elem.date)).startOf('day').valueOf();
          var computedDate = moment().subtract(1,'days').startOf('day').valueOf();
          if (elemDate === computedDate) {
            resultEmails.push(elem);
          }
        });
        return resultEmails;

      } else if (listName === 'this_week') {

        angular.forEach(emails, function(elem) {
          var elemDateWeek = moment(Number(elem.date)).startOf('isoweek').valueOf();
          var elemDate = moment(Number(elem.date)).startOf('day').valueOf();
          var computedDate = moment().startOf('isoweek').valueOf();
          var computedCurrentDate = moment().startOf('day').valueOf();
          var computedYesterdayDate = moment().subtract(1,'days').startOf('day').valueOf();

          if ((elemDateWeek === computedDate) && (elemDate != computedCurrentDate) && (elemDate != computedYesterdayDate)) {
            resultEmails.push(elem);
          }
        });
        return resultEmails;

      } else if (listName === 'this_year') {

        angular.forEach(emails, function(elem) {
          var elemDateYear = moment(Number(elem.date)).startOf('year').valueOf();
          var elemDateWeek = moment(Number(elem.date)).startOf('isoweek').valueOf();
          var elemDate = moment(Number(elem.date)).startOf('day').valueOf();
          var computedDate = moment().startOf('year').valueOf();
          var computedDateWeek = moment().startOf('isoweek').valueOf();
          var computedCurrentDate = moment().startOf('day').valueOf();
          var computedYesterdayDate = moment().subtract(1,'days').startOf('day').valueOf();

          if ((elemDateYear === computedDate) && (elemDate != computedCurrentDate) && (elemDate != computedYesterdayDate) && (elemDateWeek != computedDateWeek)) {
            resultEmails.push(elem);
          }
        });
        return resultEmails;

      } else if (listName === 'prev_years') {

        angular.forEach(emails, function(elem) {
          var elemDate = moment(Number(elem.date)).startOf('year').valueOf();
          var computedDate = moment().startOf('year').valueOf();
          if (elemDate < computedDate) {
            resultEmails.push(elem);
          }
        });
        return resultEmails;

      }

    }

  });