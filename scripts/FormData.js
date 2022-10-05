let form = document.querySelector('form');
        form.addEventListener('submit', (e) =>{ 
        e.preventDefault();
        let mass = [];
        let inputs = document.getElementById('genres').getElementsByTagName('input');
        for(var i = 0; i<inputs.length;i++){
            if(inputs[i].checked){
                mass.push(inputs[i].value);
            }  
        }
        console.table(mass)
        async function sendData(item) {
        const data = new FormData(form)

        data.append('checked_inputs', item);
    
        return await fetch('/admin-panel', {
            method: 'POST',
            body: data
        })
    }
    sendData(mass);
    })

let add = document.querySelector('#add')
add.addEventListener('click', ()=>{
   let addinput = document.createElement('input')
   addinput.className = 'item';
   document.getElementById('add').after(addinput);
})