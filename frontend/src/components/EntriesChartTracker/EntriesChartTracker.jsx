import { React, useEffect, useState} from 'react';
import { Chart } from "react-google-charts";

const EntriesChartTracker = (props) => {
// reference from React Google Chart - Bar
    let options = {}
    if(props.chartType === 'PieChart') {
      options = {
        title: "Number of Set(s) in each Theme",
        colors: ['#0363BF'],
      };
    } else {
        options = {
            chart: {title: "Number of Set(s) in each Theme",},
            colors: ['#0363BF'],
          };
    }

    
      const [chartData, setChartData] = useState([]);

    useEffect(() => {
        let tempChartData = props.entries.map (
            entry => {
                return [entry.theme, entry.count];
            }
        );
        setChartData(tempChartData);
    }, [])
    
    return (
    <Chart
        chartType={props.chartType}
        width="100%"
        height="350px"
        data={[["Theme", "Number of sets"], ...chartData]}
        options={options}
      />
);
}
 
export default EntriesChartTracker;