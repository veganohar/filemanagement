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
    let api = "http://localhost:3000/api/videos/saveNewVideo";
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': "multipart/form-data; boundary=<calculated when request is sent>",
            'x-access-token':localStorage.getItem("token")
        },
        body: formData,
    }
    fetch(api, options).then(response => response.json())
        .then(data => {
            if(data.status==201){
                document.getElementById("vidform").reset();
                alert("Video Uploaded Successful");
            }else{
                alert(data.message);
            }
        });
}

function onFile(e){
    let file = e.target.files[0]
    e.target.id=="thumbnail"?thumbnail=file:video=file;
}