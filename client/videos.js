

window.onload = function(){
    if(!localStorage.getItem("token")){
    alert("Not Authorised");
    document.location.href = "login.html";    
    }else{
        document.getElementById("showdiv").style.display = "block";
        if(localStorage.getItem("role")=="admin"){
            document.getElementById("uploadlink").style.display = "block";
        }
    }
}

function onLOgout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    document.location.href = "login.html";
}