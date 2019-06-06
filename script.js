window.onload = function() {
// Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
var API_KEY = 'trnsl.1.1.20190324T115442Z.c891d918094a4915.73025538f8baa0fff0b061fd1fa8763b05d90865';


var sel1 = document.getElementById('lang-1');
var sel2 = document.getElementById('lang-2');
var btn = document.querySelector('button');
var translate = document.querySelector('.translate');

  // отправляем запрос на список доступных языков
  fetch('https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=' + API_KEY)
  .then(function(response) {
    return response.json(); // парсим данные из ответа
  })
  .then(function(response) {
    
    // переносим список доступных языков в select
    for (var prop in response.langs) {
      var opt = document.createElement('option');
      opt.setAttribute('value', prop);
      opt.innerHTML = response.langs[prop];
      sel1.appendChild(opt);
    }
    // переносим список доступных языков в select
    for (var prop in response.langs) {
      var opt = document.createElement('option');
      opt.setAttribute('value', prop);
      opt.innerHTML = response.langs[prop];
      sel2.appendChild(opt);
    }
  });
  // создаем обработчик по нажатию на кнопку
  btn.addEventListener('click', function() {
    var word = document.querySelector('#word').value; // слово для перевода
     // Сохраняем адрес API
    var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    // Формируем полный адрес запроса:
    url += '?key=' + API_KEY; // добавляем к запросу ключ API
    url += '&text=' + word;  //текст для перевода берем из текстового поля
    url += '&lang=' + sel1.value + '-' + sel2.value; // направление перевода берем из select-ов

    // отправляем запрос на перевод слова
    fetch(url).then(function(response) {
      return response.json(); // парсим данные из ответа
    })
    .then(function(response) {

       // если ошибка с сервера
      if (response.code !== 200) {
        translate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
        return;
      }
       // если перевода нет
      if (response.text.length === 0) {
        translate.innerHTML = 'К сожалению, перевод для данного слова не найден';
        return;
      }

      translate.innerHTML = response.text.join('<br>'); // вставляем перевод в текстовое поле
    });

  });
}