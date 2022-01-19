$(document).ready(function(){
    $("button").on("click", function(){

        $("#weather").show()
        

        if($("#select").val() == "today"){

            $("#weather").html(" ")

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${$("#town").val()}&appid=65570e5daf33353e876ac137c0fe457f`

            $.get(url, function(data){
                dataJSON = JSON.stringify(data);
                console.log(dataJSON);
    
                let town = $("<h1></h1>")
                town.text(data.name)
                
                let img = $("<img>")
                let urlimg = "http://openweathermap.org/img/wn/10d.png"
                img.attr("src", urlimg)
                img.appendTo(town)
    
                let temperature = $("<h4></h4>")
                temperature.text("Temperature: " +(data.main.temp-273.15).toFixed(0) + "°")
    
                let fl = $("<h4></h4>")
                fl.text("Feels like: " + (data.main.feels_like-273.15).toFixed(0)+ "°")
    
                let min = $("<h4></h4>")
                min.text("Minimum: " + (data.main.temp_min-273.15).toFixed(0)+ "°")
    
                let max = $("<h4></h4>")
                max.text("Maximum: " + (data.main.temp_max-273.15).toFixed(0) + "°")
                
                let vis = $("<h4></h4>")
                vis.text("Visibility: " + data.visibility +" meters")
                
                let hum = $("<h4></h4>")
                hum.text("Humidity: " + data.main.humidity + "%")

                let hr = $("<hr>")
                
                $("#weather").css({
                    border: "teal solid 2px",
                    width:"300px"
                })
                $("#weather").append(town,hr, temperature, fl, min, max, hum,vis)
            })
        } else{
            $("#weather").html(" ")
            let url = `http://api.openweathermap.org/data/2.5/forecast?q=${$("#town").val()}&appid=65570e5daf33353e876ac137c0fe457f`

            $.get(url, function(data){
                console.log(data)

                for (let i = 0; i < 6; i++){
                    $("<div></div>").addClass("day"+(i+1)).addClass("day").appendTo("#weather")
                }
                let n = 1;
                let d = data.list[0].dt_txt.slice(0, 10);
                console.log(d);

                $(".townname").text(data.city.name)

                let img = $("<img>")
                let urlimg = "http://openweathermap.org/img/wn/10d.png"
                img.attr("src", urlimg)
                $(".townname").append(img)


                for(let day of data.list){
                    if (d != day.dt_txt.slice(0, 10)) {
                        d = day.dt_txt.slice(0, 10);
                        n++;
                    }
                    let block = $(".day"+n)
                    let div5 = $("<div></div>")

                    div5.css({
                        width: "300px",
                        border: "black 1px dotted",
                    })


                    let DAY = $("<p></p>")
                    DAY.text(day.dt_txt) 
                    

                    let temperature = $("<h4></h4>")
                    temperature.text("Temperature: " +(day.main.temp-273.15).toFixed(0) + "°")
        
                    let fl = $("<h4></h4>")
                    fl.text("Feels like: " + (day.main.feels_like-273.15).toFixed(0)+ "°")
        
                    let min = $("<h4></h4>")
                    min.text("Minimum: " + (day.main.temp_min-273.15).toFixed(0)+ "°")
        
                    let max = $("<h4></h4>")
                    max.text("Maximum: " + (day.main.temp_max-273.15).toFixed(0) + "°")
                    
                    let vis = $("<h4></h4>")
                    vis.text("Visibility: " + day.visibility +" meters")
                    
                    let hum = $("<h4></h4>")
                    hum.text("Humidity: " + day.main.humidity + "%")

            
                    div5.append( DAY, temperature, fl, min, max, hum,vis)

                    $("#weather").css({
                        display: "grid"
                    })

                    block.append(div5)
                }
            })
        }
    })
})