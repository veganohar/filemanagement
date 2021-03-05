

function onRegister(e) {
    e.preventDefault();
    let formEles = document.getElementById("regform").elements
    let fd = {};
    for (let e of formEles) {
        if (e.tagName == "INPUT") {
            fd[e.id] = e.value;
        }
    }
    if (fd.password !== fd.confirmpw) {
        alert("Password and Confirm Password should match");
        return;
    }
    let api = "http://localhost:3000/api/users/registerUser";
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fd),
    }
    fetch(api, options).then(response => response.json())
        .then(data => {
            if(data.status==201){
                document.getElementById("regform").reset();
                alert("Registration Successful");
            }else{
                alert(data.message);
            }
        });
}
