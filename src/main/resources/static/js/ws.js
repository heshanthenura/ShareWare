const fileListWrap = document.getElementById("fileListWrap");
const fileList = document.getElementById("fileList");

let stompClient;

const uniqueId = generateUniqueId();
console.log(uniqueId);

stompClient = Stomp.over(new SockJS('/ws'));

stompClient.connect({}, function (frame) {

    console.log('Connected: ' + frame);

    const task1 = new Promise((resolve, reject) => {
        // Perform some asynchronous operation
        setTimeout(() => {
            stompClient.send("/app/listFiles", {}, uniqueId)
            resolve(); // Mark the task as completed
        }, 0);
    });
    task1.then(()=>{
        stompClient.subscribe("/topic/listFiles/" + uniqueId, (data) => {
            console.log(data.body)
            let div = document.createElement("div")
            div.textContent = data.body
            div.innerHTML = `<h1><a href="/downloadFromServer/${data.body}" target="_self">${data.body}</a></h1>`
            fileList.prepend(div)
        })
    });



    stompClient.subscribe("/topic/uploaded", (data) => {
        console.log(data.body)
             let div = document.createElement("div")
            div.textContent = data.body
            div.innerHTML = `<h1><a href="/downloadFromServer/${data.body}" target="_self">${data.body}</a></h1>`
            fileList.prepend(div)
    })

});

function generateUniqueId() {
    let id = '';
    while (id.length < 8) {
        id += Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return id;
}

