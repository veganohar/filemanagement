

window.onload = function(){
    if(localStorage.getItem("token")){
    document.location.href = "videos.html";    
    }
}

function onLogin(e) {
    e.preventDefault();
    let formEles = document.getElementById("loginform").elements
    let fd = {};
    for (let e of formEles) {
        if (e.tagName == "INPUT") {
            fd[e.id] = e.value;
        }
    }
    let api = "http://localhost:3000/api/users/signin";
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fd),
    }
    fetch(api, options).then(response => response.json())
        .then(data => {
            if(data.status==200){
                localStorage.setItem("token",data.accessToken);
                localStorage.setItem("username",data.user.username);
                localStorage.setItem("role",data.user.role);
                document.getElementById("loginform").reset();
                document.location.href = "videos.html";
            }else{
                alert(data.message);
            }
        });
}
