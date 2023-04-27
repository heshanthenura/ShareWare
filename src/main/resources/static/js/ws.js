const fileListWrap = document.getElementById("fileListWrap");
const fileList = document.getElementById("fileList");

let stompClient;

const uniqueId = generateUniqueId();
console.log(uniqueId);

stompClient = Stomp.over(new SockJS('/ws'));

stompClient.connect({}, function (frame) {

    console.log('Connected: ' + frame);

    stompClient.send("/app/listFiles", {}, uniqueId)

    stompClient.subscribe("/topic/listFiles/" + uniqueId, (data) => {
        console.log(data.body)
        let p = document.createElement("p")
        p.textContent = data.body
        fileList.prepend(p)
    })
    stompClient.subscribe("/topic/uploaded", (data) => {
        console.log(data.body)
        let p = document.createElement("p")
        p.textContent = data.body
        fileList.prepend(p)
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

