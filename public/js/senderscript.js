
const fileInput = document.getElementById('fileInput');
const recieverDiv = document.getElementById('reciever-link-content')

const generateRecieverURL = (roomName) => {
    roomName = getRoomName(roomName)
    const receiverURL = `${window.location.host}/receiver/receivefile/${roomName}`
    startSender(roomName);
    return receiverURL;
}


const getRoomName = (receiverURL) => {
    const processedName = receiverURL.replace(/[ -]/g, '_');
    const finalName = processedName.split('.')[0];
  
    return finalName;
  
}


fileInput.addEventListener('change', function() {
    const fileName = fileInput.files[0].name;
    
    alert("Created Room with name : " + fileName);

    const receiverURL = generateRecieverURL(fileName);
    // const senderURL = generateSenderURL(fileName);

    // console.log(getRoomName(receiverURL));

    recieverDiv.innerHTML = `<p>Please Share this Link With the Reciever : ${receiverURL} </p>`

    const formData = new FormData();
    formData.append('file', fileInput);


    // fetch(senderURL, {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => {
    //     if (response.ok) {
    //         return response.text(); 
    //     }
    //     throw new Error('Network response was not ok.');
    // })
    // .then(data => {
    //     console.log(data); 
    //     alert('File uploaded successfully!'); 
    // })
    // .catch(error => {
    //     console.error('There was a problem with your fetch operation:', error);
    //     alert('File upload failed! Please try again.');
    // });

});