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