<?php
/*
Name: 			Twitter Feed
Written by: 	Okler Themes - (http://www.okler.net)
Version: 		3.3.1
*/

session_start();
require_once("twitteroauth/twitteroauth.php");

// Replace the keys below - Go to https://dev.twitter.com/apps to create the Application
$consumerkey = "A70HIHRxTgBvdByMr3JMFUITs";
$consumersecret = "dj0Gp3lSNnH1V3oYFRzzy4lJO3AGyDrq6QAGphjaPz1AnCihDk";
$accesstoken = "2822200291-1kIcGaGs4YaeCz8wLonfA3mh7USJ43TSj8XVLKj";
$accesssecret = "tKi8tGvA2DGxX27034Ay7QY7lueEDp81VzrRsQCA5FoWA";


$twitteruser = $_GET['twitteruser'];
$notweets = $_GET['notweets'];

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
	$connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
	return $connection;
}

$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesssecret);
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);

echo json_encode($tweets);
?>