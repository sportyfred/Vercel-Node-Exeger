// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");
const express = require('express')
const app = express()
const port = 3000
const crawler = require('crawler-request');
 var request = require('request');

// Get all the filenames from the patients folder
const files = fs.readdirSync("patients");



// All of the parse patients
let datum = [];
let bid = [];
let kurs = [];
let ask = [];
let jsondata = [];
  let pdfUrl = 'http://share.paretosec.com/upload/files/OTC_prices_web.pdf';

   async function fetchMoviesJSON() {
   
  const response = await request({uri: 'http://share.paretosec.com/upload/files/OTC_prices_web.pdf', encoding: null, headers: { 'Content-type' : 'applcation/pdf' }} , function (error, response, body) {
 if (!error && response.statusCode == 200) {

    fs.writeFileSync("pdf.pdf", body);
 console.log('movies');
  }
});


  const movies = await response;
console.log('movies');
  return movies;
     
}
fetchMoviesJSON().then(movies => {

// Make a IIFE so we can run asynchronous code
(async () => {



    // Await all of the patients to be passed
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(`patients/10111.pdf`);

        // Parsed the patient
        let patient = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                

                // The raw PDF data in text form
                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
 
                // Return the parsed data
                resolve({
                    name: /Exeger\s(.*?)Finanzero/i.exec(raw)[1].trim()
                   
                });
                    // Save the extracted information to a json file
  datum.push(pdfData.Pages[0].Texts[0].R[0].T);

bid.push(pdfData.Pages[0].Texts[22].R[0].T);
kurs.push(pdfData.Pages[0].Texts[24].R[0].T);
ask.push(pdfData.Pages[0].Texts[23].R[0].T);


            });

        });

        // Add the patient to the patients array
      
   
    }));



})})();  


app.get('/', (req, res) => {
res.json({ "bid": bid[0], "kurs": kurs[0], "ask": ask[0], "date": datum[0]}, null, 3);


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})