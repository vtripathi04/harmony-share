
const peerSender = new SimplePeer({
  initiator: true, 
  config: {
    iceServers: [
      { urls: "stun:stun1.l.google.com:19302"},
      { urls: "stun:stun2.l.google.com:19302"},
      { urls: "stun:stun3.l.google.com:19302"},
      { urls: "stun:stun4.l.google.com:19302"},
    ] },
    trickle:false
});

peerSender.on('signal', data => {
    // Send the offer to the receiver
    // (You'll need to implement a method to send this offer to the receiver)
    // peerSender.
    console.log(data)
    document.getElementById("offers").value += JSON.stringify(data)
    // sendOfferToReceiver(data);
});

peerSender.on('connect', () => {
    console.log('Sender: Connection established');
    // You can start sending data here
    peerSender.send('Hello from sender!');
});

// peer.on('signal', data => {
//     console.log('Sender Signal:', data);
//     document.getElementById("offers").value += JSON.stringify(data)
// });

// // The peer.signal is for sending data to other peer
// peer.signal(data);


// document.getElementById('fileInput').addEventListener('change', () => {
//     let data = 'Hello from sender!';
//     peer.send(data);
// });

let some = () => {
    console.log(JSON.parse(document.getElementById("offers").value))
    peerSender.signal(document.getElementById("offers").value)
}

document.getElementById('accept-button').addEventListener('click', some)