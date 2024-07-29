jQuery(document).ready(function($) {
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
        return $('.elementor-lightbox .swiper-slide-active .elementor-lightbox-image');
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
        
        // Adjust pan to keep the same point under the cursor
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
        var $lightbox = $('.elementor-lightbox');
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

            // Add panning functionality with right mouse button
            $lightbox.on('mousedown', '.swiper-slide-active .elementor-lightbox-image', function(e) {
                if (e.button === 2) { // Right mouse button
                    e.preventDefault(); // Prevent default right-click behavior
                    isDragging = true;
                    startX = e.clientX - panX;
                    startY = e.clientY - panY;
                    $(this).css('cursor', 'grabbing');
                }
            });

            $(document).on('mousemove', function(e) {
                if (isDragging) {
                    panX = e.clientX - startX;
                    panY = e.clientY - startY;
                    applyTransform(getCurrentImage());
                }
            });

            $(document).on('mouseup', function(e) {
                if (e.button === 2) { // Right mouse button
                    if (isDragging) {
                        isDragging = false;
                        justFinishedPanning = true;
                        getCurrentImage().css('cursor', 'grab');
                        setTimeout(function() {
                            justFinishedPanning = false;
                        }, 50); // Reset the flag after a short delay
                    }
                }
            });

            // Disable context menu while panning or just after panning
            $lightbox.on('contextmenu', '.swiper-slide-active .elementor-lightbox-image', function(e) {
                if (isDragging || justFinishedPanning) {
                    e.preventDefault();
                }
            });
        }
    }

    function disableElementorControls() {
        $('.elementor-lightbox').find('.eicon-zoom-in-bold, .eicon-zoom-out-bold').css('display', 'none');
    }

    // Use a MutationObserver to detect when the lightbox is added to the DOM
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

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Handle lightbox closing
    $(document).on('click', '.dialog-lightbox-close-button', function() {
        $('.custom-controls').remove();
        resetTransform();
    });

    // Handle Elementor's lightbox opening event
    $(document).on('elementor/popup/show', function() {
        setTimeout(function() {
            addCustomControls();
            disableElementorControls();
        }, 100);
    });

    // Reset transform when navigating to a new image
    $(document).on('click', '.elementor-swiper-button', function() {
        setTimeout(function() {
            resetTransform();
        }, 50);
    });

    // Handle Swiper slide change
    var swiper = document.querySelector('.elementor-lightbox .swiper-container').swiper;
    if (swiper) {
        swiper.on('slideChange', function () {
            resetTransform();
        });
    }
});