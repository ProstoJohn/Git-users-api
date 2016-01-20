$(document).ready();
//Start request
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users' + '?since=10909426', false);
xhr.send();
//Request check
if (xhr.status != 200)
{
	alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
}
var apidata = JSON.parse(xhr.responseText);
JSON.stringify(apidata);
for (var i = 0; i < 1; i++)
{
	getUser(apidata[i]);
}

function getUser(mass)
{
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', 'http://api.github.com/users/' + mass['login'], false);
	xhr2.send();
	var datas = JSON.parse(xhr2.responseText);
	JSON.stringify(datas);
	mass['email'] = datas['email'];
	mass['name'] = datas['name'];
	$('#listusers').append("<div class='user anim aslide' data-json='" + JSON.stringify(mass) + "'>Логин: <a href='" + mass['html_url'] + "' target='_blank'>@" + mass['login'] + "</a> <img id='userimg' src='" + mass['avatar_url'] + "' width='75'> <br> Email: " +(mass['email'] == null ? 'Не указан пользователем' : mass['email']) + "<hr /><a onclick='showContent(this)' class='butt'>Подробнее о пользователе</a></div><br>");
}

function showContent(thiser)
{
	var data = JSON.parse($(thiser).closest('.user').attr('data-json'));
	var xhr3 = new XMLHttpRequest();
	xhr3.open('GET', 'http://api.github.com/users/' + data['login'] + '/repos', false);
	xhr3.send();
	var reposinfo = JSON.parse(xhr3.responseText);
	JSON.stringify(reposinfo);
	var reposlist = '<ul class="repos">';
	for (var i = 0; i < reposinfo.length; i++)
	{
		reposlist += '<li id="marginli" data-json=\'{"name": "' + reposinfo[i]['name'] + '", "login": "' + reposinfo[i]['owner']['login'] + '"}\'><a class="buttrep" onclick="reposvar(this); reposforks(this)">' + reposinfo[i]['name'] + '</a></li>';
	}
	$('.user').css('display', 'none');
	reposlist += '</ul>';
	$('#info').closest('.neww').remove().promise().done(function()
	{
		$('#listusers').prepend('<div class="neww anim bslide"><div id="info"><img id="userimg" src="' + data['avatar_url'] + '" width="150"> <ul type="square"><li>Имя пользователя: <b>' + data['login'] + '</b></li><li>Email: <b>' + (data['email'] == null ? 'Не указан пользователем' : data['email']) + '</b></li><li>Полное имя: <b>' + (data['name'] == null ? 'Не указано пользователем' : data['name']) + '</b></li></ul> <div id="reposl">Список репозиториев: ' + reposlist + ' </div> <hr> <a onclick="$(\'#info\').closest(\'.neww\').remove(); $(\'.user\').css(\'display\', \'block\');" class="buttexit">X</a></div></div>');
	});
}

function reposvar(thiser)
{
	var data = JSON.parse($(thiser).closest('li').attr('data-json'));
	var xhr4 = new XMLHttpRequest();
	xhr4.open('GET', 'http://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/commits', false);
	xhr4.send();
	var commitlist = JSON.parse(xhr4.responseText);
	JSON.stringify(commitlist);
	$(thiser).closest('li').append('<br><p><font color="blue">Имя создателя: </font>' + data['login'] + '</p><font color="red" size="7">Список коммитов:</font>');
	var spcommit;
	for (var i = 0; i < commitlist.length; i++)
	{
		spcommit = '<hr><div><b>Коммит: </b>' + commitlist[i]['commit']['message'] + '<br> <b>Пользователь оставивший коммит: ' + commitlist[i]['committer']['login'] + '</b></div>';
		$(thiser).closest('li').append(spcommit);
	}
}

function reposforks(thiser)
{
	var data = JSON.parse($(thiser).closest('li').attr('data-json'));
	var xhr5 = new XMLHttpRequest();
	xhr5.open('GET', 'http://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/forks', false);
	xhr5.send();
	var forkslist = JSON.parse(xhr5.responseText);
	JSON.stringify(forkslist);
	var username;
	username = '<br><font color="red" size="7">Список форков:</font>';
	$(thiser).closest('li').append(username);
	for (var i = 0; i < forkslist.length; i++)
	{
		spforks = '<hr><div>Пользователь оставивший форк: ' + forkslist[i]['owner']['login'] + '</div>';
		$(thiser).closest('li').append(spforks);
	}
}