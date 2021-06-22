//Scroll all the way down on the payments page before using this script uwu

var arr = [];

for (let i = 0; i < document.getElementsByClassName("payments-card__amount_value").length; i++) {
  f = (document.getElementsByClassName("payments-card__amount_value")[i].innerText);
  //g = f.replace(" (VAT 20%)", "");
  h = f.split('(')[0];
  j = h.split('$')[1];
  console.log(j);
  arr.push(j);
}

function sum(a) {
  return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
}

console.log("You have spent " + (sum(arr).toFixed(2)) + " USD on Onlyfans!");
