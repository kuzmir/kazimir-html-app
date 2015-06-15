'use strict';

angular.module('kazimir')
.controller('StreetsController', function($scope, $rootScope, $state, $ionicHistory, Restangular, $translate, $ionicViewSwitcher) {

  // initialize restangular resource/model
  var Street = Restangular.all('streets');

  // get the street list
  Street.getList().then(function(streets){
    // pass all data to scope
    // console.log('Streets loaded:', streets);
    $scope.streets = streets;
  });
  // on click go to past single view
  $scope.singlePostOld = function ($index) {
    $ionicViewSwitcher.nextDirection( 'back' );
    $rootScope.street = $index;
    $state.go('single-old');
    return $rootScope.street;
  };
  //on click go to present single view
  $scope.singlePostNew = function ($index) {
    $rootScope.street = $index;
    $state.go('single-new');
    return $rootScope.street;
  };

  $scope.class = "old";
  $scope.rotate = function() {
      var container = document.getElementsByClassName('container');
      container = angular.element(container);
      container.toggleClass('flipped');
      if ($scope.class === "old") {
        $scope.class = "new";
      }else {
        $scope.class = "old";
      }
  };
  
  $scope.lang = 'en';//$translate.proposedLanguage();

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
  $scope.myGoBackForward =function(){
    $ionicViewSwitcher.nextDirection( 'forward' );
    $ionicHistory.goBack();
  };
});
