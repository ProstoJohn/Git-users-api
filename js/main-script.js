window.onload = function () {
  var requestValue = prompt("Сколько пользователей вам необходимо получить?");
  var preloaderElm = document.getElementById('page-preloader');

  if (requestValue == 0 || requestValue > 30) {
    alert("Количество запросов не может быть равно 0 и быть больше 30");
    location.reload();
  }

  preloaderElm.style.display = 'block';
  //Start request

  sendGETRequest('https://api.github.com/users' + '?since=0', function (xhr) {
    if (xhr.status == 403) {
      alert('Лимит запросов GitHub исчерпан. Попробуйте позже...');
    } else if (xhr.status != 200) {
      alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
    }

    var APIData = JSON.parse(xhr.responseText);

    for (var i = 0; i < requestValue; i++) {
      getUser(APIData[i]);
    }

    preloaderElm.style.display = 'none';
  });

};

function sendGETRequest(uri, callback) {
  sendRequest('GET', uri, callback);
}

function sendRequest(method, uri, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, uri);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    callback(xhr);
  };

}
