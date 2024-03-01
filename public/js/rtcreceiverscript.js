

const peer = new SimplePeer({
    config: {
        iceServers: [
        { urls: "stun:stun1.l.google.com:19302"},
        { urls: "stun:stun2.l.google.com:19302"},
        { urls: "stun:stun3.l.google.com:19302"},
        { urls: "stun:stun4.l.google.com:19302"},
      ]
    }
}
);

let some = () => {
    peer.signal(document.getElementById("answers").value)
}

peer.on('signal', data => {
    console.log(data);
    document.getElementById("answers").value = JSON.stringify(data)
})

peer.on('data', data => {
    // got a data channel message
    console.log('got a message from peer1: ' + data)
  })
  
document.getElementById('answer-button').addEventListener('click', some)
// peer.on('signal', data => {
//     console.log('Receiver Signal:', data);
// });


// Handling received messages
// peer.on('signal', data => {
//     console.log(data);
    // document.getElementById('download-button').innerText = data.toString();
    // console.log('Received Message:', data.toString());
// });
