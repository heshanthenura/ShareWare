const serverUploadWrap = document.getElementById("serverUploadWrap");
const uploadToServer = document.getElementById("uploadToServer");
const serverUpload = document.getElementById("serverUpload");
const serverFileUploadFormCloseBtn = document.getElementById("serverFileUploadFormCloseBtn");
const serverFileUploadForm = document.getElementById("serverFileUploadForm");
const file = document.getElementById("file");
const uploadedFilesToServer = document.getElementById("uploadedFilesToServer");

file.onchange = ()=>{
    for (let i = 0; i < file.files.length; i++) {
        console.log(file.files[i].name);
    }
    uploadedFilesToServer.innerHTML = file.files[0].name;
}

serverFileUploadForm.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(serverFileUploadForm);
    formData.append('file', file.files[0]);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploadToServer');
    xhr.onload = () => {
        if (xhr.status === 200) {
            // Handle success response
            serverFileUploadForm.reset();
            uploadedFilesToServer.innerHTML = "No file is selected";
            serverUploadWrap.style.display = "none";
        } else {
            // Handle error response
        }
    };
    xhr.send(formData);
}

// region serverUpload

uploadToServer.onclick = () =>{
    serverUploadWrap.style.display = "flex"
}

(serverFileUploadFormCloseBtn.onclick) = () => {
    if (serverUploadWrap.style.display == "none") {
        serverUploadWrap.style.display = "flex"
    } else {
        serverUploadWrap.style.display = "none"
    }
}

// endregion