import React from "react";
import { Chart } from "react-google-charts";

export const options = {
    title: "Genres Statistics",
    titleTextStyle: {
        color: 'white',
        fontSize: 25,
        bold: true, 
    },
    width: '30vw',
    height: 400,
    backgroundColor: '#0d0d0d',
    chartArea: {'width': '80%', 'height': '80%'},
    legend: {
        textStyle: { color: 'white' }
   },
};

function Piechart(props) {
  return (
    <Chart
      chartType="PieChart"
      data={props.data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
export default Piechart;
