var dates = [];


var graph1 = new Chart("graph1", {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
          label:"Récolte de Sel en fonction du temps",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          fill:false,
          data: []
        }]
      },
      options: {}
});

var graph2 = new Chart("graph2", {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
          label:"Sachets de Sel en fonction du temps",
          backgroundColor: "rgb(99, 255, 132)",
          borderColor: "rgb(99, 255, 132)",
          fill:false,
          data: []
        }]
      },
      options: {}
});