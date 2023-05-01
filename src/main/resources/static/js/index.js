const serverUploadWrap = document.getElementById("serverUploadWrap");
const uploadToServer = document.getElementById("uploadToServer");
const serverUpload = document.getElementById("serverUpload");
const serverFileUploadFormCloseBtn = document.getElementById("serverFileUploadFormCloseBtn");
const serverFileUploadForm = document.getElementById("serverFileUploadForm");
const file = document.getElementById("file");
const uploadedFilesToServer = document.getElementById("uploadedFilesToServer");

file.onchange = ()=>{
    uploadedFilesToServer.innerHTML = "";
    for (let i = 0; i < file.files.length; i++) {
        console.log(file.files[i].name)
        const element = document.createElement('div');
        element.style = "display:flex;justify-content:space-between"
        element.setAttribute('id', `${i}`);
        element.innerHTML = `<h2>${file.files[i].name}</h2>`;
        // element.onclick = () =>{removeFile(i)}
        uploadedFilesToServer.appendChild(element);
    }

    // uploadedFilesToServer.innerHTML = file.files[0].name;
}

serverFileUploadForm.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(serverFileUploadForm);

    for (let i = 0; i < file.files.length; i++) {
        formData.append('files', file.files[i]);
        console.log(file.files[i].name)
    }

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
    file.value="";
    while (uploadedFilesToServer.firstChild) {
        uploadedFilesToServer.removeChild(uploadedFilesToServer.firstChild);
    }
    uploadedFilesToServer.innerHTML = "No file is selected";
    if (serverUploadWrap.style.display == "none") {
        serverUploadWrap.style.display = "flex"
    } else {
        serverUploadWrap.style.display = "none"
    }
}

// endregion