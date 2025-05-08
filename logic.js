const baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
});

for(let select of dropdowns){
    for(let  countryCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=countryCode;
        newOption.value=countryCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let cntryCd=countryList[currCode];
    let newSrc=`https://flagsapi.com/${cntryCd}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
     let amtVal=amount.value;
     if(amtVal===""||amtVal<1){
         amtVal=1;
         amount.value="1";
        }

    const URL=`${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    const rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finAmount} ${toCurr.value}`
}