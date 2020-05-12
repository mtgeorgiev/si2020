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
        console.log(response);
        if (response.success) {
            
        } else {
            
        }
    }
};

document.getElementById('register').addEventListener('submit', register.onFormSubmitted);
