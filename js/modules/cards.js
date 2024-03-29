import {getResource} from "../services/services";

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

    getResource('http://localhost:3000/menu')
        .then(data => {
           data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
           });
        });

}

export default cards;