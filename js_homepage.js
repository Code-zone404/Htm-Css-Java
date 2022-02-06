const stcks = ["stck1","stck2","stck3"] //stock Id names here 
const prices = ["price1","price2","price3"] //price Id here
const holdings = ["hold1","hold2","hold3"] // holdings id here
const sell = ["sell1","sell2","sell3"] // sell buttons id
function total_money(){
    let total=0;
    for (let index = 0; index < stcks.length; index++) {
        var price = parseInt(document.getElementById(prices[index]).textContent)
        total = total + (parseInt(document.getElementById(stcks[index]).value)*price)
    }
    check(total)
}
function check(total_amount)
{
    let mymoney = parseInt(document.getElementById("mymoney").textContent)
    if(mymoney<total_amount){
        alert("Insufficient Balance...")
    }
    else{
        alert("Your charge: "+total_amount)
        transaction(total_amount,mymoney)
    }
}
function change(){
    for (let index = 0; index < prices.length; index++) {
        var price = parseInt(document.getElementById(prices[index]).textContent)
        document.getElementById(prices[index]).innerHTML=price_change(price)
    }
}
function price_change(price){
    let new_price,num;
    if(Math.floor(Math.random()*2)){
        num = Math.floor(Math.random()*51)
    }
    else
    {
        num = Math.floor(Math.random()*51)*(-1)
    }
    new_price = parseInt(price)+parseInt(num);
    return new_price
}
function transaction(total){
    balance = parseInt(document.getElementById("mymoney").textContent)
    document.getElementById("mymoney").innerHTML=balance-total
    logs()
}
var intervalId = window.setInterval(function(){
    change()
}, 3000);

function logs(){
    var name = document.getElementById("name").value
    var stock,amount,number,data
    for (let index = 0; index < stcks.length; index++) {
        if(parseInt(document.getElementById(stcks[index]).value)>0){
            stock=stcks[index]
            amount=document.getElementById(prices[index]).textContent
            number=document.getElementById(stcks[index]).value
            data = name+" bought "+number+" "+stcks[index]+" for "+amount
            document.getElementById("final_data").innerHTML+=data+"<br>"
        }
    }
    update()
}
// ------------- PORTFOLIO -------------
function update(){
    let user = document.getElementById("name").value
    document.getElementById("user").innerHTML=user
    for (let index = 0; index < holdings.length; index++) {
        number=document.getElementById(stcks[index]).value
        document.getElementById(holdings[index]).innerHTML=parseInt(document.getElementById(holdings[index]).innerHTML)+parseInt(number)
    }
}
function sold(clicked_id){
    for(let i=0;i<holdings.length;i++){
        if(clicked_id == sell[i]){
            if(holdings_check(i)){
                document.getElementById(holdings[i]).innerHTML= parseInt(document.getElementById(holdings[i]).innerHTML)-1
                document.getElementById("mymoney").innerHTML=parseInt(document.getElementById("mymoney").textContent)+parseInt(document.getElementById(prices[i]).textContent)
            }
        }
    }
}
function holdings_check(index){
    if(parseInt(document.getElementById(holdings[index]).textContent)<=0){
        alert("No holdings found")
        return 0
    }
    else{
        if(confirm("Sell "+stcks[index]+" for "+parseInt(document.getElementById(prices[index]).textContent)))
        {return 1}
        return 0
    }
}