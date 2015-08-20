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

        $scope.data.addActivite = function (nom) {

        };

        $scope.data.addActiviteModal = function () {
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
                                $scope.data.activites = Activites.all();
                            }
                        }
                    }
                ]
            });
        };

        $scope.data.remove = function(activiteId) {
            Activites.remove(activiteId);
            $scope.data.activites = Activites.all();
        };


    })

.controller('JeunesCtrl', function($scope, Jeunes, $localstorage, ionicMaterialInk, $ionicPopup) {
        $scope.data = {};

        $scope.data.jeunes = Jeunes.all();

        $scope.data.addJeuneModal = function () {
            $scope.data.nomNewJeune = "";

            $ionicPopup.show({
                template: '<input type="text" ng-model="data.nomNewJeune">',
                title: 'Nouveau jeune',
                scope: $scope,
                buttons: [
                    {text: 'Annuler'},
                    {
                        text: '<b>Confirmer</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if ($scope.data.nomNewJeune === '') {
                                //don't allow the user to close unless he enters anumber
                                e.preventDefault();
                            } else {
                                Jeunes.newJeune($scope.data.nomNewJeune);
                                $scope.data.jeunes = Jeunes.all();
                            }
                        }
                    }
                ]
            });
        };

        $scope.data.remove = function(jeuneId) {
            Jeunes.remove(jeuneId);
            $scope.data.jeunes = Jeunes.all();
        };

        ionicMaterialInk.displayEffect();
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
