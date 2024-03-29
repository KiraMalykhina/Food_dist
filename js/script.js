"use strict";

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import forms  from './modules/forms';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 300000); //сюда ф-ю по открытию мод.окна
    
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2023-05-24');
    cards();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
    forms('form', modalTimerId);

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });



    //второй вариант создания определенных элементов динамически на странице, отлотче его
    // в том что  он не использ. шаблонизацию
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }




   
    //Slider, option 1
    // showSlides(sliderIndex);

    // function showSlides(n) {

    //     if(n > slides.length){
    //         sliderIndex = 1;
    //     }

    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }

    //     hideSlides();

    //     slides[sliderIndex - 1].classList.add('show', 'fade');
    //     slides[sliderIndex - 1].classList.remove('hide');

    //     if (sliderIndex < 10) {
    //         curent.innerHTML= '0' + sliderIndex;
    //         total.innerHTML= '0' + slides.length;
    //     }else {
    //         curent.innerHTML= sliderIndex;
    //         total.innerHTML= slides.length;
    //     }
    // }

    // function hideSlides() {

    //     slides.forEach(slide => {

    //         slide.classList.add('hide');
    //         slide.classList.remove('show', 'fade');
    //     });
    // }

    // function plusSlide (n) {

    //     showSlides(sliderIndex +=n);
    // }

    // next.addEventListener('click', () => {

    //     plusSlide(1);

    // });

    // prev.addEventListener('click', () => {

    //     plusSlide(-1);

    // });


});

