window.onload = function() {
  var requestValue = prompt("Сколько пользователей вам необходимо получить?");
  if (requestValue == 0 || requestValue > 30) {
    alert("Количество запросов не может быть равно 0 и быть больше 30");
    location.reload()
  }
  //Start request
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/users' + '?since=0', false);
  xhr.send();
  //Request check
  if (xhr.status == 403) {
    alert('Лимит запросов GitHub исчерпан. Попробуйте позже...');
  } else if (xhr.status != 200) {
    alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
  }
  var APIData = JSON.parse(xhr.responseText);
  for (var i = 0; i < requestValue; i++) {
    getUser(APIData[i]);
  }
};