var video;
var thumbnail;
window.onload = function(){
    if(!localStorage.getItem("token") || localStorage.getItem("role")!=="admin"){
        alert("Not Authorised");
        document.location.href = "login.html";    
        }else{
            document.getElementById("showdiv").style.display = "block";
            
        }
    }
function onUpload(e){
    e.preventDefault();
    let title = document.getElementById("title").value;
    let formData = new FormData();
    formData.append('title',title);
    formData.append("thumbnail",thumbnail);
    formData.append("video",video);
    
}

function onFile(e){
    let file = e.target.files[0]
    e.target.id=="thumbnail"?thumbnail=file:video=file;
}