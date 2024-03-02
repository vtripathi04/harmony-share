

let receiverSocket;
let peerReceiver;
let receivedChunksBlob = new Blob();
let i = 0;
let file_name;

let initializeReceiver = (roomName) => {
    receiverSocket = new WebSocket(
        'ws://'
        + '10.7.16.253:8000'
        + '/ws/chat/'
        + roomName
        + '/'
        + "receiver"
        + '/'
    );

    return new Promise((resolve) => {
        receiverSocket.onopen = () => {
            resolve();
        };
    });
};

let StartReceiverEventHandler = () => {
    peerReceiver = new SimplePeer({
        config: {
            iceServers: [
                { urls: "stun:stun1.l.google.com:19302" },
                { urls: "stun:stun2.l.google.com:19302" },
                { urls: "stun:stun3.l.google.com:19302" },
                { urls: "stun:stun4.l.google.com:19302" },
            ],
            trickle: false
        }
    });

    peerReceiver.on('signal', data => {
        console.log(data);
        // if (data["type"] === "answer") {
            receiverSocket.send(JSON.stringify({
                'message': JSON.stringify(data),
                'receiver_channel_name': "sender"
            }));
        // }
    });

    peerReceiver.on('data', chunk => {
        
        if (i == 0)
        {
          file_name = "" + chunk;
        }
        else
        {
          receivedChunksBlob = new Blob([receivedChunksBlob, chunk]);
        }
        i = i + 1
        console.log("Recieved Chunk " + i)
    });
};

let startReceiver = async (roomName) => {
    
    await initializeReceiver(roomName);
    receiverSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);

        if (JSON.parse(data["message"])["type"] == "offer")
        {
          StartReceiverEventHandler();
          peerReceiver.signal(JSON.parse(data["message"]));
        }
    
    };

}

document.addEventListener('DOMContentLoaded', function() {
  const processedName = window.location.href.replace(/ /g, '_');
  const segments = processedName.split("/");
  const roomName = segments[segments.length - 1];
  startReceiver(roomName);
});

document.querySelector('.download-button').addEventListener('click', () => {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(receivedChunksBlob);
  downloadLink.download = file_name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});

