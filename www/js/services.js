angular.module('starter.services', [])

    .factory('Activites', function($localstorage) {

      /*var activites = [{
        id: 0,
        name: 'Réunion 18/06',
        presences: {}
      }, {
        id: 1,
        name: 'Réunion 9/09',
        presences: {}
      }, {
        id: 2,
        name: 'WE des passages',
        presences: {}
      }, {
        id: 3,
        name: 'Réunion 30/09',
        presences: {}
      }, {
        id: 4,
        name: 'WE neige',
        presences: {}
      }];*/

      //var activites = $localstorage.setObject("activites", []); // On recupère l'objet des activités

      var activitesVide = function() {
        var activites = $localstorage.getObject("activites");

        for (var key in activites) {
          if (hasOwnProperty.call(activites, key)) return false;
        }

        return true;
      };

      if(activitesVide()) var activites = $localstorage.setObject("activites", []);

      return {
        all: function() {
          return $localstorage.getObject("activites");
        },
        remove: function(activiteId) {
          var activites = $localstorage.getObject("activites");

          activites.splice(activiteId, 1);

          $localstorage.setObject("activites", activites);
        },
        getActivite: function(activiteId) {
          var activites = $localstorage.getObject("activites");

          for (var i = 0; i < activites.length; i++) {
            if (activites[i].id === parseInt(activiteId)) {
              return activites[i];
            }
          }
          return null;
        },
        newActivite: function (nom) {
          var activites = $localstorage.getObject("activites");

          var count = 0;

          // Comptage du nombre d'éléments dans le tableau
          for(var prop in activites) {
            if(activites.hasOwnProperty(prop))
              count++;
          }

          activites.push({
            id: count,
            name: nom,
            presences: {}
          });

          $localstorage.setObject("activites", activites); // on restocke l'objet
        }
      };
    })

.factory('Jeunes', function($localstorage) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  /*var jeunes = [{
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
  }];*/

      //var jeunes = $localstorage.setObject("jeunes", []);

      var jeunesVide = function() {
        var jeunes = $localstorage.getObject("jeunes");

        for (var key in jeunes) {
          if (hasOwnProperty.call(jeunes, key)) return false;
        }

        return true;
      };

      if(jeunesVide())
      {
        var jeunes = $localstorage.setObject("jeunes", []);
        $localstorage.setObject("indexJeunes", 0);
      }

      return {
        all: function() {
          return $localstorage.getObject("jeunes");
        },
        remove: function(jeuneId) {
          var jeunes = $localstorage.getObject("jeunes");

          jeunes.splice(jeuneId, 1);

          $localstorage.setObject("jeunes", jeunes);
        },
        newJeune: function (nom) {
          var jeunes = $localstorage.getObject("jeunes");

          var indexJeune = $localstorage.getObject("indexJeunes") + 1;

          jeunes.push({
            id: indexJeune,
            name: nom
          });

          $localstorage.setObject("jeunes", jeunes); // on restocke l'objet
          $localstorage.setObject("indexJeunes", indexJeune);
        }
      };
})

    .factory('Presences', function($localstorage, Activites) {

      return {
        setpresence: function(activiteId, jeuneId, value) {
          var activites = $localstorage.getObject("activites"); // On recupère l'objet des activités

          // On modifie l'objet
          for (var i = 0; i < activites.length; i++) {
            if (activites[i].id === parseInt(activiteId)) {
              activites[i].presences[jeuneId] = value;
            }
          }

          $localstorage.setObject("activites", activites); // on restocke l'objet
        },
        getpresence: function (activiteId, jeuneId) {
          var activites = $localstorage.getObject("activites"); // On recupère l'objet des activités

          for (var i = 0; i < activites.length; i++) {
            if (activites[i].id === parseInt(activiteId)) {
              if(typeof activites[i].presences[jeuneId] != 'undefined') {
                return activites[i].presences[jeuneId];
              }
              else return false;
            }
          }
        }
      };
    })

    .factory('$localstorage', ['$window', function($window) {
      return {
        set: function(key, value) {
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      }
    }]);
