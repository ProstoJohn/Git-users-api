function showContent(userProfile) {
  var data = JSON.parse(closestF(userProfile, 'user').getAttribute('data-json'));
  //var data = JSON.parse($(userProfile).closest('.user').attr('data-json'));
  var xhr3 = new XMLHttpRequest();
  xhr3.open('GET', 'https://api.github.com/users/' + data.login + '/repos', false);
  xhr3.send();
  var reposInfo = JSON.parse(xhr3.responseText);
  var reposList = '<ul class="repos">';
  for (var i = 0; i < reposInfo.length; i++) {
    reposList += '<li class="marginli" data-json=\'{"name": "' + reposInfo[i].name + '", "login": "' + reposInfo[i].owner.login + '"}\'><a class="buttrep" onclick="reposvar(this); reposforks(this)">' + reposInfo[i].name + '</a></li>';
  }
  // $('.user').css('display', 'none');
  var elems = document.getElementsByClassName('user');
  for (var i = 0; i < elems.length; i++) elems[i].style.display = 'none';
  reposList += '</ul>';
  var divProfile = document.createElement('div');
  divProfile.innerHTML = '<div class="neww anim bslide"><div id="info"><img id="userimg" src="' + data.avatar_url + '" width="150"> <ul type="square"><li>Имя пользователя: <b>' + data.login + '</b></li><li>Email: <b>' + (data.email == null ? 'Не указан пользователем' : data.email) + '</b></li><li>Полное имя: <b>' + (data.name == null ? 'Не указано пользователем' : data.name) + '</b></li></ul> <div id="reposl">Список репозиториев: ' + reposList + ' </div> <hr> <a onclick="closestF(document.getElementById(\'info\'), \'neww\').parentNode.removeChild(closestF(document.getElementById(\'info\'), \'neww\')); for (var i = 0; i < document.getElementsByClassName(\'user\').length; i++) document.getElementsByClassName(\'user\')[i].style.display = \'block\';" class="buttexit">X</a></div></div>';
  document.getElementById('listusers').appendChild(divProfile);
}