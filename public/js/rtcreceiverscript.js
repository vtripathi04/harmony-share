const peer = new SimplePeer();

peer.on('signal', data => {
    console.log('Receiver Signal:', data);
});

// Handling received messages
peer.on('data', data => {
    document.getElementById('download-button').innerText = data.toString();
    console.log('Received Message:', data.toString());
});
