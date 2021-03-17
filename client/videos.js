var allVideos = [];

window.onload = function(){
    if(!localStorage.getItem("token")){
    alert("Not Authorised");
    document.location.href = "login.html";    
    }else{
        getAllVideos();
        document.getElementById("showdiv").style.display = "block";
        if(localStorage.getItem("role")=="admin"){
            document.getElementById("uploadlink").style.display = "block";
        }
    }
}

function onLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    document.location.href = "login.html";
}


function getAllVideos() {
    let api = "http://localhost:3000/api/videos/getAllVideos";
    let options = {
        method: 'GET',
        headers: {
            'x-access-token':localStorage.getItem("token")
        },
    }
    fetch(api, options).then(response => response.json())
        .then(data => {
            if(data.status==200){
                allVideos = data.data;
                bindData();
                console.log(allVideos);
            }else{
                alert(data.message);
            }
        });
}


function bindData(){
    let vid_div = document.getElementById("showdiv");
    allVideos.forEach(e=>{
        let div = ` <div class="col-3">
        <p><a href="http://localhost:3000/${e.video}" target="_blank">${e.title}</a></p>
        <video src="http://localhost:3000/${e.video}"></video>
    </div>`;
        vid_div.insertAdjacentHTML("beforeend",div);
    });
}