 // CREATE AN XMLHttpRequest OBJECT, WITH GET METHOD.
 var xhr = new XMLHttpRequest(), 
 method = 'GET',
 overrideMimeType = 'application/json',
 url = 'assets/json/states.json';        // ADD THE URL OF THE FILE.

xhr.onreadystatechange = function () {
 if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
     
     // PARSE JSON DATA.
     var states = JSON.parse(xhr.responseText);
     var ele = document.getElementById('inputState');
     
     for (let state in states) {
         // BIND DATA TO <select> ELEMENT.
         ele.innerHTML = ele.innerHTML +
             '<option value="' + state + '">' +  states[state] + '</option>';
     }
 }
};

xhr.open(method, url, true);
xhr.send();

function getZipInfo(ele){
    if(ele.value != null){
        let zip=ele.value;
        let city=document.getElementById('inputCity');
        let state=document.getElementById('inputState');
        city.value = '';
        state.selectedIndex = "0";
        options = {
            method: 'get',
            url: 'http://ziptasticapi.com/'+zip,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
        };

        // send the request
        axios(options).then((response) => {
            for(let d in response.data){
                if(d=='city') city.value = response.data[d];
                if(d=='state') state.value = response.data[d];
            }
        })
        .catch(error => {
            city.value = '';
            state.selectedIndex = "0";
            console.log(error)
          });
    }
}