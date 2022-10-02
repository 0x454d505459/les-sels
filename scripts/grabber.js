const url = "https://raw.githubusercontent.com/0x454d505459/les-sels/stats/data.json";

// Elements
const 
  percent = document.querySelector(".percent"),
  number = document.querySelector(".number h2");

// objectif en grammes  
var objectif = 1000

function setProgress(prg) {
  percent.style.setProperty("--prg", prg);
  number.innerHTML = `${prg}<span>%</span>`;
}

function setvalue(value, data) {
  document.querySelector(`.card:nth-child(${value}) h2`).innerHTML = data;

}

function setvalue2(value,data) {
  document.querySelectorAll(`.card h2`)[value].innerHTML = data;
}

function setNbSachets(n) {
  setvalue(2,n);
  setvalue(5, (n*0.8).toFixed(1) + "g");
  let progress = (((n*100)/objectif)*0.8).toFixed(1);
  setProgress(progress);
  setvalue(8, Math.round(((100 - progress)/100)*objectif)); // Incorrect
}

function setObjectif(n) {
  objectif = n
  setvalue(4,n+"g");
}

function setAverage(n) {
  setvalue(7, n)
}

function setAverages(averages) {
  for (let i = 0; i < averages.length; i++) {
    setvalue2(i+8, averages[i])
  } 
}

function updateData() {
  fetch(url)
  .then(d => d.json())
  .then(data => {
    setObjectif(data["objectif"]);
    setvalue(9, data["prochainObjectif"]);
    setNbSachets(data["nombreSachets"]);
    setAverage(data["moyenne"]);
    setAverages(data["moyennes"]);
  }).catch(err => {
    console.log(err)
  });
}
updateData();