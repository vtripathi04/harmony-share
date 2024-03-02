

let senderSocket;
let peerSender;
let fileInputs = document.getElementById('file-upload');


let initializeSender = (roomName) => {
    senderSocket = new WebSocket(
        'ws://'
        + '10.7.16.253:8000'
        + '/ws/chat/'
        + roomName
        + '/'
        + "sender"
        + '/'
    );

    return new Promise((resolve) => {
        senderSocket.onopen = () => {
            resolve();
        };
    });
};

let StartSenderEventHandler = () => {
    peerSender = new SimplePeer({
        initiator: true,
        config: {
            iceServers: [
                { urls: "stun:stun1.l.google.com:19302" },
                { urls: "stun:stun2.l.google.com:19302" },
                { urls: "stun:stun3.l.google.com:19302" },
                { urls: "stun:stun4.l.google.com:19302" },
            ]
        },
        trickle: false
    });

    peerSender.on('signal', data => {
        console.log(data);
        // document.getElementById("offers").value += JSON.stringify(data);

        senderSocket.send(JSON.stringify({
            'message': JSON.stringify(data),
            'receiver_channel_name': "receiver"
        }));
    });

    peerSender.on('connect', () => {
        console.log('Sender: Connection established');

        peerSender.send(String(fileInputs.files[0].name));
        sendFileChunks();
    });
};

let startSender = async (roomName) => {
    await initializeSender(roomName);

    senderSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);

        if (data["message"] == roomName) {
            StartSenderEventHandler();
        } else {
            console.log(data);
            let das = JSON.parse(data["message"]);
            peerSender.signal(das);
        }
    };
};

let sendFileChunks = () => {
    const file = fileInputs.files[0];

    if (!file) {
        console.error('No file selected.');
        return;
    }

    const chunkSize = 16 * 1024; // 16 KB
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    console.log(`Sending ${totalChunks} chunks`);

    const reader = new FileReader();

    reader.onload = function () {
        const chunk = new Uint8Array(reader.result);

        peerSender.send(chunk);

        currentChunk++;

        if (currentChunk < totalChunks) {
            readNextChunk();
        }
    };

    function readNextChunk() {
        const start = currentChunk * chunkSize;
        const end = Math.min((currentChunk + 1) * chunkSize, file.size);
        const blob = file.slice(start, end);
        reader.readAsArrayBuffer(blob);
    }

    readNextChunk();
};


