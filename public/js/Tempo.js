
// let createOffer = async () => {

//     peerConnection.onicecandidate = async (event) => {
//         if(event.candidate){
//             document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)
//         }
//     };

//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
// }

// let createAnswer = async () => {

//     let offer = JSON.parse(document.getElementById('offer-sdp').value)

//     peerConnection.onicecandidate = async (event) => {
//         //Event that fires off when a new answer ICE candidate is created
//         if(event.candidate){
//             console.log('Adding answer candidate...:', event.candidate)
//             peerConnection.add
//             document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)
//         }
//     };

//     await peerConnection.setRemoteDescription(offer);

//     let answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer); 
// }

// let addAnswer = async () => {
//     console.log('Add answer triggerd')
//     let answer = JSON.parse(document.getElementById('answer-sdp').value)
//     console.log('answer:', answer)
//     if (!peerConnection.currentRemoteDescription){
//         peerConnection.setRemoteDescription(answer);
//     }
// }

// init()

// document.getElementById('create-offer').addEventListener('click', createOffer)
// document.getElementById('create-answer').addEventListener('click', createAnswer)
// document.getElementById('add-answer').addEventListener('click', addAnswer)