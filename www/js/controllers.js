angular.module('starter.controllers', [])

.controller('ActivitesCtrl', function($scope, Activites, ionicMaterialInk, $ionicModal, $ionicPopup) {
      $scope.data = {};

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //
      //$scope.$on('$ionicView.enter', function(e) {
      //});

        ionicMaterialInk.displayEffect();

        $scope.data.activites = Activites.all();

        $scope.data.addActivite = function () {
            $scope.data.nomNewActivite = "";

            $ionicPopup.show({
                template: '<input type="text" ng-model="data.nomNewActivite">',
                title: 'Nouvelle Activité',
                scope: $scope,
                buttons: [
                    {text: 'Annuler'},
                    {
                        text: '<b>Confirmer</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if ($scope.data.nomNewActivite === '') {
                                //don't allow the user to close unless he enters anumber
                                e.preventDefault();
                            } else {
                                Activites.newActivite($scope.data.nomNewActivite);
                            }
                        }
                    }
                ]
            });
        };

        $scope.remove = function(activite) {
            Activites.remove(activite);
        };


    })

.controller('JeunesCtrl', function($scope, Jeunes, $localstorage) {
      $scope.data = {};

      $scope.data.jeunes = Jeunes.all();

        $scope.data.test = $localstorage.get('testval', 'init');

        $scope.data.rafraichir = function () {
            $localstorage.set('testval', $scope.data.test);
        };
})

.controller('ActiviteDetailCtrl', function($scope, $stateParams, Activites, Jeunes, ionicMaterialInk, Presences) {
        $scope.data = {};

        ionicMaterialInk.displayEffect(); // On active l'effet d'encre

        $scope.data.jeunes = Jeunes.all(); // On récupère la liste des jeunes

        for(var i = 0 ; i < $scope.data.jeunes.length ; i++)
        {
            $scope.data.jeunes[i].checked = Presences.getpresence($stateParams.activiteId, i);
        }

        $scope.data.activite = Activites.getActivite($stateParams.activiteId); // On récupère l'activité

        $scope.data.getpresence = function (jeuneId) {
            //return Activites.getpresence(activite, jeune);
            return Presences.getpresence($stateParams.activiteId, jeuneId);
        };

        $scope.data.changepresence = function (jeune) {
            //Activites.changepresence(activite, jeune);
            //$scope.jeunes[jeune].checked = Activites.getpresence(activite, jeune);

            if(Presences.getpresence($stateParams.activiteId, jeune) == true)
            {
                Presences.setpresence($stateParams.activiteId, jeune, false);
            }
            else
            {
                Presences.setpresence($stateParams.activiteId, jeune, true);
            }
        };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
