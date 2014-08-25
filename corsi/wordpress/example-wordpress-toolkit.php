<?php
/**
 * Plugin Name: Your WordPress Toolkit
 * Plugin URI: http://your-website-url-here.com/your-wordpress-toolkit/
 * Description: Hi, I'm Your WordPress Toolkit, a collection of awesome functionality used to enhance your WordPress-powered website and provide extra functionality on top of paid-for WordPress products used by our agency.
 * Author: Matt Cohen and Scott Basgaard of WooThemes
 * Version: 1.0.0
 * Author URI: http://woothemes.com/
 */

 if ( ! class_exists( 'YourName_WordPress_Toolkit' ) ) {
 	class YourName_WordPress_Toolkit {
 		/**
 		 * Google Analytics tracking ID.
 		 * @var string
 		 */
 		public $tracking_id = '';
 		
 		/**
 		 * Google Analytics tracking location ("header" or "footer").
 		 * @var string
 		 */
 		public $tracking_location = 'footer';

 		/**
 		 * Advertising code to be displayed after every "X" number of posts.
 		 * @var string
 		 */
 		public $advertising_code = '';

 		/**
 		 * Display the advertising code after every "X" number of posts.
 		 * @var integer
 		 */
 		public $display_every_x = 3;

 		/**
 		 * Keep a count of the posts while looping through them.
 		 * @var integer
 		 */
 		private $_post_counter = 0;

 		/**
 		 * Constructor.
 		 *
 		 * Call our various internal methods.
 		 *
 		 * @since  1.0.0
 		 * @return  void
 		 */
 		public function __construct () {
 			add_action( 'plugins_loaded', array( &$this, 'init' ) );
 		} // End __construct()

 		/**
 		 * Initialise the toolkit.
 		 *
 		 * @since  1.0.0
 		 * @return  void
 		 */
 		public function init () {
 			// Remove the "generator" meta tag.
 			if ( ! is_admin() ) { $this->remove_generator_tag(); }

 			// Load Google Analytics tracking code.
 			if ( ! is_admin() && ( '' != $this->tracking_id ) ) {
 				if ( 'header' == $this->tracking_location ) {
 					add_action( 'wp_print_scripts', array( &$this, 'display_google_analytics_code' ) );
 				} else {
 					add_action( 'wp_footer', array( &$this, 'display_google_analytics_code' ) );
 				}
 			}

 			// Display advertising code after every "X" posts.
 			if ( ! is_admin() && ! is_singular() && ( '' != $this->advertising_code ) ) {
 				add_action( 'the_post', array( &$this, 'display_advertising_code' ) );
 			}
 		} // End init()

 		/**
 		 * Remove the "generator" <meta> tag.
 		 *
 		 * Remove the "generator" <meta> tag from the <head> section when loading the WordPress frontend.
 		 *
 		 * @since  1.0.0
 		 * @return  void
 		 */
 		public function remove_generator_tag () {
 			remove_action( 'wp_head',  'wp_generator' );
 		} // End remove_generator_tag()

 		/**
 		 * Display the Google Analytics tracking code.
 		 *
 		 * Display the Google Analytics tracking code, using a tracking ID provided.
 		 *
 		 * @since  1.0.0
 		 * @return  void
 		 */
 		public function display_google_analytics_code () {
 			if ( '' == $this->tracking_id ) { return; }

 			$html = '<script type="text/javascript">//<![CDATA[
			var _gaq = _gaq || [];
			_gaq.push([\'_setAccount\', \'' . esc_js( $this->tracking_id ) . '\']);
							_gaq.push([\'_trackPageview\']);
			(function () {
				var ga = document.createElement(\'script\');
				ga.type = \'text/javascript\';
				ga.async = true;
				ga.src = (\'https:\' == document.location.protocol ? \'https://ssl\' : \'http://www\') + \'.google-analytics.com/ga.js\';
				var s = document.getElementsByTagName(\'script\')[0];
				s.parentNode.insertBefore(ga, s);
			})();
			//]]></script>' . "\n";

			echo $html;
 		} // End display_google_analytics_code()

 		/**
 		 * Display the advertising code after every "X" number of posts.
 		 * 
 		 * @param  object $obj The current post in the loop.
 		 * @since  1.0.0
 		 * @return void
 		 */
 		public function display_advertising_code ( $obj ) {
 			if ( is_main_query() && in_the_loop() ) {
	 			if ( ( 1 < $this->_post_counter ) && ( 0 == $this->_post_counter % $this->display_every_x ) ) {
	 				echo $this->get_advertising_code();
	 			}
	 			$this->_post_counter++;
	 		}
 		} // End display_advertising_code()

 		/**
 		 * Return the advertising code.
 		 * 
 		 * @since  1.0.0
 		 * @see    wp_kses_post()
 		 * @return string Sanitized advertising code.
 		 */
 		private function get_advertising_code () {
 			return wp_kses_post( trim( $this->advertising_code ) );
 		} // End get_advertising_code()
 	} // End Class
 }

 global $yourname_wordpress_toolkit;
 $yourname_wordpress_toolkit = new YourName_WordPress_Toolkit();
?>