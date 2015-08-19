angular.module('starter.services', [])

    .factory('Activites', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var activites = [{
        id: 0,
        name: 'Réunion 18/06'
      }, {
        id: 1,
        name: 'Réunion 9/09'
      }, {
        id: 2,
        name: 'WE des passages'
      }, {
        id: 3,
        name: 'Réunion 30/09'
      }, {
        id: 4,
        name: 'WE neige'
      }];

      return {
        all: function() {
          return activites;
        },
        remove: function(activite) {
          activites.splice(activites.indexOf(activite), 1);
        },
        get: function(activiteId) {
          for (var i = 0; i < activites.length; i++) {
            if (activites[i].id === parseInt(activiteId)) {
              return activites[i];
            }
          }
          return null;
        }
      };
    })

.factory('Jeunes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var jeunes = [{
    id: 0,
    name: 'Thibaud'
  }, {
    id: 1,
    name: 'Elise'
  }, {
    id: 2,
    name: 'Louis'
  }, {
    id: 3,
    name: 'Arthur'
  }, {
    id: 4,
    name: 'Juliette'
  }];

  return {
    all: function() {
      return jeunes;
    }
  };
});
