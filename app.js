const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const country=document.querySelectorAll(".main-cat select");
const button=document.querySelector("form .btn")
const fromcurrency=document.querySelector(".from select");
const tocurrency=document.querySelector(".to select");

const msg=document.querySelector(".result .result-p");
for(let select of country){
for( item in countryList){
 
  let newopt=document.createElement("option");
  if(select.name==="from" && item==="USD"){
    newopt.selected="selected";
  }
  else if(select.name==="To" && item==="INR"){
    newopt.selected="selected";
  }
  newopt.innerText=item;
  newopt.value=item;
  select.append(newopt); 
}

     select.addEventListener('change',(eve)=>{
            updateFlag(eve.target);
     })
}

updateFlag=(eve)=>{
  console.log(eve.value);
  let currcode=eve.value;
  let countrycode=countryList[eve.value];
  let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  
  let newimg=eve.parentElement.querySelector("img");
  newimg.src=newsrc;
}

button.addEventListener('click',async(eve)=>{
     eve.preventDefault();
     let amount=document.querySelector(".amount");
     console.log(amount.value);
     if(amount.value<0){
      alert("Enter a valid Amount");
      amount.value=1;
     }
     console.log(fromcurrency.value);
     console.log(tocurrency.value);
   const newurl=`${BASE_URL}/${fromcurrency.value.toLowerCase()}/${tocurrency.value.toLowerCase()}.json`;

   let response=await fetch(newurl);
   let data= await response.json();
   console.log(data[tocurrency.value.toLowerCase()]);
   let money=data[tocurrency.value.toLowerCase()];
   let finalamount=money*(amount.value);
   console.log(finalamount);
   console.log(msg);
   msg.innerText=`${amount.value} ${fromcurrency.value} =  ${finalamount} ${tocurrency.value}`;

})
