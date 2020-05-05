fetch('./sessions.php', {method: 'GET'})
    .then(response=>response.json())
    .then(response => {
        if (response.logged) {
            document.getElementById('hello-message').innerText = "Hello, " + response.username;
            document.getElementById('logout').classList.add('show');
        } else {
            document.getElementById('login').classList.add('show');
        }
    });
    

document.getElementById('login').addEventListener('click', () => {
    fetch('./login.php?username=Pesho', {method: 'GET'})
    .then(response=>response.json())
    .then(response => {
        if (response.success) {
            document.getElementById('hello-message').innerText = "Hello, " + response.username;
            document.getElementById('login').remove();
            document.getElementById('logout').classList.add('show');
        } else {
            document.getElementById('hello-message').innerText = "You could not log in";
        }
    });
});

document.getElementById('logout').addEventListener('click', () => {
    fetch('./logout.php', {method: 'GET'})
    .then(response=>response.json())
    .then(response => {
        if (response.success) {
            document.location.reload();
        }
    });
});
