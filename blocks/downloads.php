<?php

function downloads_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'downloads/index.min.js';
	wp_register_script(
		'downloadsOutput',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-components',
			'wp-editor'
		),
		filemtime( "$dir/$index_js" )
	);

	register_block_type( 'rrze-downloads/downloads', array(
		'editor_script' => 'downloadsOutput',
		'render_callback'  => 'downloadsHandler',
		'attributes'         =>   [
			"format" => [
				'default' => 'liste'
			],
			"category" => [
				'default' => ''
			],
			"tags" => [
				'default' => ''
			],
			"type" => [
				'default' => ''
			],
			"htmlpre" => [
				'default' => ''
			],
			"htmlpost" => [
				'default' => ''
			],
			"htmlitempre" => [
				'default' => ''
			],
			"htmlitempost" => [
				'default' => ''
			],
			"search_application" => [
				'default' => ''
			],
			"search_image" => [
				'default' => ''
			],
			"search_video" => [
				'default' => ''
			],
			"search_audio" => [
				'default' => ''
			],
			"search_text" => [
				'default' => ''
			],
			"showsize" => [
				'default' => true
			],
			"showcreated" => [
				'default' => ''
			],
			"showexcerpt" => [
				'default' => ''
			],
			"showcontent" => [
				'default' => ''
			],
			"errormsg" => [
				'default' => ''
			],
			"orderby" => [
				'default' => 'title'
			],
			"sort" => [
				'default' => 'ASC'
			]
		]
	) );
}
add_action( 'init', 'downloads_block_init' );
