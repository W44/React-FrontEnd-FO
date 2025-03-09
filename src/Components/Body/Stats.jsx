import React, { useEffect, useState, useContext } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import AuthContext from "../Contexts/AuthContext";
import { MenuSelect, URL } from '../../Constants';
import { SidebarContext } from "../Contexts/SidebarContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

const Stats = () => {
  const { userId, token } = useContext(AuthContext);
  const menuCtx = useContext(SidebarContext);
  const [stats, setStats] = useState({ pastOrders: 0, currentOrders: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (menuCtx.Menu.MenuItem === MenuSelect.View_Stat) { // Run only when switching to View_Stat
      const fetchStats = async () => {
        try {
          setLoading(true);
          const response = await fetch(URL + `/api/v1/order/stats?userId=${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });

          if (!response.ok) {
            throw new Error('Server response caused an error');
          }

          const jsonData = await response.json();
          setStats(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [menuCtx.Menu]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff', // White legend text
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
        },
        ticks: {
          color: '#fff', // White axis text
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid lines
        },
        ticks: {
          color: '#fff', // White axis text
        },
      },
    },
  };

  // Data for Pie Chart
  const pieData = {
    labels: ["Past Orders", "Current Orders"],
    datasets: [
      {
        data: [stats.pastOrders, stats.currentOrders],
        backgroundColor: ["#4CAF50", "#FF9800"],
        borderColor: '#1e293b',
        borderWidth: 1,
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ["Past Orders", "Current Orders", "Total Orders"],
    datasets: [
      {
        label: "Orders",
        data: [stats.pastOrders, stats.currentOrders, stats.totalOrders],
        backgroundColor: ["#4CAF50", "#FF9800", "#3F51B5"],
        borderColor: '#1e293b',
        borderWidth: 1,
      },
    ],
  };

  // Data for Line Chart
  const lineData = {
    labels: ["Past", "Current", "Total"],
    datasets: [
      {
        label: "Orders Trend",
        data: [stats.pastOrders, stats.currentOrders, stats.totalOrders],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">📊 Order Statistics</h2>
      
     
      <div className="space-y-6">
        {/* Pie Chart Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">Order Distribution</h3>
          <div className="h-96">
            <Pie data={pieData} options={commonOptions} />
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">Order Count</h3>
          <div className="h-96">
            <Bar data={barData} options={commonOptions} />
          </div>
        </div>

        {/* Line Chart Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-4">Order Trend</h3>
          <div className="h-96">
            <Line data={lineData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;