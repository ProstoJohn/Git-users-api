function reposvar(commitsList) {
  var data = JSON.parse(closestF(commitsList, 'marginli').getAttribute('data-json'));
  var preloaderElm = document.getElementById('page-preloader');
  
  preloaderElm.style.display = 'block';
  
  sendGETRequest('https://api.github.com/repos/' + data.login + '/' + data.name + '/commits', function (xhr) {
    var xhr4 = new XMLHttpRequest();
    var commitlist = JSON.parse(xhr.responseText);
    var divCommitFirst = document.createElement('div');
    var divCommitSecond = document.createElement('div');
    var templateCommit = '';

    divCommitFirst.innerHTML = '<br><p><font color="blue">Имя создателя: </font>' + data.login + '</p><font color="red" size="7">Список коммитов:</font>';
    closestF(commitsList, 'marginli').appendChild(divCommitFirst);

    for (var i = 0; i < commitlist.length; i++) {
      templateCommit += '<hr><div><b>Коммит: </b>' + commitlist[i].commit.message + '<br> <b>Пользователь оставивший коммит: ' + commitlist[i].committer.login + '</b></div>';
    }

    divCommitSecond.innerHTML = templateCommit;
    closestF(commitsList, 'marginli').appendChild(divCommitSecond);
    preloaderElm.style.display = 'none';
  });
}