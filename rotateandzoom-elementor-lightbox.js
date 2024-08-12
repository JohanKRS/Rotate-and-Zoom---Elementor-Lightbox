(function() {
    function initCustomLightbox() {
        var currentRotation = 0;
        var currentZoom = 1;
        var panX = 0;
        var panY = 0;
        var isDragging = false;
        var startX, startY;
        var justFinishedPanning = false;

        function applyTransform($img) {
            $img.css('transform', `translate(${panX}px, ${panY}px) rotate(${currentRotation}deg) scale(${currentZoom})`);
        }

        function getCurrentImage() {
            return jQuery('.elementor-lightbox .swiper-slide-active .elementor-lightbox-image');
        }

        function rotateImage(direction) {
            var $img = getCurrentImage();
            currentRotation += direction;
            applyTransform($img);
        }

        function zoomImage(factor) {
            var $img = getCurrentImage();
            var oldZoom = currentZoom;
            currentZoom = Math.max(0.1, Math.min(3, currentZoom * factor));
            
            var zoomRatio = currentZoom / oldZoom;
            panX = panX * zoomRatio;
            panY = panY * zoomRatio;
            
            applyTransform($img);
        }

        function resetTransform() {
            currentRotation = 0;
            currentZoom = 1;
            panX = 0;
            panY = 0;
            applyTransform(getCurrentImage());
        }

        function addCustomControls() {
            var $lightbox = jQuery('.elementor-lightbox');
            if ($lightbox.find('.custom-controls').length === 0) {
                $lightbox.append(`
                    <div class="custom-controls">
                        <button class="rotate-left">↺</button>
                        <button class="rotate-right">↻</button>
                        <button class="zoom-in">+</button>
                        <button class="zoom-out">-</button>
                        <button class="reset">Desfazer Zoom</button>
                    </div>
                `);
                
                $lightbox.find('.rotate-left').on('click', function(e) {
                    e.stopPropagation();
                    rotateImage(-90);
                    return false;
                });
                
                $lightbox.find('.rotate-right').on('click', function(e) {
                    e.stopPropagation();
                    rotateImage(90);
                    return false;
                });

                $lightbox.find('.zoom-in').on('click', function(e) {
                    e.stopPropagation();
                    zoomImage(1.25);
                    return false;
                });

                $lightbox.find('.zoom-out').on('click', function(e) {
                    e.stopPropagation();
                    zoomImage(0.8);
                    return false;
                });

                $lightbox.find('.reset').on('click', function(e) {
                    e.stopPropagation();
                    resetTransform();
                    return false;
                });

                $lightbox.on('mousedown', '.swiper-slide-active .elementor-lightbox-image', function(e) {
                    if (e.button === 2) {
                        e.preventDefault();
                        isDragging = true;
                        startX = e.clientX - panX;
                        startY = e.clientY - panY;
                        jQuery(this).css('cursor', 'grabbing');
                    }
                });

                jQuery(document).on('mousemove', function(e) {
                    if (isDragging) {
                        panX = e.clientX - startX;
                        panY = e.clientY - startY;
                        applyTransform(getCurrentImage());
                    }
                });

                jQuery(document).on('mouseup', function(e) {
                    if (e.button === 2) {
                        if (isDragging) {
                            isDragging = false;
                            justFinishedPanning = true;
                            getCurrentImage().css('cursor', 'grab');
                            setTimeout(function() {
                                justFinishedPanning = false;
                            }, 50);
                        }
                    }
                });

                $lightbox.on('contextmenu', '.swiper-slide-active .elementor-lightbox-image', function(e) {
                    if (isDragging || justFinishedPanning) {
                        e.preventDefault();
                    }
                });
            }
        }

        function disableElementorControls() {
            jQuery('.elementor-lightbox').find('.eicon-zoom-in-bold, .eicon-zoom-out-bold').css('display', 'none');
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        if (node.classList && node.classList.contains('elementor-lightbox')) {
                            setTimeout(function() {
                                addCustomControls();
                                disableElementorControls();
                            }, 100);
                        }
                    }
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        jQuery(document).on('click', '.dialog-lightbox-close-button', function() {
            jQuery('.custom-controls').remove();
            resetTransform();
        });

        jQuery(document).on('elementor/popup/show', function() {
            setTimeout(function() {
                addCustomControls();
                disableElementorControls();
            }, 100);
        });

        jQuery(document).on('click', '.elementor-swiper-button', function() {
            setTimeout(function() {
                resetTransform();
            }, 50);
        });

        jQuery(document).on('ready', function() {
            var swiper = document.querySelector('.elementor-lightbox .swiper-container');
            if (swiper && swiper.swiper) {
                swiper.swiper.on('slideChange', function () {
                    resetTransform();
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomLightbox);
    } else {
        initCustomLightbox();
    }
})();
