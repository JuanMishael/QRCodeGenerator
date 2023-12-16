import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3300;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
// parse application/json
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.render('../view/index.ejs')
})

app.get('/submit-form', (req,res) =>{
    const submittedText = req.query.textToQR;
    console.log('Submitted Text:', submittedText);
    res.send('Form submitted successfully!');
})

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})