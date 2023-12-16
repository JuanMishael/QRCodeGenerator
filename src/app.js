import express from "express";
import bodyParser from "body-parser";
import qr from 'qr-image';
const app = express();
const PORT = 3300;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
// parse application/json
app.use(bodyParser.json())

const noOutput = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1">
        <rect width="1%" height="1%" fill="transparent"/>
        <text x="50%" y="50%" font-size="20" fill="black" text-anchor="middle" alignment-baseline="middle"></text>
    </svg>
`;


app.get('/',(req,res)=>{
    res.render('../view/index.ejs',{
        output: noOutput
    })
})

app.get('/submit-form', (req,res) =>{
    try {
        const submittedText = req.query.textToQR;
        const svg_string = qr.imageSync(submittedText, { type: 'svg' });
        res.render('../view/index.ejs',{
            output: encodeURIComponent(svg_string)
        });
    } catch (error) {
        res.render('../view/index.ejs',{
            output: noOutput
        })
    } 
})

app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})