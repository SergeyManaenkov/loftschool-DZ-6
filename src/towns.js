/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector( '#homework-container' );

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {

    return new Promise( ( resolve, reject ) => {
        let xhr = new XMLHttpRequest();

        xhr.open( 'GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true );

        xhr.onload = function () {
            if ( xhr.status == 200 ) {
                let rez = xhr.responseText;
                let cities = JSON.parse( rez );

                cities.sort( function ( a, b ) {
                    return ((a.name > b.name ) && 1) || ((a.name < b.name ) && -1);
                } );

                resolve( cities );

            } else {
                let error = new Error( this.statusText );

                error.code = this.status;
                reject( error );
            }
        };
        xhr.onerror = function () {
            reject( new Error( 'Network Error' ) );
        };

        xhr.send();

    } );

}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching( full, chunk ) {
    if ( chunk == '' ) {
        return false
    }

    const reg = new RegExp( chunk, 'i' );

    return reg.test( full );
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector( '#loading-block' );
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector( '#filter-block' );
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector( '#filter-input' );
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector( '#filter-result' );

let cities = null;

loadTowns().then( function ( _cities ) {
    cities = _cities;
    loadingBlock.style.display = 'none';
    filterBlock.style.display = '';
} );

// это обработчик нажатия кливиш в текстовом поле
filterInput.addEventListener( 'keyup', function ( e ) {
    filterResult.innerHTML = '';
    const val = e.target.value;

    const citiesFiltered = cities.filter( function ( c ) {
        return isMatching( c.name, val );
    } );

    const frElement = document.createDocumentFragment();

    for ( const citie of citiesFiltered ) {
        const div = document.createElement( 'div' );
        div.textContent = citie.name;
        frElement.appendChild( div );
    }
    filterResult.appendChild( frElement );
} );

export {
    loadTowns,
    isMatching
};
