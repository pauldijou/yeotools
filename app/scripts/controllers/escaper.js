'use strict';

yeotoolsApp.controller('EscaperCtrl', function($scope) {
  $scope.sourceCode = '';
  $scope.showLines = true;
  $scope.scrollable = false;
  
  $scope.wrappedSourceCode = function() {
      return '<pre class="prettyprint' + ($scope.showLines ? ' linenums' : '') + ($scope.scrollable ? ' pre-scrollable' : '') + '">' + escapeHtml($scope.sourceCode) + '</pre>';
  }
  
  $scope.prettySourceCode = function() {
      if($scope.sourceCode) {
          return prettyPrintOne(escapeChevron($scope.sourceCode), '', $scope.showLines);
      } else {
          return '';
      }
  }
});
