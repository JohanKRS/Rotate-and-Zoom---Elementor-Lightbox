# Rotate-and-Zoom - Elementor-Lightbox

### English

## Description
This project adds rotation, zoom, and pan functionalities to images displayed in the Elementor lightbox. It offers an enhanced viewing experience, allowing users to interact with images in a more dynamic way.

## Features
- Image rotation (clockwise and counterclockwise)
- Zoom in and zoom out
- Pan (drag) the image with the right mouse button
- Button to reset all transformations
- Compatible with Elementor's Swiper slider

## How to Use
1. Add the rotateandzoom-elementor-lightbox.js and rotateandzoom-elementor-lightbox.css files to your project.
2. Include the files in your WordPress theme or page. You can do this by adding the following code to your functions.php file or using a plugin to insert scripts:
```
function enqueue_rotate_zoom_scripts() {
    wp_enqueue_script('rotate-zoom-js', get_template_directory_uri() . '/path/to/rotateandzoom-elementor-lightbox.js', array('jquery'), '1.0', true);
    wp_enqueue_style('rotate-zoom-css', get_template_directory_uri() . '/path/to/rotateandzoom-elementor-lightbox.css');
}
add_action('wp_enqueue_scripts', 'enqueue_rotate_zoom_scripts');
```
Make sure jQuery is loaded on your site (it usually is in WordPress).
The functionalities will be automatically applied to the images in the Elementor lightbox.

## Requirements
- WordPress
- Elementor
- jQuery

## License
This project is licensed under the MIT License.



### Português

## Descrição

Este projeto adiciona funcionalidades de rotação, zoom e pan às imagens exibidas no lightbox do Elementor. Ele oferece uma experiência de visualização aprimorada, permitindo que os usuários interajam com as imagens de maneira mais dinâmica.

## Funcionalidades

- Rotação da imagem (sentido horário e anti-horário)
- Zoom in e zoom out
- Pan (arrastar) a imagem com o botão direito do mouse
- Botão para resetar todas as transformações
- Compatível com o slider Swiper do Elementor

## Como usar

1. Adicione os arquivos `rotateandzoom-elementor-lightbox.js` e `rotateandzoom-elementor-lightbox.css` ao seu projeto.
2. Inclua os arquivos no seu tema ou página do WordPress. Você pode fazer isso adicionando o seguinte código ao seu arquivo `functions.php` ou usando um plugin para inserir scripts:
```
function enqueue_rotate_zoom_scripts() {
    wp_enqueue_script('rotate-zoom-js', get_template_directory_uri() . '/path/to/rotateandzoom-elementor-lightbox.js', array('jquery'), '1.0', true);
    wp_enqueue_style('rotate-zoom-css', get_template_directory_uri() . '/path/to/rotateandzoom-elementor-lightbox.css');
}
add_action('wp_enqueue_scripts', 'enqueue_rotate_zoom_scripts');
```
Certifique-se de que o jQuery está carregado em seu site (geralmente já está no WordPress).
As funcionalidades serão automaticamente aplicadas às imagens do lightbox do Elementor.

## Requisitos
- WordPress
- Elementor
- jQuery

## Licença
Este projeto está licenciado sob a Licença MIT.
