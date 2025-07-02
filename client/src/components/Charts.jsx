import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const [selectedRegion, setSelectedRegion] = useState('Central');
  const [chartData, setChartData] = useState(null);
  const regions = ['Central', 'East', 'West', 'North', 'South'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data/regional-prices');
        const data = await res.json();
        
        const filteredData = data.filter(item => item.Region === selectedRegion);
        const years = [...new Set(filteredData.map(item => item.Year))].reverse();
        const prices = filteredData.map(item => Number(item.Average_Price));

        setChartData({
          labels: years,
          datasets: [{
            label: `${selectedRegion} Region Average Prices`,
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedRegion]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="p-3 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Regional Price Analysis</h2>
      <select 
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        {regions.map(region => (
          <option key={region} value={region}>
            {region} Region
          </option>
        ))}
      </select>
      <Line data={chartData} />
    </div>
  );
}