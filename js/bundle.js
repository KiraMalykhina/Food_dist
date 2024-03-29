/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //calculator
    const resolt = document.querySelector('.calculating__result span');

    let sex,height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
   } else {
       ratio = 1.375;
       localStorage.setItem('ratio', 1.375);
   }
    
   //Устанавливаем начальное значение (после обновления) класса активности, на том элементе пола или физ.активности
   // который записанный LocalStorage 
   function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
   }
   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    //Вычисляем по формуле (для мужчин и женщин отдельная формула) resolt, до вычисления проверка переменных
    //на то, чтобы они были не false.
    function calcTotal () {
        if(!sex || !height || !weight|| !age || !ratio) {
            resolt.textContent ="No Data";
            return;
        }
        if(sex === 'female') {
            resolt.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            resolt.textContent =  Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    //Получаем активность и пол из того, на что клик  юзер и устанавливаем эти значения
    //в LocalStorage, потом устанавливаем класс активности на том эл. на котором был клик
    //Вызываем ф-ю  calc() для пересчета resolt
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();

            });          
            
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    //Тут получаем значение введен юзером (рост, вес, возраст) в  инпуты, и перед этим проверяем ,
    // чтобы были введены только цмифры , если ввели не цифры, то высвечивается ошибка,
    // вконце вызываем ф-ю Calc() для пересчета resolt
    function getDinamicInformation(selector) {    
        const input = document.querySelector(selector),     
        
              parent = document.querySelector('#parent'),

              label = document.createElement("label");

        label.setAttribute("for", selector.replace('#', ''));
        label.textContent = "Введена не цифра";
        label.style.display = 'none';
        parent.append(label);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                // input.style.border = '1px solid red';
                label.style.display = 'block';
                label.style.color = 'red';
                 
            } else {
                label.remove();
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age' :
                    age = +input.value;
                    break;
            }

            calcTotal();

        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Cards (используем классы для карточек)
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //...classes - это оператор rest

            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // это будт массив
            this.rate = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUa();
        }
           
        changeToUa() {
           this.price = this.price * this.rate;
        }

        render() {

            const element = document.createElement('div');
            if (this.classes.length === 0){ // если не был передан ни один класс , то мы добавляем такой класс
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            }else {
            this.classes.forEach(className => element.classList.add(className));  
            }
           
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>      
            `;
            this.parent.append(element);   
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
           data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
           });
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    //Forms 
    const forms = document.querySelectorAll(formSelector); //получ. все формы котор. есть на стр.-e
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы  с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    //Создаем ф-ю котор. отвечает за привязку постинга данных
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //запуск, чтобы отменмть стандарт. поведение обраузера(ч.б перезагрузки стр. не было)
            //эта команда в запросах AJAX должна идти в  самом начале
           
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                    display:block;
                    margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);     

            const formData = new FormData(form);//!ВАЖНО проверять в верстке,чтобы в input ВСЕГДА был указан атрибут name=""

        // 1 способ using FormData
        // fetch('server.php', {
        //     method: "POST",
        //     //!!когда use formData заголовки не пишем!!!
        //     body: formData
        // }).then(data => data.text())
        // .then(data => {
        //     console.log(data);
        //     showThanksModal(message.success);
        //     statusMessage.remove();    

        // }).catch(() => {
        //    showThanksModal(message.failure);
        // }).finally(() => {
        //     form.reset(); //очищаем форму
        // });

        // });
        // }
     

        // 2 способ using JSON + FormData 

        // const object = {};
        // formData.forEach(function(value, key) {  // получаем обычный обьект из FormData()
        //     object[key] = value;
        // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();    

                }).catch(() => {
                showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); //очищаем форму
                });

        });
    }

    function showThanksModal(message) {
         const prevModalDialog = document.querySelector(".modal__dialog");
         
         prevModalDialog.classList.add('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
        
         const thanksModal = document.createElement('div');
         thanksModal.classList.add("modal__dialog");
         thanksModal.innerHTML = `
             <div class="modal__content">
                 <div class="modal__close" data-close>×</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
             thanksModal.remove();
             prevModalDialog.classList.add('show');
             prevModalDialog.classList.remove('hide');
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);

    }


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = ''; // браузер сам решит, что лучше подаставить
}

function showModal (modalSelector, modalTimerId ) { 
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
     //убирает прокрутку стр.сайта, когда появля. мод.окно
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if(modalTimerId){
    //если user сам откр. мод.окно, то мы интервал очиститься
    clearInterval(modalTimerId); 
    }   
}

function modal(triggerSelector, modalSelector, modalTimerId ) {
 
    const btn = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    //* Перебираем массив кнопок */ 
    btn.forEach(function(item) {
        item.addEventListener('click', () =>  showModal(modalSelector, modalTimerId));    
    });

  
    // По клику в области подложки будет закрваться мод.окно или e.target будет х, то мы close мод окно
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == "" ) {
            closeModal(modalSelector);
        }
    });

    //мод.окно закрывает при нажати клавиши  esc
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) { // мод. окно реагир. на esc, только когда open.
            closeModal(modalSelector);
        }
    });

    //set если user scroll стр. до конца, то появл. мод.окно
    function showModalByscroll() {
        //отслеж. момент , когла user долистай стр. до конца (свойство за прокротку, свойста клиента и будем ее сравнивать  со scrollhigth);
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByscroll);
        }
    }

    window.addEventListener('scroll', showModalByscroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass ) {
    //Tabs
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent () {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i)  => {
                if(item ==target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  
    function getTimeRemaining(endtime) {
 
         let days, hours, minutes, seconds;
         const t = Date.parse(endtime) - Date.parse(new Date());
         
         if(t <= 0) {
             days=0;
             hours=0;
             minutes=0;
             seconds=0;
         }else{
             days = Math.floor(t/(24*3600*1000)),
             hours = Math.floor(t/(3600*1000)%24),
             minutes = Math.floor((t/1000/60) %60),
             seconds = Math.floor((t/1000) % 60);
         }
 
         return {
 
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
         };    
    }
 
    function getZero(num) {
        if(num>=0 && num<10){
            return "0" + num;
        }else{
            return num;
        }
    }
      
    function setClock(selector, endtime) {
 
        const timer = document.querySelector(selector),
            days=timer.querySelector('#days'),
            hours=timer.querySelector('#hours'),
            minutes=timer.querySelector('#minutes'),
            seconds=timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
 
        function updateClock() {
 
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);  
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data ) => {   //ф-я отвечает за прстинг данных
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data

    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); //new Error() -Обьект ошибки
    }                                                  // throw - оператор ощибки, выкидывает ее
   
    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");











window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId), 300000); //сюда ф-ю по открытию мод.окна
    
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-05-24');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);

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


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map