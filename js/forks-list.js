function reposforks(forksList) {
  var data = JSON.parse(closestF(forksList, 'marginli').getAttribute('data-json'));
  var divForksSecond = document.createElement('div');
  var preloaderElm = document.getElementById('page-preloader');
  
  preloaderElm.style.display = 'block';
  
    sendGETRequest('https://api.github.com/repos/' + data.login + '/' + data.name + '/forks', function (xhr) {
    var forkslist = JSON.parse(xhr.responseText);
    var divForksFirst = document.createElement('div');
      
    divForksFirst.innerHTML = '<br><font color="red" size="7">Список форков:</font>';
    closestF(forksList, 'marginli').appendChild(divForksFirst);
      
      for (var i = 0; i < forkslist.length; i++) {
        divForksSecond.innerHTML += '<hr><div>Пользователь оставивший форк: ' + forkslist[i].owner.login + '</div>';
        closestF(forksList, 'marginli').appendChild(divForksSecond);
      }
      
      preloaderElm.style.display = 'none';
    });
  }