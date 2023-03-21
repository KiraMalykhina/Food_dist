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

export default calc;