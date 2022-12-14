const url = "https://les-sels.ml/api/days/",
    averagesEndPoint = "https://les-sels.ml/api/averages/",
    callback = "https://raw.githubusercontent.com/0x454d505459/les-sels/stats/data.json";

const numformater = new Intl.NumberFormat('fr', {notation: 'compact'});
const timeformater = new Intl.RelativeTimeFormat('fr', {style: "long"});

let diff = new Date() - new Date("09/05/2022");

// Elements
const percent = document.querySelector(".percent"),
    number = document.querySelector(".number h2"),
    nbSachets = document.querySelector("input"),
    objectifInput = document.querySelectorAll("input")[1];

// objectif en grammes
var objectif = 5000,
    sachets = 1065,
    average = 80;

function setProgress(prg) {
    percent.style.setProperty("--prg", prg);
    number.innerHTML = `${prg}<span>%</span>`;
}

function setvalue(value, data) {
    document.querySelector(`.card:nth-child(${value}) h2`).innerHTML = data;
}

function setvalue2(value, data) {
    document.querySelectorAll(`.card h2`)[value].innerHTML = data;
}

function setNbSachets(n) {
    sachets = n;
    // setvalue(2, n);
    nbSachets.value = n;
    setvalue(5, numformater.format((n * 0.8).toFixed(1)) + "g");
    let progress = (((n * 100) / objectif) * 0.8).toFixed(1);
    setProgress(progress);
    setvalue(7, objectif / 0.8 - sachets);
    setvalue(9, ((1.69 / 100) * n).toFixed(2) + " €");
}

function setObjectif(n) {
    objectif = n;
    // setvalue(4, n + "g");
    objectifInput.value = n + "g";
}

function setAverage(n) {
    setvalue(6, n);
    average = n;
}

function setAverages(averages) {
    for (let i = 0; i < averages.length; i++) {
        setvalue2(i + 8, averages[i]);
    }
}

function estimationEnding(remaning) {
    const month = [
        "Jan.",
        "Fév.",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juil.",
        "Aout",
        "Sept.",
        "Oct.",
        "Nov.",
        "Déc.",
    ];
    let e = objectif / 0.8 / remaning;
    e = e + 2 * Math.round(e / 7);
    let nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + e);
    setvalue2(7, nowDate.getDate() + " " + month[nowDate.getMonth()] + " " + nowDate.getFullYear());
}

nbSachets.addEventListener("change", () => {
    if (nbSachets.value.match(/\d+/g)) {
        setNbSachets(nbSachets.value);
        nbSachets.style.color = "white";
    } else {
        nbSachets.style.color = "red";
    }
});

objectifInput.addEventListener("change", () => {
    if (objectifInput.value.match(/\d/g)) {
        setObjectif(objectifInput.value);
        objectifInput.style.color = "white";
        setNbSachets(sachets);
    } else {
        objectifInput.style.color = "red";
    }
});

function updateData() {
    console.info("Fetching /api/averages/");
    fetch(averagesEndPoint).then((d) => d.json()).then((data) => {
        setAverages([
            data["average_monday"],
            data["average_tuesday"],
            data["average_wednesday"],
            data["average_thursday"],
            data["average_friday"],
        ]);
        setAverage(((data["average_monday"] + data["average_tuesday"] + data["average_wednesday"] + data["average_thursday"] + data["average_friday"]) / 5).toFixed(1));
    }).catch((err) => {
        console.log(err);
        let e = document.getElementById("error")
        e.style.cssText = `
        margin-block: 10px;
        padding: 10px;
        background-color: #ff5c5c;
        color: white;
        border-radius: 10px;`
        e.innerHTML = "Erreur lors de la récupération des données : " + err;
    });
    // // fetch for callback url
    // fetch(callback)
    // .then(d => d.json())
    // .then(data => {
    // setObjectif(data["objectif"]);
    // setvalue(8, data["prochainObjectif"]);
    // setNbSachets(data["nombreSachets"]);
    // setAverage(data["moyenne"]);
    // setAverages(data["moyennes"]);
    // }).catch(err => console.log(err));
    console.info("Fetching /api/days/");
    fetch(url).then((d) => d.json()).then((data) => {
        sachets = 0;
        graph1.clear();
        graph2.clear();
        dates = [];
        graph2.data.datasets[0].data = [];
        for (let i = 0; i <= data.length - 1; i++) {
            let sel = parseInt(Object.values(data[i])[0]["count"]["sel_midi"]) + parseInt(Object.values(data[i])[0]["count"]["sel_soir"]);
            sachets += sel;
            dates.push(Object.keys(data[i])[0]);
            graph1.data.datasets[0].data.push(sel);
            graph2.data.datasets[0].data.push(sachets);
        }
        // console.log(graph1.data.datasets[0].data);
        graph1.data.labels = dates;
        graph2.data.labels = dates;
        graph1.update();
        graph2.update();
        setObjectif(objectif);
        setNbSachets(sachets);
        estimationEnding(objectif / 0.8 - sachets);
    });

    console.info("Data updated successfully");

}

let cross = document.getElementById("cross");
cross.onclick = function () {
    document.getElementById("info").remove()
}

setvalue(3, timeformater.format(Math.round(- diff / (1000 * 60 * 60 * 24)), "days"));
updateData();

// graph1.data.labels = ["09/09/2022","12/09/2022","13/09/2022","14/09/2022","15/09/2022","16/09/2022 (Midi)","19/09/2022","20/09/2022","21/09/2022","22/09/2022","23/09/2022 (Midi)","26/09/2022","27/09/2022","28/09/2022","29/09/2022","30/09/2022 (Midi)", "30/09/2022 (Midi)", "30/09/2022 (Midi)"];
// graph1.update();
