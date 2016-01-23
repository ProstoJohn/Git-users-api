function loadUsers(count) {
    //Start request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users' + '?since=0');
    xhr.send();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
    
    
        //Request check
        if (xhr.status == 403) {
          alert( 'Лимит запросов GitHub исчерпан. Попробуйте позже...' );
        } else if (xhr.status != 200) {
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        }

        var users = JSON.parse(xhr.responseText);

        for (var i = 0; i < count; i++) {
            getUser(users[i]);
        }
        
    };

}