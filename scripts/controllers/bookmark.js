'use strict';

yeotoolsApp.controller('BookmarkCtrl', function($scope, Bookmark) {
  $scope.currentBookmark = {};
  $scope.bookmarks = Bookmark.query();
  $scope.tags = [];
  $scope.selectedTags = [];
  $scope.tagCondition = 'any';
  
  var labelsTree = {children: []};
  
  var bookmarksArray = Bookmark.query({}, function() {
      bookmarksArray.forEach(function(bookmark) {
          var labels = bookmark.label.split('/');
          var tags = bookmark.tags.split(',');
          var currentLevel = labelsTree;
          
          for(var i = 0; i < labels.length; i++) {
              var currentLabel = labels[i];
              
              if(!labelHasChild(currentLevel, currentLabel)) {
                  currentLevel.children.push({name: currentLabel, bookmarks: [], children: [], tags: []});
              }
              
              currentLevel = getLabelChild(currentLevel, currentLabel);
              pushTags(currentLevel.tags, tags);
          }
          
          currentLevel.bookmarks.push(bookmark);
          pushTags($scope.tags, tags);
      });
      
      $scope.labelsTree = labelsTree;
      $scope.tags.sort();
  });
  
  $scope.updateCurrentBookmark = function(bookmark) {
      $scope.currentBookmark = bookmark;
  }
  
  $scope.bookmarkTags = function(bookmark) {
      if($scope.selectedTags.length == 0) {
          return true;
      } else if($scope.tagCondition == 'any') {
          return !!anyTags(bookmark.tags.split(','), $scope.selectedTags);
      } else {
          return !!allTags(bookmark.tags.split(','), $scope.selectedTags);
      }
  }
  
  $scope.labelTags = function(label) {
      if($scope.selectedTags.length == 0) {
          return true;
      } else if($scope.tagCondition == 'any') {
          return !!anyTags(label.tags, $scope.selectedTags);
      } else {
          return !!allTags(label.tags, $scope.selectedTags);
      }
  }
  
  $scope.getBookmarkPopover = function(bookmark) {
      var result = bookmark.summary + '<br/>';
      bookmark.tags.split(',').forEach(function(tag) {
          result += '<span class="label label-important" style="margin-right:10px;">' + tag + '</span>';
      });
      return result;
  }
});

function getLabelChild(label, childLabel) {
    for(var i = 0; i < label.children.length; i++) {
        if(childLabel == label.children[i].name) {
            return label.children[i];
        }
    }
    return null;
}

function labelHasChild(label, childLabel) {
    return !!getLabelChild(label, childLabel);
}

function pushTag(tags, tag) {
    if(tags.indexOf(tag) < 0) {
        tags.push(tag);
    }  
}

function pushTags(tags, tagsToAdd) {
    tagsToAdd.forEach(function(tag) {
        pushTag(tags, tag);
    });  
}

function anyTags(tags, selectedTags) {
    var result = false;
    selectedTags.forEach(function(tag) {
        if(tags.indexOf(tag) > -1) {
            result = true;
        }
    });
    return result;
}

function allTags(tags, selectedTags) {
    var result = true;
    selectedTags.forEach(function(tag) {
        result = result && (tags.indexOf(tag) > -1);
    });
    return result;
}