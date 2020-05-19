fetch('./endpoints/checkLogin.php', {method: 'GET'})
    .then(response=>response.json())
    .then(response => {
        if (response.logged) {
            document.getElementById('hello-message').innerText = "Hello, " + response.username;
            document.getElementById('logout').classList.add('show');
        } else {
            document.getElementById('login').classList.add('show');
        }
    });
    

document.getElementById('loginForm').addEventListener('submit', event => {
    
    event.preventDefault();
    
    const formElement = document.getElementById('loginForm');
    
    const formData = {
        username: formElement.querySelector("#loginForm input[name='username']").value,
        password: formElement.querySelector("#loginForm input[name='password']").value,
    };
    
    fetch('./endpoints/login.php', {
        method: 'POST',
        body: JSON.stringify(formData),
    })
    .then(response=>response.json())
    .then(response => {
        if (response.success) {
            document.getElementById('hello-message').innerText = "Здравей, " + response.username;
            document.getElementById('login').remove();
            document.getElementById('logout').classList.add('show');
        } else {
            document.getElementById('hello-message').innerText = "Не можете да се логнете";
        }
    });
});

document.getElementById('logout').addEventListener('click', () => {
    fetch('./endpoints/logout.php', {method: 'GET'})
    .then(response=>response.json())
    .then(response => {
        if (response.success) {
            document.location.reload();
        }
    });
});
