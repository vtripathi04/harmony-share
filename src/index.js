import express from "express";
import { fileURLToPath } from 'url';
import path from "path";


const app = express();
const PORT = 8001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use('/sender', express.static(path.join(__dirname, '..', 'public')));
app.use('/receiver/receivefile', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"16kb"}))


console.log(path.join(__dirname, '..', 'public', 'senderpage.html'));

app.get('/sender/sharefile', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'senderpage.html'));
})

app.get('/receiver/receivefile/:roomName', (req, res) => {

    const {roomName} = req.params;
    console.log(roomName);
    res.sendFile(path.join(__dirname, '..', 'public', 'receiverpage.html'));

    

})


app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});