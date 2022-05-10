const getDashboard = (arg) => `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Thermometer Arduino</title>
      <link rel="stylesheet" href="./css/style.css">
      <link href="./css/c3.css" rel="stylesheet">
      <script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
   </head>
   <body>
      <div id="chart"></div>
      <script src="./js/c3.js"></script>
      <script src="https://d3js.org/d3.v5.min.js" charset="utf-8"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.0/socket.io.js" integrity="sha512-/xb5+PNOA079FJkngKI2jvID5lyiqdHXaUUcfmzE0X0BdpkgzIWHC59LOG90a2jDcOyRsd1luOr24UCCAG8NNw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
       <script>
          const socket = io("ws://localhost:3000")
          
          const in_temp = []
          const out_temp = []
          
          socket.on('temperatures', (arg) => {
              if(arg._field === "in") {
                  in_temp.push(arg)
              } else if (arg._field === "out") {
                  out_temp.push(arg)
              }
              // arg.forEach(temp => {
              //     if(temp._field === "in") {
              //         in_temp.push(temp)
              //     } else if(temp._field === "out") {
              //         out_temp.push(temp)
              //     }
              // })
          })
          
          var chart = c3.generate({
             data: {
                  columns: [
                    ['in', 0, 22.3, 22.1, 20, 21, 20.0],
                    ['out', 0, 31.3, 28, 25, 27, 29]
                  ],
              axes: {
                data1: 'y',
                data2: 'y2'
              }
            }
      });
        console.log(in_temp)
        console.log(out_temp)
    </script>
   </body>
</html>
`

module.exports = getDashboard
