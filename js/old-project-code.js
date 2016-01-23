$(document).ready(function() {
            $.ajax(
			{
				type: 'GET',
				url: 'https://api.github.com/users',
				data: 'since=' + 0,
				success: function(dater)
				{
					$('#listusers').html();
					for (var i = 0; i < 2; i++)
					{
						getUser(dater[i]);
					}
				}
			});
            
			function getUser(mass)
			{
				$.ajax(
				{
					url: 'http://api.github.com/users/' + mass['login'],
					data: '',
					type: 'GET',
					success: function(datas)
					{
						mass['email'] = datas['email'];
						mass['name'] = datas['name'];
                        console.log(mass);
						$('#listusers').append("<div class='user anim aslide' data-json='" + JSON.stringify(mass) + "'>Логин: <a href='" + mass['html_url'] + "' target='_blank'>@" + mass['login'] + "</a>, Аватар: <img id='userimg' src='" + mass['avatar_url'] + "' width='75'>, Email: " + datas['email'] + "<hr /><a onclick='showContent(this)' class='butt'>Подробнее о пользователе</a></div><br>");
					}
				});
			}
		});

		function showContent(thiser)
		{
			var data = JSON.parse($(thiser).closest('.user').attr('data-json'));
			$.ajax(
			{
				type: 'GET',
				url: 'http://api.github.com/users/' + data['login'] + '/repos',
				success: function(reposinfo)
				{
					var reposlist = '<ul class="repos">';
					for (var i = 0; i < reposinfo.length; i++)
					{
						reposlist += '<li id="marginli" data-json=\'{"name": "' + reposinfo[i]['name'] + '", "login": "' + reposinfo[i]['owner']['login'] + '"}\'><a class="buttrep" onclick="reposvar(this); reposforks(this)">' + reposinfo[i]['name'] + '</a></li>';
					}
					$('.user').css('display', 'none');
					reposlist += '</ul>';
					$('#info').closest('.neww').remove().promise().done(function()
					{
						$('#listusers').prepend('<div class="neww anim bslide"><div id="info"><img id="userimg" src="' + data['avatar_url'] + '" width="150"> <ul type="square"><li>Имя пользователя: <b>' + data['login'] + '</b></li><li>Email: <b>' + data['email'] + '</b></li><li>Полное имя: <b>' + data['name'] + '</b></li></ul> <div id="reposl">Список репозиториев: ' + reposlist + ' </div> <a onclick="$(\'#info\').closest(\'.neww\').remove(); $(\'.user\').css(\'display\', \'block\');" class="butt">X</a></div></div>');
					});
				}
			});
		}

		function reposvar(thiser)
		{
			var data = JSON.parse($(thiser).closest('li').attr('data-json'));
			$.ajax(
			{
				type: 'GET',
				url: 'http://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/commits',
				success: function(commitlist)
				{
					$(thiser).closest('li').append('<br><p><font color="blue">Имя создателя: </font>' + data['login'] + '</p><font color="red" size="8">Список коммитов:</font>');
					var spcommit;
					for (var i = 0; i < commitlist.length; i++)
					{
						spcommit = '<hr><div><b>Коммит: </b>' + commitlist[i]['commit']['message'] + '<br> <b>Пользователь оставивший коммит: ' + commitlist[i]['committer']['login'] + '</b></div>';
						$(thiser).closest('li').append(spcommit);
					}
				}
			});
		}

		function reposforks(thiser)
		{
			var data = JSON.parse($(thiser).closest('li').attr('data-json'));
			$.ajax(
			{
				type: 'GET',
				url: 'http://api.github.com/repos/' + data['login'] + '/' + data['name'] + '/forks',
				success: function(forkslist)
				{
					var username;
					username = '<br><font color="red" size="8">Список форков:</font>';
					$(thiser).closest('li').append(username);
					for (var i = 0; i < forkslist.length; i++)
					{
						spforks = '<hr><div>Пользователь оставивший форк: ' + forkslist[i]['owner']['login'] + '</div>';
						$(thiser).closest('li').append(spforks);
					}
				}
			});
		}