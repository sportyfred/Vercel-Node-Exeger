var fs = require('fs');
const PDFParser = require("pdf2json");
const request = require("request");
const url = 'http://share.paretosec.com/upload/files/OTC_prices_web.pdf';
const express = require('express')
const app = express()

// All of the parse patients
let datum = [];
let bid = [];
let kurs = [];
let ask = [];
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})


app.get('/api', (req, res) => {

const promise = new Promise((resolve, reject) => {
        request({uri: 'http://share.paretosec.com/upload/files/OTC_prices_web.pdf', encoding: null, headers: { 'Content-type' : 'applcation/pdf' }} , function (error, response, body) {
 if (!error && response.statusCode == 200) {

    fs.writeFileSync("pdf.pdf", body);
 console.log('movies');
            resolve([89, 45, 323]);
       
    }
  })});

      promise.then(values => {
 
    // Set up the pdf parser
        let pdfParser = new PDFParser();
   
        // Load the pdf document
       pdfParser.loadPDF(`pdf.pdf`);
       console.log('parse');
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
           
           console.log('pdfData');
 let dtext = pdfData.Pages[0].Texts[0].R[0].T;
           const dpromise = new Promise((resolve, reject) => {

          
           let dtrim = dtext.replace(/%20/g, " ");
           let etrim = dtrim.replace(/%3A/g, ":");
           resolve (etrim);
           });

          dpromise.then(etrim => { 
datum.push(etrim);
bid.push(pdfData.Pages[0].Texts[22].R[0].T);
kurs.push(pdfData.Pages[0].Texts[24].R[0].T);
ask.push(pdfData.Pages[0].Texts[23].R[0].T);
}).then(etrim =>{

res.json({ "bid": bid[0], "kurs": kurs[0], "ask": ask[0], "date": datum[0]}, null, 3);
console.log('send');

          });

        });





});








});
app.listen(process.env.PORT || 3000);

module.exports = app;