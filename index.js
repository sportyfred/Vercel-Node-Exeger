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
let mupp = [];
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
         
        
 let dtext = pdfData.Pages[0].Texts[0].R[0].T;
 let bidtext = pdfData.Pages[0].Texts[30].R[0].T;
let kurstext = pdfData.Pages[0].Texts[32].R[0].T;
let asktext = pdfData.Pages[0].Texts[31].R[0].T;

      


           const dpromise = new Promise((resolve, reject) => {

    let bidtrim = bidtext.replace(/%2C/g, ".");
          let kurstrim = kurstext.replace(/%2C/g, ".");
          let asktrim = asktext.replace(/%2C/g, ".");
           let dtrim = dtext.replace(/%20/g, " ");
           let etrim = dtrim.replace(/%3A/g, ":");
            mupp[0] = etrim;
              mupp[1] = bidtrim;
                 mupp[2] = kurstrim;
                    mupp[3] = asktrim;
           resolve (mupp);
           });



          dpromise.then( mupp => { 
datum.push(mupp[0]);
bid.push(mupp[1]);
kurs.push(mupp[2]);
ask.push(mupp[3]);

}).then(mupp =>{


res.json({ "bid": bid[0], "kurs": kurs[0], "ask": ask[0], "date": datum[0]}, null, 3);
console.log('send');

          });

        });





});








});
app.listen(process.env.PORT || 3000);

module.exports = app;
