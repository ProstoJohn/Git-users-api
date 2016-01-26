window.onload = function() {
  var requestValue = prompt("Количество запросов..");
  if (requestValue > 30) {
    alert("Количество запросов больше 30 запрещено.");
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
  var apidata = JSON.parse(xhr.responseText);
  for (var i = 0; i < requestValue; i++) {
    getUser(apidata[i]);
  }
};

function closestF(element, c) {
  var curElement = element;
  while (curElement && !curElement.classList.contains(c)) curElement = curElement.parentElement;
  return curElement;
};