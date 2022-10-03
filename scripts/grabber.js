const 
  url = "http://les-sels.ml/api/days/",
  averagesEndPoint = "http://les-sels.ml/api/averages/",
  callback = "https://raw.githubusercontent.com/0x454d505459/les-sels/stats/data.json";


// Elements
const 
  percent = document.querySelector(".percent"),
  number = document.querySelector(".number h2");

// objectif en grammes  
var 
  objectif = 1000,
  sachets = 1065;

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
  sachets = n
  setvalue(2,n);
  setvalue(5, (n*0.8).toFixed(1) + "g");
  let progress = (((n*100)/objectif)*0.8).toFixed(1);
  setProgress(progress);
  setvalue(7, objectif/0.8-sachets); // Incorrect
  setvalue(9, ((1.69/100)*n).toFixed(2) + " €")
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
    setvalue2(i+10, averages[i])
  } 
}

function updateData() {
  fetch(averagesEndPoint)
  .then(d=>d.json())
  .then(data => {
    setAverages([data["average_monday"],data["average_tuesday"],data["average_wednesday"],data["average_thursday"],data["average_friday"]])
  }).catch(err => console.log(err))
  // // fetch for callback url
  // fetch(callback)
  // .then(d => d.json())
  // .then(data => {
  //   setObjectif(data["objectif"]);
  //   setvalue(8, data["prochainObjectif"]);
  //   setNbSachets(data["nombreSachets"]);
  //   setAverage(data["moyenne"]);
  //   setAverages(data["moyennes"]);
  // }).catch(err => console.log(err));
  fetch(url)
  .then(d=>d.json())
  .then(data=>{
    sachets = 0;
    graph1.data.datasets[0].data = [];
    graph2.data.datasets[0].data = [];
    dates = [];
    for (let i = data.length -1; i>=0;i--){
      let sel = parseInt(data[i]["sel"]);
      sachets += sel;
      dates.push(data[i]["date"]);
      graph1.data.datasets[0].data.push(sel);
      graph2.data.datasets[0].data.push(sachets);
    }
    // console.log(graph1.data.datasets[0].data);
    graph1.update();
    graph2.update();
    setNbSachets(sachets);
  });
  
}

updateData();

// graph1.data.labels = ["09/09/2022","12/09/2022","13/09/2022","14/09/2022","15/09/2022","16/09/2022 (Midi)","19/09/2022","20/09/2022","21/09/2022","22/09/2022","23/09/2022 (Midi)","26/09/2022","27/09/2022","28/09/2022","29/09/2022","30/09/2022 (Midi)", "30/09/2022 (Midi)", "30/09/2022 (Midi)"];
// graph1.update();