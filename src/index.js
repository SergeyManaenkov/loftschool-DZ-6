/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise( seconds ) {
    return new Promise( ( resolve ) => {
        setTimeout( () => {
            resolve();
        }, (seconds * 1000) )
    } )
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {

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
                let error = new Error(this.statusText);

                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function() {
            reject(new Error('Network Error'));
        };

        xhr.send();

    } );
}

export {
    delayPromise,
    loadAndSortTowns
};
