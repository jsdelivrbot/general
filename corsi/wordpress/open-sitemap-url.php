<?php
// W3 TOTAL CACHE WARMER (PRELOADER) by Pixel Envision (E.Gonenc)
// Version 2.1 - 21 August 2011

//Configuration options
$priority = true;//Use priorities defined in sitemap.xml (true/false)
$ppi = 10;//Pages to be cached per interval
$delay = 1;// Delay in seconds between page checks, default is half a second
$quiet = true;// Do not output process log (true/false)
$trailing_slash = false;// Add trailing slash to URL's, that might fix cache creation problems (true/false)

$sitemap = "sitemap.xml";//Path to sitemap file relative to the warm.php

// Defaults for W3TC
$index = "_index.html";//Cache file to check
$rootp = "/srv/www/lifeclass.new/public/wp-content/cache";//Root of cache

//Do not change anything below this line unless you know what you are doing
//ignore_user_abort(TRUE);
set_time_limit(1200);

$xml = simplexml_load_file($sitemap);
$UL=$UP=array();
foreach ($xml->url as $url_list) {
	$UL[]=$url_list->loc;
	$UP[]=$url_list->priority;
}
unset($xml);
if($priority==true) {arsort($UP,$sort_flags = SORT_NUMERIC);}
$i=0;
foreach ($UP as $key => $val) {
	$path=$rootp;
	$url=$UL[$key];
	$sub=explode("/",$url);
	if($sub[3]) {$path.="/".urldecode($sub[3]);}
	if($sub[4]) {$path.="/".urldecode($sub[4]);}
	if($sub[5]) {$path.="/".urldecode($sub[5]);}
	$path.="/".$index;

	echo "SCREENING "."[".$i."]: ".$url."<br>";
	file_get_contents($url);
	usleep($delay*1000000);
	$i++;
		/*
		if (file_exists($path)) {
			if($quiet!=true) {echo "Priority: ".$val." => Skipped: ".$path."\n";}
		} else {
			echo "Non exist: ".$path."<br>";
			if($trailing_slash==true) {$url = rtrim($url,"/")."/";}

			$ch = curl_init();
			curl_setopt ($ch, CURLOPT_URL, $url);
			curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 15);
			curl_setopt ($ch, CURLOPT_HEADER, true);
			curl_setopt ($ch, CURLOPT_NOBODY, true);
			$ret = curl_exec ($ch);
			curl_close ($ch);
			if ($ret) {$i++;} else {echo "Unable to connect $url, exiting...";break;}
			usleep($delay*1000000);
			if($quiet!=true) {echo "Priority: ".$val." => Warmed: ".$path." by visiting ".$url."\n";}
		}
		*/
	//if ($i < $ppi) {flush();} else {break;}

}
exit;
?>