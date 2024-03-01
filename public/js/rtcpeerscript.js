let senderSocket;
let peerSender;


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

let StartSenderEventHandler = () => 
{
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
        document.getElementById("offers").value += JSON.stringify(data);
        
        senderSocket.send(JSON.stringify({
            'message': JSON.stringify(data),
            'receiver_channel_name': "receiver"
        }));
    });
    peerSender.on('connect', () => {
        console.log('Sender: Connection established');
        peerSender.send('Hello from sender!');
    });

        
}


let startSender = async (roomName) => {
    
    await initializeSender(roomName);

    senderSocket.onmessage = function(e) {
        let data = JSON.parse(e.data);
        
        if (data["message"] == roomName)
        {
            StartSenderEventHandler();
        }
        else
        {
            console.log(data);
            let das = JSON.parse(data["message"]);
            peerSender.signal(das);
        }
    
    };


};


let some = () => {
    console.log(JSON.parse(document.getElementById("offers").value));
    peerSender.signal(document.getElementById("offers").value);
};

document.getElementById('accept-button').addEventListener('click', some);

