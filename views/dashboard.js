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
       <script>
          console.log(${arg})
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
    </script>
   </body>
</html>
`

module.exports = getDashboard
