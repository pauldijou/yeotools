<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: origin, x-requested-with, content-type, accept");
header("Access-Control-Max-Age: 1728000");

require_once('util.php');

$selectBookmarks = $dbh->prepare("select * from yeotools_bookmark");

echo('[');

if ($selectBookmarks->execute()) {
  $bookmarks = $selectBookmarks->fetchAll();
  $bookmarksCount = count($bookmarks) - 1;
  
  foreach($bookmarks as $index => $bookmark) {
  	echo(json_encode($bookmark, JSON_FORCE_OBJECT));
  	if($index < $bookmarksCount) {
      echo(', ');
  	}
  }
}

echo(']');

?>