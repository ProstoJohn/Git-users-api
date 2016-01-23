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

function getUser(usersList) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://api.github.com/users/' + usersList['login'], false);
  xhr2.send();
  var data = JSON.parse(xhr2.responseText);
  JSON.stringify(data);
  usersList.email = data.email ? data.email : 'Не указан пользователем';
  usersList.name = data.name ? data.name : 'Не указан пользователем';
  var divList = document.createElement('div');
  divList.innerHTML = "<div class='user anim aslide' data-json='" + JSON.stringify(usersList) + "'>Логин: <a href='" + usersList.html_url + "' target='_blank'>@" + usersList.login + "</a> <img id='userimg' src='" + usersList.avatar_url + "' width='75'> <br> Email: " + usersList.email + "<hr /><a onclick='showContent(this)' class='butt'>Подробнее о пользователе</a></div><br>";
  document.getElementById('listusers').appendChild(divList);
}

function closest(element,c){
  var curElement = element;
while(curElement && !curElement.classList.contains(c)) curElement=curElement.parentElement;
return curElement;
};

function showContent(userProfile){
  var el =  closest(userProfile,'user');
  var data = JSON.parse(el.getAttribute('data-json'));
  console.log(data);
  //var data = JSON.parse($(userProfile).closest('.user').attr('data-json'));
  var xhr3 = new XMLHttpRequest();
  xhr3.open('GET', 'https://api.github.com/users/' + data['login'] + '/repos', false);
  xhr3.send();
  var reposinfo = JSON.parse(xhr3.responseText);
  JSON.stringify(reposinfo);
  var reposlist = '<ul class="repos">';
  for (var i = 0; i < reposinfo.length; i++) {
    reposlist += '<li id="marginli" data-json=\'{"name": "' + reposinfo[i]['name'] + '", "login": "' + reposinfo[i]['owner']['login'] + '"}\'><a class="buttrep" onclick="reposvar(this); reposforks(this)">' + reposinfo[i]['name'] + '</a></li>';
  }
  $('.user').css('display', 'none');
  reposlist += '</ul>';
  $('#info').closest('.neww').remove().promise().done(function() {
    
    
    var divProfile = document.createElement('div');
divProfile.innerHTML = '<div class="neww anim bslide"><div id="info"><img id="userimg" src="' + data['avatar_url'] + '" width="150"> <ul type="square"><li>Имя пользователя: <b>' + data['login'] + '</b></li><li>Email: <b>' + (data['email'] == null ? 'Не указан пользователем' : data['email']) + '</b></li><li>Полное имя: <b>' + (data['name'] == null ? 'Не указано пользователем' : data['name']) + '</b></li></ul> <div id="reposl">Список репозиториев: ' + reposlist + ' </div> <hr> <a onclick="$(\'#info\').closest(\'.neww\').remove(); $(\'.user\').css(\'display\', \'block\');" class="buttexit">X</a></div></div>';
 document.getElementById('listusers').appendChild(divProfile);
  
  });
}

function reposvar(commitsList) {
  var data = JSON.parse($(commitsList).closest('li').attr('data-json'));
  var xhr4 = new XMLHttpRequest();
  xhr4.open('GET', 'https://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/commits', false);
  xhr4.send();
  var commitlist = JSON.parse(xhr4.responseText);
  JSON.stringify(commitlist);
  $(commitsList).closest('li').append('<br><p><font color="blue">Имя создателя: </font>' + data['login'] + '</p><font color="red" size="7">Список коммитов:</font>');
  var spcommit;
  for (var i = 0; i < commitlist.length; i++) {
    spcommit = '<hr><div><b>Коммит: </b>' + commitlist[i]['commit']['message'] + '<br> <b>Пользователь оставивший коммит: ' + commitlist[i]['committer']['login'] + '</b></div>';
    $(commitsList).closest('li').append(spcommit);
  }
}

function reposforks(forksList) {
  var data = JSON.parse($(forksList).closest('li').attr('data-json'));
  var xhr5 = new XMLHttpRequest();
  xhr5.open('GET', 'https://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/forks', false);
  xhr5.send();
  var forkslist = JSON.parse(xhr5.responseText);
  JSON.stringify(forkslist);
  var username;
  username = '<br><font color="red" size="7">Список форков:</font>';
  $(forksList).closest('li').append(username);
  for (var i = 0; i < forkslist.length; i++) {
    spforks = '<hr><div>Пользователь оставивший форк: ' + forkslist[i]['owner']['login'] + '</div>';
    $(forksList).closest('li').append(spforks);
  }
}

/*
var divList = document.createElement('div');
divList.innerHTML =
document.getElementById('listusers').appendChild(divList);
*/