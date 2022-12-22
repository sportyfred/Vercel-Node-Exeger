fetch("/api")
// Get the request body and convert to JSON:
.then((res)=> res.json())
// Here we have the request body as a JSON object ready to be used:
.then((data)=>{

document.getElementById("spinner").style.display = "none";
box.innerHTML = data.kurs;
bid.innerHTML = data.bid;
ask.innerHTML = data.ask;

  
datum.innerHTML = data.date;
document.getElementById("form").style.display = "inline";
document.getElementById("wrap").style.display = "inline";


    console.log( data );

})
.catch(console.error);
