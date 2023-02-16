"use strict";

window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i)  => {
                if(item ==target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



    //Timer

    const deadline = '2023-01-20';

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
            hours =Math.floor(t/(3600*1000)%24),
            minutes=Math.floor((t/1000/60) %60),
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

        updateClock ();

        function updateClock () {

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
    setClock('.timer', deadline);  

    
    //modal

    const btn = document.querySelectorAll('[data-modal]'),
          close = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');
          
    function showModal () { 
            modal.classList.add('show');
            modal.classList.remove('hide');
            // modal.classList.toggle('show');
             //убирает прокрутку стр.сайта, когда появля. мод.окно
            document.body.style.overflow = 'hidden'; 
            //если user сам откр. мод.окно, то мы интервал очиститься 
            clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = ''; // браузер сам решит, что лучше подаставить
    }
    /* Перебираем массив кнопок */ 
    btn.forEach(function(item) {
        item.addEventListener('click', showModal);    
    });

    close.addEventListener('click', closeModal);

    // По клику в области подложки будет закрваться мод.окно
    modal.addEventListener('click', (e) => {
        if(e.target ===modal) {
            closeModal();
        }
    });
    //мод.окно закрывает при нажати клавиши  esc
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) { // мод. окно реагир. на esc, только когда open.
            closeModal();
        }
    });

    //устанавливаем чтобы мод.окно появлялось через 10 сек.

    const modalTimerId = setTimeout(showModal, 5000); //сюда ф-ю по открытию мод.окна

    //set если user scroll стр. до конца, то появл. мод.окно

    function showModalByscroll() {
        //отслеж. момент , когла user долистай стр. до конца (свойство за прокротку, свойста клиента и будем ее сравнивать  со scrollhigth);
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal();
            window.removeEventListener('scroll', showModalByscroll);
        }
    }

    window.addEventListener('scroll', showModalByscroll);

    //используем классы для карточек

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
    
    new MenuCard (
        "img/tabs/vegy.jpg", 
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        
    ).render();

    new MenuCard (
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard (
        "img/tabs/post.jpg",
        "post",
        '>Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        ".menu .container",
        'menu__item'
    ).render();


    //Forms 

    const forms = document.querySelectorAll('form'); //получ. все формы котор. есть на стр.-e

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы  с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    //Создаем ф-ю котор. отвечает за постинг данных
    function postData(form) {
        form.addEventListener('submit', (e) =>{
           e.preventDefault(); //запуск, чтобы отменмть стандарт. поведение обраузера(ч.б перезагрузки стр. не было)
           //эта команда в запросах AJAX должна идти в  самом начале
           
           const statusMessage = document.createElement('div');
           statusMessage.classList.add('status');
           statusMessage.textContent = message.loading;
           form.appendChild(statusMessage);

           const request = new XMLHttpRequest();
           request.open('POST', 'server.php');
  
// 1 способ using FormData
        //!!!когда использ. связку new XMLHttpRequest() + new FormData() - то заголовок НЕНУЖНО устанавливать
         //т.к заголовок устанавл. автоматически,если устаровить .setRequestHeader(), то будет ошибка 
        //FormData() -обьект , котор. подготавливает данные для отправки из формы
        //    const formData = new FormData(form); //!ВАЖНО проверять в верстке,чтобы в input ВСЕГДА был указан атрибут name=""
        //    request.send(formData);

        //    request.addEventListener('load', () =>  {
        //        if (request.status=== 200){
        //           console.log(request.response);
        //           statusMessage.textContent=message.success;
        //           form.reset(); //очищаем форму
        //           setTimeout(() =>{
        //              statusMessage.remove();
        //           }, 3000);
        //        }else{
        //         statusMessage.textContent=message.failure;
        //        }
        //    });

// 2 способ using JSON + FormData  
        
           request.setRequestHeader('Content-type', 'application/json' );//ч.б получить данные на JSON + php нужно добавить запись в file 'server.php'

           const formData = new FormData(form);//!ВАЖНО проверять в верстке,чтобы в input ВСЕГДА был указан атрибут name=""
        
           const object = {};
           formData.forEach(function(value, key) {  // получаем обычный обьект из FormData()
                object[key] = value;
           });
           const json = JSON.stringify(object); //Превращаем обычный обьект в формат JSON
        
           request.send(json);

           request.addEventListener('load', () =>  {
             if  (request.status=== 200){
                 console.log(request.response);
                 statusMessage.textContent=message.success;
                 form.reset(); //очищаем форму
                 setTimeout(() =>{
                     statusMessage.remove();
             }, 3000);
             }else{
                statusMessage.textContent=message.failure;
             }
          });

        });
    }

});