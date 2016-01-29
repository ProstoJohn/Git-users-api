function getUser(usersList) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://api.github.com/users/' + usersList.login, false);
  xhr2.send();
  var data = JSON.parse(xhr2.responseText);
  usersList.email = data.email ? data.email : 'Не указан пользователем';
  usersList.name = data.name ? data.name : 'Не указан пользователем';
  var divList = document.createElement('span');
  divList.innerHTML = "<div class='user anim aslide' data-json='" + JSON.stringify(usersList) + "'>Логин: <a href='" + usersList.html_url + "' target='_blank'>@" + usersList.login + "</a> <img id='userimg' src='" + usersList.avatar_url + "' width='75'> <br> Email: " + usersList.email + "<hr /><a onclick='showContent(this)' class='butt'>Подробнее о пользователе</a></div><br>";
  document.getElementById('listusers').appendChild(divList);
}