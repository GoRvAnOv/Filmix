var deflete = document.getElementById('delete');
deflete.addEventListener('click', () =>{
    fetch('/', {
    method: 'POST', // Method itself
    headers: {
    'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    //"Accept": "application/json"
    }
})
.then(res => res.json()) // or res.json()
.then(res => console.log(res))
})


var films_hover = document.getElementById('films');
films_hover.addEventListener("mouseover", ()=>{
    var a = document.getElementById('hidden-menu');
    
        a.removeAttribute('hidden');
   
})
films_hover.addEventListener("mouseout", ()=>{
    var a = document.getElementById('hidden-menu');
    a.setAttribute('hidden', "");
    
})