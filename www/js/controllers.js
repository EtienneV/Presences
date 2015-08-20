angular.module('starter.controllers', [])

.controller('ActivitesCtrl', function($scope, Activites, ionicMaterialInk) {
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
      $scope.remove = function(activite) {
        Activites.remove(activite);
      };
    })

.controller('JeunesCtrl', function($scope, Jeunes) {
      $scope.data = {};

      $scope.data.jeunes = Jeunes.all();
})

.controller('ActiviteDetailCtrl', function($scope, $stateParams, Activites, Jeunes, ionicMaterialInk) {
      $scope.data = {};

        ionicMaterialInk.displayEffect();

      $scope.data.jeunes = Jeunes.all();

      $scope.data.activite = Activites.get($stateParams.activiteId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
