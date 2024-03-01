let json_combined;
const peer = new SimplePeer({
    config: {
        iceServers: [
        { urls: "stun:stun1.l.google.com:19302"},
        { urls: "stun:stun2.l.google.com:19302"},
        { urls: "stun:stun3.l.google.com:19302"},
        { urls: "stun:stun4.l.google.com:19302"},
      ],
      trickle: false
    }
}
);

let some = () => {
    peer.signal(document.getElementById("answers").value)
}

peer.on('signal', data => {
    console.log(data);
})

peer.on('data', data => {
    
    console.log('got a message from peer1: ' + data)
  })
  
document.getElementById('answer-button').addEventListener('click', some)
