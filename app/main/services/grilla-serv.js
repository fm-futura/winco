'use strict';
angular.module('main')
.service('Grilla', function (Config, $http) {
  var state = {
    rawData: undefined,
    // weekDay -> list of shows. Sunday is 0
    daysData: {
    },
  };

  var Service = {
    get: get,
    getCurrentShow: getCurrentShow,
  };

  initDaysData(state.daysData);
  return Service;

  function initDaysData (daysData) {
    for (var day = 0; day < 7; day++) {
      daysData[day] = [];
    }
  }

  function parseData (data) {
    var daysData = state.daysData;

    _.each(daysData, function (d) {
      d.length = 0;
    });

    _.each(data, function (showData) {
      var weekStart = moment().startOf('week');
      var start = parseTime(showData.horario_inicio);
      var end = parseTime(showData.horario_finalizacion);

      if (end.hour === 0 && end.minutes === 0) {
        end.hour = 23;
        end.minutes = 59;
      }

      _.each(showData.dia, function (day) {
        // maps 1 - 7 to 1 - 0
        day = day % 7;

        var dateStart = moment(weekStart).add(day, 'days').set(start);
        var dateEnd   = moment(weekStart).add(day, 'days').set(end);

        var show = {
          start: dateStart,
          end: dateEnd,
          title: showData.title.rendered,
          url: showData.link,
        };

        daysData[day].push(show);
      });
    });

    function parseTime (time) {
      var parts = time.split(':');
      return {
        hour: parseInt(parts[0]),
        minutes: parseInt(parts[1]),
        seconds: 0,
      };
    }
  }

  function get (options) {

    var p = $http.get(Config.ENV.schedule, options);

    p.then(function (response) {
      var data = response.data;
      state.rawData = data;
      parseData(data);
    });

    return p;
  }

  /* eslint no-unused-vars:warn */
  function getCurrentShow (when) {
    when = moment(when);
    var day = when.weekday();

    var show  = _.find(state.daysData[day], function (show) {
      return when.isBetween(show.start, show.end);
    });

    return show;
  }

});
