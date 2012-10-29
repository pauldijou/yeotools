'use strict';

yeotoolsApp.controller('AppCtrl', function($scope, $location) {
  $scope.getNavbarLinkClass = function(path) {
      if($location.path() == path) {
          return 'active';
      } else {
          return '';
      }
  }
  
  $scope.$on('$viewContentLoaded', function() {
      prettyprint();
  });
  
  $scope.$on('viewContentLoaded', function() {
      prettyprint();
  });
});
