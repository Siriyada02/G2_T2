

const postBtn = document.getElementById('save')
const getBtn = document.getElementById('SEARCH')
const getTableBtn = document.getElementById('GetTable')
const inputStore = document.getElementById('STORE')
const inputPROD = document.getElementById('PROD')
const inputCurrent = document.getElementById("CURRENCY")


const cTable = document.getElementById('clear')




const d = new Date();
const y = d.getMonth() + 1;
let inputDate = d.getFullYear() + '/' + y + '/' + d.getDate()+` `+d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()



getBtn.addEventListener('click',getInfo)

getTableBtn.addEventListener('click',getTable)

async function postInfo (e) {
    e.preventDefault()
    td = "";

    const res = await fetch('http://localhost:4500/API4/Test',{
       
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            STORE_CD : inputStore.value  ,
            PROD_CD :  inputPROD.value ,
            Currency : inputCurrent.value   ,
            Date : inputDate
        })
    })
    .then(res => {return res.json()})
    .then(data => {

        td += "</button>"
        td += `<button type="clear" id="clear">`
        td += "Save Completed !!!"
        td += "</button>"

        
        document.getElementById("cc").innerHTML=td})
    .catch(err => console.error(err))
}
async function getInfo (e) {
    e.preventDefault()
    const a = inputStore.value
    var ta = "";
    var tb = "";
    tb += inputCurrent.value;
    var td="";
    var tc="";
    var tAA ="";
    var tUTHB ="";
    var tUCC ="";
    var tUU ="";
    tUU += inputCurrent.value;

    td += `<button id="save">`
    td += "Save"
    td += "</button>"
    td += `<button type="clear" id="clear">`
    td += "Cancel"
    td += "</button>"

    tc += "<tr><th>"
    tc += "Product Code"
    tc += "</th>"
    tc += "<th>"
    tc += "Product Name"
    tc += "</th>"
    tc += "<th>"
    tc += "Package Size"
    tc += "</th>"
    tc += "<th>"
    tc += "Product Retail (USD)"
    tc += "</th>"
    tc += "<th>"
    tc += "Product Retail (THB)"
    tc += "</th>"
    tc += "<th>"
    tc += `Product Retail (<a id="CC"></a>)`
    tc += "</th></tr>"

    tAA += "<a>Result:</a>"
    tAA += `<div></div>`
    tAA += `<a>1 USD = <a id="UTHB"></a> THB</a>`
    tAA += `<div></div>`
    tAA += `<a>1 USD = <a id="UCC"></a> <a id="UU"></a></a>`
    fetch(`http://localhost:4500/API1_2/Test?STORE_CD=${inputStore.value}&PROD_CD=${inputPROD.value}&Currency=${inputCurrent.value}&Date=${inputDate}`).then(res => {return res.json()})
   .then(data => {   if(data.length > 0){
    data.forEach((item) => {
        console.log(parseFloat(item.PRODUCT_RETAIL_Currency))
        ta += "<tr><td>";
        ta += item.PRODUCT_CODE;
        ta += "</td>";
        ta += "<td>";
        ta += item.PRODUCT_NAME;
        ta += "<td>";
        ta += item.PACKAGE_SIZE;
        ta += "<td>";
        ta += parseFloat(item.PRODUCT_RETAIL_USD).toLocaleString("en",{minimumFractionDigits:4})
        ta += "<td>";
        ta += parseFloat(item.PRODUCT_RETAIL_THB).toLocaleString("en",{minimumFractionDigits:4})
        ta += "<td>";
        ta += parseFloat(item.PRODUCT_RETAIL_Currency).toLocaleString("en",{minimumFractionDigits:4});
        ta += "</td></tr>";
        tUTHB += parseFloat(item.USDtoTHB).toLocaleString("en",{minimumFractionDigits:4});;
        tUCC += parseFloat(item.USDtoCurrency).toLocaleString("en",{minimumFractionDigits:4});;




    })
    console.log(ta)
    document.getElementById("bb").innerHTML = tc;
    document.getElementById("CC").innerHTML = tb;
    document.getElementById("tbody").innerHTML = ta;
    document.getElementById("cc").innerHTML = td;
    document.getElementById("AA").innerHTML = tAA;
    document.getElementById("UTHB").innerHTML = tUTHB ;
    document.getElementById("UCC").innerHTML = tUCC;
    document.getElementById("UU").innerHTML = tUU ;
    const postBtn = document.getElementById('save')
    postBtn.addEventListener('click',postInfo)

}})

 
}

async function getTable (e) {
    e.preventDefault()
    let ta = "";
    var tb = "";
    var tc = "";
    var td="";
    var tAA ="";
    
    tc += "<th>"
    tc += "Product Code"
    tc += "<th>"
    tc += "Product Name"
    tc += "<th>"
    tc += "Package Size"
    tc += "<th>"
    tc += "Product Retail (USD)"
    tc += "<th>"
    tc += "Product Retail (THB)"
    tc += "<th>"
    tc += "Rate 1 USD (THB)"
    tc += "<th>"
    tc += `Product Retail (<a id="CC"></a>)`
    tc += "<th>"
    tc += `Rate 1 USD (<a id="DD"></a>)`
    tc += "<th>"
    tc += `Currency`
    tc += "<th>"
    tc += `Create Date`
    tc += "</th>"
    td += "</button>"
    td += `<button type="clear" id="clear">`
    td += "Cancel"
    td += "</button>"
    tb += inputCurrent.value;
    tAA += "<h3>Result:</h3>"
  
   const res = await fetch(`http://localhost:4500/API3/Test?STORE_CD=${inputStore.value}&PROD_CD=${inputPROD.value}&Currency=${inputCurrent.value}`)  
   .then(res => {return res.json()})
   .then(data => {   if(data.length > 0){
    data.forEach((item) => {
            
        ta += "<tr><td>";
        ta += item.PRODUCT_CODE;
        ta += "<td>";
        ta += item.PRODUCT_NAME;
        ta += "<td>";
        ta += item.PACKAGE_SIZE;
        ta += "<td>";
        ta += parseFloat(item.PRODUCT_RETAIL_USD).toLocaleString("en",{minimumFractionDigits:4});
        ta += "<td>";
        ta += parseFloat(item.PRODUCT_RETAIL_THB).toLocaleString("en",{minimumFractionDigits:4});
        ta += "<td>";
        ta += parseFloat(item.RATE_1_USD_THB).toLocaleString("en",{minimumFractionDigits:4});
        ta += "<td>";
        ta += parseFloat(item.PRODUCT_RETAIL_Currency).toLocaleString("en",{minimumFractionDigits:4});
        ta += "<td>";
        ta += parseFloat(item.RATE_1_USD_Currency).toLocaleString("en",{minimumFractionDigits:4});
        ta += "<td>";
        ta += item.EX_TO;
        ta += "<td>";
        ta += item.CREATE_DATE;
        ta += "</td></tr>";

        


    })
    console.log(ta)
    
    document.getElementById("bb").innerHTML = tc;
    document.getElementById("CC").innerHTML = tb;
    document.getElementById("DD").innerHTML = tb;
    document.getElementById("tbody").innerHTML = ta;
    document.getElementById("cc").innerHTML = td;
    document.getElementById("AA").innerHTML = tAA;

    
  


}})
}
