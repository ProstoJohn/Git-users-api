function reposforks(forksList) {
  var data = JSON.parse(closestF(forksList, 'marginli').getAttribute('data-json'));
  var xhr5 = new XMLHttpRequest();
  xhr5.open('GET', 'https://api.github.com/repos/' + data.login + '/' + data.name + '/forks', false);
  xhr5.send();
  var forkslist = JSON.parse(xhr5.responseText);
  JSON.stringify(forkslist);
  var divForksFirst = document.createElement('div');
  divForksFirst.innerHTML = '<br><font color="red" size="7">Список форков:</font>';
  closestF(forksList, 'marginli').appendChild(divForksFirst);
  var divForksSecond = document.createElement('div');
  for (var i = 0; i < forkslist.length; i++) {
    divForksSecond.innerHTML += '<hr><div>Пользователь оставивший форк: ' + forkslist[i].owner.login + '</div>';
    closestF(forksList, 'marginli').appendChild(divForksSecond);
  }
}