function reposvar(commitsList) {
  var data = JSON.parse(closestF(commitsList, 'marginli').getAttribute('data-json'));
  var xhr4 = new XMLHttpRequest();
  xhr4.open('GET', 'https://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/commits', false);
  xhr4.send();
  var commitlist = JSON.parse(xhr4.responseText);
  JSON.stringify(commitlist);
  var divCommitFirst = document.createElement('div');
  divCommitFirst.innerHTML = '<br><p><font color="blue">Имя создателя: </font>' + data['login'] + '</p><font color="red" size="7">Список коммитов:</font>';
  closestF(commitsList, 'marginli').appendChild(divCommitFirst);
  var divCommitSecond = document.createElement('div');
  //Почему цикл лучше?
  for (var i = 0; i < commitlist.length; i++) {
    divCommitSecond.innerHTML += '<hr><div><b>Коммит: </b>' + commitlist[i]['commit']['message'] + '<br> <b>Пользователь оставивший коммит: ' + commitlist[i]['committer']['login'] + '</b></div>';
  }
  closestF(commitsList, 'marginli').appendChild(divCommitSecond);
}