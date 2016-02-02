function getUser(usersList) {
  var preloaderElm = document.getElementById('page-preloader');
  
  preloaderElm.style.display = 'block';
  
  sendGETRequest('https://api.github.com/users/' + usersList.login, function (xhr) {
    var data = JSON.parse(xhr.responseText);
    var divList = document.createElement('span');
    
    usersList.email = data.email ? data.email : 'Не указан пользователем';
    usersList.name = data.name ? data.name : 'Не указан пользователем';
    
    divList.innerHTML = "<div class='user anim aslide' data-json='" + JSON.stringify(usersList) + "'>Логин: <a href='" + usersList.html_url + "' target='_blank'>@" + usersList.login + "</a> <img id='userimg' src='" + usersList.avatar_url + "' width='75'> <br> Email: " + usersList.email + "<hr /><a onclick='showContent(this)' class='butt'>Подробнее о пользователе</a></div><br>";
    
    document.getElementById('listusers').appendChild(divList);
    preloaderElm.style.display = 'none';
  });
}