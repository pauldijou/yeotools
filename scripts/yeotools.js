'use strict';

var yeotoolsApp = angular.module('yeotoolsApp', ['servicesModule', 'ui'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/escaper', {
        templateUrl: 'views/escaper.html',
        controller: 'EscaperCtrl'
      })
      .when('/bookmark', {
        templateUrl: 'views/bookmark.html',
        controller: 'BookmarkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode(false).hashPrefix('!');
  }]);

yeotoolsApp.value('ui.config', {
    select2: {
       allowClear: true
    },
    
    jq: {
        tooltip: {
            placement: 'right'
        },
        popover: {
            placement: 'right',
            trigger: 'hover',
            html: 'true'
        }
    }
});

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeChevron(unsafe) {
    return unsafe
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}