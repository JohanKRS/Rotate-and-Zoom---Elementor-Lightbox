# Rotate-and-Zoom - Elementor-Lightbox

Description
This project adds rotation, zoom, and pan functionalities to images displayed in the Elementor lightbox. It offers an enhanced viewing experience, allowing users to interact with images in a more dynamic way.

Features
Image rotation (clockwise and counterclockwise)
Zoom in and zoom out
Pan (drag) the image with the right mouse button
Button to reset all transformations
Compatible with Elementor's Swiper slider

How to Use
Add the rotateandzoom-elementor-lightbox.js and rotateandzoom-elementor-lightbox.css files to your project.
Include the files in your WordPress theme or page. You can do this by adding the following code to your functions.php file or using a plugin to insert scripts:

function enqueue_rotate_zoom_scripts() {
    wp_enqueue_script('rotate-zoom-js', get_template_directory_uri() . '/path/to/rotateandzoom-elementor-lightbox.js', array('jquery'), '1.0', true);
    wp_enqueue_style('rotate-zoom-css', get_template_directory_uri() . '/path/to/rotateandzoom-elementor-lightbox.css');
}
add_action('wp_enqueue_scripts', 'enqueue_rotate_zoom_scripts');

Make sure jQuery is loaded on your site (it usually is in WordPress).
The functionalities will be automatically applied to the images in the Elementor lightbox.

Requirements
WordPress
Elementor
jQuery
