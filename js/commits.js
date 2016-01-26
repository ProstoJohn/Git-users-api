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