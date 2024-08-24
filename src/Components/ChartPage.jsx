import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from 'chart.js';

// Register components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  Filler
);
import {useLocation,useNavigate} from 'react-router-dom'; 
const ComplexityGraph = ({timeComplexity,value }) => {
  const location=useLocation();
  const navigate=useNavigate();
  console.log(timeComplexity);
   const labels = Array.from({ length: 30 }, (_, i) => i + 1);
  if(timeComplexity=="O(n)"){
    value=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  } else if(timeComplexity=="O(n log n)"){
      let array=[];
      for(let i=0;i<21;i++){
        array[i]=i*(Math.log(i));
      }
      value=array;
  }else if(timeComplexity=="O(n^2)"){
    value=[0,1,4,9,16,25,36,49,64,81,100,121,144,169,196];
  }else if(timeComplexity=="O(2^n)"){
    value=[0,1,2,4,8,16,32,64,128,256,512];
  }
  else if(timeComplexity=="O(n!)"){
    value=[0,1,2,6,24,120,720];
  }else if (timeComplexity=="O(log n)"){
    let array=[];
    for(let i=0;i<18;i++){
      array[i]=Math.log(i);
    }
    value=array;
  }else if(timeComplexity=="O(n^3)"){
    value=[0,1,8,27,64,125,216,343,512,729,1000,1331,1728,2197,2744];
  }
  const data = {
    labels,
    datasets: [
      {
        label: timeComplexity,
        data: value,
        fill: false,
        borderWidth: 1.5,
        borderColor: 'white',
        tension: 0.01,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        
        position: 'bottom',
        title: {
          display: true,
          text: 'Input Size (n)',
          color: 'white',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: 'white',
          beginAtZero: true,
          font: {
            size: 0,
          },
          stepSize: 10,
        },
        grid: {
          color: '#333', // Grid line color
        },
        border: {
          color: 'white', // Color of y-axis border
          width: 1, // Width of y-axis border
        },
      },
      y: {
        title: {
          display: true,
          text: 'Time Complexity',
          color: 'white',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: 'white',
          beginAtZero: true,
          font: {
            size: 0,
          },
          // Adjust the step size to increase the number of ticks
        },
        
        grid: {
          color: '#333', // Grid line color
        },
        border: {
          color: 'white', // Color of y-axis border
          width: 1, // Width of y-axis border
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Disable the legend to focus on custom line labels
      },
      annotation: {
        annotations: [],
      },
    },
  };

  // Custom plugin to add labels in the middle of the lines
  ChartJS.register({
    id: 'customLabel',
    afterDatasetsDraw(chart) {
      const { ctx, chartArea: { top, right, bottom, left }, scales: { x, y } } = chart;

      const dataset = chart.data.datasets[0];
      const data = dataset.data;
      if (data.length < 2) return; // Skip if not enough data points

      const midpointIndex = Math.floor(data.length-3);
      const midpointData = data[midpointIndex];

      // Calculate the pixel positions of the midpoint
      const xPosition = x.getPixelForValue(midpointIndex + 1); // +1 because index is zero-based
      const yPosition = y.getPixelForValue(midpointData);

      ctx.fillStyle = 'white';
      ctx.font = 'px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Offset to avoid overlap with the line
      const offsetX = 10; // Adjust as needed
      const offsetY = -10; // Adjust as needed

      ctx.fillText(dataset.label, xPosition + offsetX, yPosition + offsetY);

      // Add top label
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const topLabel = 'Time Complexity Analysis';
      ctx.fillText(topLabel, (right + left) / 2, top-20); // Adjust Y position as needed
    },
  });

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', width: '400px', height: '350px',color:'white',borderRadius: '20px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
      <Line data={data} options={options}/>
    </div>
  );
};

export default ComplexityGraph;