console.log('Client side JS file working')

//window.onload=()=>{     //it prevents execution of the code before the DOM loads and can also be achieved by putting script tag at the end
    const weatherForm=document.getElementById('unique')  //selecting the button ID
    const search=document.querySelector('input')
    const msg1=document.querySelector('#msgOne')
    const msg2=document.querySelector('#msgTwo')
    
    weatherForm.addEventListener('click',(e)=>{        //setting the clicking option
        e.preventDefault()
        var data =search.value
        msg1.textContent='Loading...'
        msg2.textContent=''
        fetch('http://localhost:3000/weather?address=' + data).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    msg1.textContent=data.error
                }else{
                    msg1.textContent=data.location
                    msg2.textContent=data.forecast 
                }
            })
        })
    })
//}

