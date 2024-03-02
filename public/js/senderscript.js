
const fileInput = document.getElementById('file-upload');
const leftcont = document.querySelector('.left-container')

const addLinkForReceiver = (receiverURL) => {
    // leftcont.innerHTML = ""

    const infodiv = document.querySelector('.file-upload-container')
    infodiv.innerHTML = "Share this Link with a Receiver !";

    document.querySelector('.file-upload').remove();

    const division = document.createElement('div');
    division.id = "rec-link-div";
    const recieverlinkp = document.createElement('a');
    const linktext = document.createTextNode(receiverURL);
    recieverlinkp.href = receiverURL;
    recieverlinkp.target = "_blank"; 
    recieverlinkp.style.color = "white";
    recieverlinkp.appendChild(linktext);
    division.appendChild(recieverlinkp);
    leftcont.appendChild(division);

}


const generateRecieverURL = (roomName) => {
    roomName = getRoomName(roomName)
    const receiverURL = `http://${window.location.host}/receiver/receivefile/${roomName}`
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

    addLinkForReceiver(receiverURL);
    // recieverDiv.innerHTML = `<p>Please Share this Link With the Reciever : ${receiverURL} </p>`

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