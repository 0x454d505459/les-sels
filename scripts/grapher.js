const dates = [
    "09/09/2022","12/09/2022","13/09/2022","14/09/2022","15/09/2022","16/09/2022 (Midi)","19/09/2022","20/09/2022","21/09/2022","22/09/2022","23/09/2022 (Midi)","26/09/2022","27/09/2022","28/09/2022","29/09/2022","30/09/2022 (Midi)",        ];


var grpah1 = new Chart("graph1", {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
          label:"Récolte de Sel en fonction du temps",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          fill:false,
          data: ["59","30","25","33","27","20","45","61","75","65","40","94","127","122","122","120",]
        }]
      },
      options: {}
});

var grpah2 = new Chart("graph2", {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
          label:"Sachets de Sel en fonction du temps",
          backgroundColor: "rgb(99, 255, 132)",
          borderColor: "rgb(99, 255, 132)",
          fill:false,
          data: ["59","89","114","147","174","194","239","300","375","440","480","574","701","823","945","1065",]
        }]
      },
      options: {}
});