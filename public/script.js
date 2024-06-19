document.querySelector('.navbar a').addEventListener('click', function(event) {
    event.preventDefault();
    alert('You clicked a navbar link!');
});

function toggleNavbar() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className += " responsive";
    } else {
        x.className = "";
    }
}



document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    try{
    const response= await fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok){
        throw new Error ('failed to submit data');
    }
    alert('data captured successfully');
    this.reset();

    }

    catch(error) {
        console.error('Error:', error);
        alert('failed to submit data')
    }
  
});