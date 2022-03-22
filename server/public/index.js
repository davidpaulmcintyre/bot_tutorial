function handleFirst(){ 
    const webdriver = navigator.webdriver;
    const body = JSON.stringify({webdriver});
    console.log('body ', body)
    fetch('/route1', { 
        method: 'POST',  
        headers: new Headers({'content-type': 'application/json'}),
        body
    }).then(response => response.json())
    .then(data => {
        const classification = data.classification;
        document.getElementById('classification').innerHTML = classification;
    }); 
}

function handleSecond(){ 
    const webdriver = navigator.userAgent;
    const body = JSON.stringify({webdriver});
    console.log('body ', body)
    fetch('/route2', { 
        method: 'POST',  
        headers: new Headers({'content-type': 'application/json'}),
        body
    }).then(response => response.json())
    .then(data => {
        // const classification = data.classification;
        // document.getElementById('classification').innerHTML = classification;
    }); 
}