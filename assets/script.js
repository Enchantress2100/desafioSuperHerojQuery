$(document).ready(function () {
  $('#buscar').click(function (e) { 
    e.preventDefault();
    let numero=parseInt($('#numero').val());
    console.log(numero)
    if (isNaN(numero)|| numero <1 || numero > 731) {
      alert("debe escribir un número desde 1 hasta 731")
      }
    llamarAPI(numero)
    });

    const llamarAPI = numero =>{  
        $.ajax({
          type: 'get',
          url: `https://www.superheroapi.com/api.php/10225686259401018/${numero}`,
          dataType: "json",
          success: function (response) {
            $('#HeroPicture').attr("src",response.image.url);
            $('#HeroPicture').attr("alt",response.name);
            $('#name').text(response.name);
            $('#connections').text(response.connections["group-affiliation"])
            $('#published').text(response.biography.publisher)
            $('#occupation').text(response.work.occupation)
            $('#first').text(response.biography["first-appearance"])
            $('#height').text(response.appearance.height)
            $('#weight').text(response.appearance.weight)
            $('#aliases').text(response.biography.aliases)
            grafico(response)
          }
        })
    }
    function grafico (response) {
      console.log(response.powerstats.intelligence)
      var options = {
        animationEnabled: true,
        title: {
          text: 'Estadísticas de poder para ' +response.name
        },
        axisY: {
          title: "Label"
        },
        axisX: {
          title: "Powerstats"
        },
        data: [{
          type: "column",
          dataPoints: [
            { label: "Intelligence", y: parseInt(response.powerstats.intelligence)},	
            { label: "Strength", y: parseInt(response.powerstats.strength)},	
            { label: "Speed", y: parseInt(response.powerstats.speed)},
            { label: "Durability", y: parseInt(response.powerstats.durability)},	
            { label: "Power", y: parseInt(response.powerstats.power)},
            { label: "Combat", y: parseInt(response.powerstats.combat)}	
          ]
        }]
      };
      $("#chartContainer").CanvasJSChart(options);
      } 
});