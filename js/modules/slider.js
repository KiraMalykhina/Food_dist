function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
     //Slider, option 2
    let sliderIndex = 1;
    let offset = 0;

    const slides = document.querySelectorAll(slide),
          slider =document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          curent = document.querySelector(currentCounter), 
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

            
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        curent.textContent = `0${sliderIndex}`;
    }else {
        total.textContent= slides.length;
        curent.textContent= sliderIndex;
    }
    

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators =document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i<slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
           transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function dotsOpacity () {

    dots.forEach(dot => dot.style.opacity = '.5' );
        dots[sliderIndex - 1].style.opacity = 1;
    }

    function currentIndex() {
        if(slides.length < 10) {
            curent.textContent = `0${sliderIndex}`;
        }else{
            curent.textContent = sliderIndex;
        }
    }

    
    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {

        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        }else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if(sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }

        currentIndex();
        dotsOpacity ();

    });

    prev.addEventListener('click', () => {

        if (offset == 0) {     
            offset = deleteNotDigits(width) * (slides.length - 1);
        }else {
            offset -= deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        currentIndex();
        dotsOpacity ();
    });

    dots.forEach(dot => {

        dot.addEventListener('click', (e) => {
            const slideTo =e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentIndex();
            dotsOpacity ();

        });


    });

}
export default slider;