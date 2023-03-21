import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json)
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
         showModal('.modal', modalTimerId);
        
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
             closeModal('.modal');
        }, 4000);

    }


}

export default forms;