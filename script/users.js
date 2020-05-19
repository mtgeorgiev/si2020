fetch('./endpoints/users.php', {method: 'GET'})
    .then(response=>response.json())
    .then(response => {
        if (response.allowed === false) {
            document.location = "./login.html";
        } else {
            const container = document.getElementById('container');
            
            response.users.forEach(user => {
                const userElement = document.createElement('div');
                
                let userInfoText = `${user['username']} (${user['id']})`;
                
                userElement.innerText = `${user['username']} (${user['id']})`;
                
                container.appendChild(userElement);
            });
        }
    });
    

import { f } from './lib.js';

f();