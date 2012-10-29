'use strict';

var servicesModule = angular.module('servicesModule', ['ngResource']);

servicesModule.factory('Bookmark', function($resource) {
    return $resource('http://data.pauldijou.fr/rest/bookmark.php', {}, {
        'query':  {method:'GET', isArray:true}
  });
});