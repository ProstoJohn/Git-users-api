function showContent(thiser) {
  var data = JSON.parse($(thiser).closest('.user').attr('data-json'));
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
    $('#listusers').prepend('<div class="neww anim bslide"><div id="info"><img id="userimg" src="' + data['avatar_url'] + '" width="150"> <ul type="square"><li>Имя пользователя: <b>' + data['login'] + '</b></li><li>Email: <b>' + (data['email'] == null ? 'Не указан пользователем' : data['email']) + '</b></li><li>Полное имя: <b>' + (data['name'] == null ? 'Не указано пользователем' : data['name']) + '</b></li></ul> <div id="reposl">Список репозиториев: ' + reposlist + ' </div> <hr> <a onclick="$(\'#info\').closest(\'.neww\').remove(); $(\'.user\').css(\'display\', \'block\');" class="buttexit">X</a></div></div>');
  });
}