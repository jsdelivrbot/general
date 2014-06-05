<?php
/*
Plugin Name: Link Filter
Plugin URI: giub.it
Description: Nasconde i link dai contenuti in lista al plugin
Author: Daniele Covallero
Date: 05/06/2014
Version: 0.1
Author URI: http://giub.it
License: GPLv2 or later
*/

global $filer_urls, $replace_link;

//Aggiungere qui i link da togliere
$filer_urls = array(
		'http://backin.net',
		'http://ncrypt.in',
		'http://www.ddlstorage.com',
		'http://www.easybytez.com',
		'http://x66.me/'
	);
$replace_link = '<a rel="nofollow" href="%1">Loggati per avere il link</a>';

function g_link_filter($content) {
	global $filer_urls, $replace_link, $post;
	$replace_link = str_replace('%1', wp_login_url(get_permalink()), $replace_link);

	if(!is_user_logged_in() && get_post_type() == 'post') {
		foreach($filer_urls as $url) {
			$pattern = '/'.str_replace('/', '\/', $url).'(.+)(?=<)/';
			$content = preg_replace($pattern, $replace_link, $content, -1);
		}
	}
	return $content;
}

if(!is_admin()) {
	add_filter( 'the_content', 'g_link_filter' );
}

?>