const register = {
    onFormSubmitted: event => {
        event.preventDefault();

        const formElement = event.target;

        const formData = {
            username: formElement.querySelector("input[name='username']").value,
            password: formElement.querySelector("input[name='password']").value,
        };
        // validate formData;
        
        console.log(formData);

        fetch('./endpoints/register.php', {
                method: 'POST',
                body: JSON.stringify(formData),
                // body: new FormData(formElement),
            })
            .then(response => response.json())
            .then(register.onSuccess);
    },
    onSuccess: response => {
        register.clearMessages();
        if (response.success) {
            document.getElementById('register').style = "display:none";
            register.displaySuccessMessage();            
        } else {
            register.displayErrorMessage();
        }
    },
    clearMessages: () => {
        document.querySelectorAll('#container .success, #container .error').forEach(el => {
            document.getElementById('container').removeChild(el);
        });
    },
    displaySuccessMessage: () => {
        const message = document.createTextNode("Регистрацията е успешна, можете вече да се логнете");
        const messageElement = document.createElement('div');
        messageElement.appendChild(message);
        messageElement.classList.add('success');
        document.getElementById('container').appendChild(messageElement);
        
        const linkToLoginPage = document.createElement('a');
        linkToLoginPage.href = "./login.html";
        linkToLoginPage.classList.add('loginButton');
        linkToLoginPage.appendChild(document.createTextNode('Влез'));
        
        messageElement.appendChild(linkToLoginPage);
    },
    displayErrorMessage: () => {
        const message = document.createTextNode("Неуспешна регистрация");
        const messageElement = document.createElement('div');
        messageElement.appendChild(message);
        messageElement.classList.add('error');
        document.getElementById('container').appendChild(messageElement);
    }
};

document.getElementById('register').addEventListener('submit', register.onFormSubmitted);
