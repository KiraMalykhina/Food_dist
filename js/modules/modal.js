function modal() {
    //modal
    const btn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    //* Перебираем массив кнопок */ 
    btn.forEach(function(item) {
        item.addEventListener('click', showModal);    
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = ''; // браузер сам решит, что лучше подаставить
    }

    function showModal () { 
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
         //убирает прокрутку стр.сайта, когда появля. мод.окно
        document.body.style.overflow = 'hidden'; 
        //если user сам откр. мод.окно, то мы интервал очиститься 
        clearInterval(modalTimerId);
    }

  
    // По клику в области подложки будет закрваться мод.окно или e.target будет х, то мы close мод окно
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == "" ) {
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

    const modalTimerId = setTimeout(showModal, 50000); //сюда ф-ю по открытию мод.окна

    //set если user scroll стр. до конца, то появл. мод.окно

    function showModalByscroll() {
        //отслеж. момент , когла user долистай стр. до конца (свойство за прокротку, свойста клиента и будем ее сравнивать  со scrollhigth);
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal();
            window.removeEventListener('scroll', showModalByscroll);
        }
    }

    window.addEventListener('scroll', showModalByscroll);
}

module.exports = modal;