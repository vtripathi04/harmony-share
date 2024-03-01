const peer = new SimplePeer({ initiator: true });

peer.on('signal', data => {
    console.log('Sender Signal:', data);
});


document.getElementById('fileInput').addEventListener('change', () => {
    let data = 'Hello from sender!';
    peer.send(data);
});
