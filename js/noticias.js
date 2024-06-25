document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        const indicators = carousel.querySelectorAll('.carousel-indicators .indicator');
        let currentIndex = 0;
        let interval;
        let startX;
        let isDragging = false;
        let dragThreshold = 50;

        function updateCarousel() {
            items.forEach((item, index) => {
                item.style.display = (index === currentIndex) ? 'block' : 'none';
            });
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }

        function startAutoSlide() {
            interval = setInterval(showNext, 5000);
        }

        function stopAutoSlide() {
            clearInterval(interval);
        }

        function handleTouchStart(event) {
            startX = event.touches[0].clientX;
            isDragging = true;
        }

        function handleTouchMove(event) {
            if (!isDragging) return;
            const currentX = event.touches[0].clientX;
            const diff = startX - currentX;
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    showNext();
                } else {
                    showPrev();
                }
                isDragging = false;
            }
        }

        function handleTouchEnd() {
            isDragging = false;
        }

        function handleMouseStart(event) {
            startX = event.clientX;
            isDragging = true;
        }

        function handleMouseMove(event) {
            if (!isDragging) return;
            const currentX = event.clientX;
            const diff = startX - currentX;
            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    showNext();
                } else {
                    showPrev();
                }
                isDragging = false;
            }
        }

        function handleMouseEnd() {
            isDragging = false;
        }

        nextButton.addEventListener('click', () => {
            showNext();
            stopAutoSlide();
            startAutoSlide();
        });

        prevButton.addEventListener('click', () => {
            showPrev();
            stopAutoSlide();
            startAutoSlide();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                stopAutoSlide();
                startAutoSlide();
            });
        });

        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchmove', handleTouchMove);
        carousel.addEventListener('touchend', handleTouchEnd);

        carousel.addEventListener('mousedown', handleMouseStart);
        carousel.addEventListener('mousemove', handleMouseMove);
        carousel.addEventListener('mouseup', handleMouseEnd);
        carousel.addEventListener('mouseleave', handleMouseEnd);

        updateCarousel();
        startAutoSlide();
    });
});
