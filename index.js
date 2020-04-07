//document.querySelector("div#test1").innerText = "12312312312";

const formSubmitClick1 = event => {
    console.log(event, 'formSubmitClick1');
}

const formSubmitClick2 = event => {
    console.log(event, 'formSubmitClick2');
}

const formSubmitOnSubmit = event => {
    event.preventDefault();
    
    let formData = {
        title: event.target.querySelector('input[name="title"]').value,
    };
    
    document.getElementById('test2').innerText = 'pending';
    
    fetch('./formSubmit.php', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then(response=>response.json())
        .then(response => {
            if (response.success) {
                document.getElementById('test2').innerText = 'success';
            } else {
                document.getElementById('test2').innerText = 'error';
            }
        });
    console.log('asda');
}

const formOnClick = event => {
    console.log(event, 'formOnClick');
}

document.getElementById('form-submit')
        .addEventListener('click', formSubmitClick1);
        
document.getElementById('form-submit')
        .addEventListener('click', formSubmitClick2);
        
document.getElementById('form1')
        .addEventListener('submit', formSubmitOnSubmit);
        
document.getElementById('form1')
        .addEventListener('click', formOnClick);
        
        
document.getElementById('test1')
        .addEventListener('click', event => console.log(event, 1));
        
document.getElementById('test2')
        .addEventListener('click', event => {
            console.log(event, 2);
            event.stopPropagation();
        });
