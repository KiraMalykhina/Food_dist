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

export default modal;
export{closeModal};
export{showModal};