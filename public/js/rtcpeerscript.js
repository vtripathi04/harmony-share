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
        
        console.log(data);
        senderSocket.send(JSON.stringify({
            'message': JSON.stringify(data),
            'receiver_channel_name': "receiver"
        }));
    });

    peerSender.on('connect', () => {
        console.log('Sender: Connection established');
        peerSender.send('Hello from sender!');
    });

    

    
    return new Promise((resolve) => {
        senderSocket.onopen = () => {
            resolve();
        };
    });
};


let startSender = async (roomName) => {
    
    await initializeSender(roomName);

    
    let some = () => {
        console.log(JSON.parse(document.getElementById("offers").value));
        peerSender.signal(document.getElementById("offers").value);
    };

    senderSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log(data);
    };


    document.getElementById('accept-button').addEventListener('click', some);
};



