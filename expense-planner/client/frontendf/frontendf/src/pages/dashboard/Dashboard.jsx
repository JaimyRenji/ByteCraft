import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [spendByCategory, setSpendByCategory] = useState({});
  const [dailySpending, setDailySpending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = '688b0bfbcab5132c46abfaf2'; // Replace with actual logic

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categoryRes, dailyRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/expenses/stats/${userId}`),
          axios.get(`http://localhost:5000/api/expenses/daily-stats/${userId}`)
        ]);

        setSpendByCategory(categoryRes.data.spendByCategory || {});
        setDailySpending(dailyRes.data.dailySpending || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = {
    labels: Object.keys(spendByCategory),
    datasets: [
      {
        label: 'Spending',
        data: Object.values(spendByCategory),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#82CA9D',
          '#9B59B6', '#F39C12', '#16A085', '#2ECC71'
        ]
      }
    ]
  };

  const lineData = {
    labels: dailySpending.map(item => item._id),
    datasets: [
      {
        label: 'Daily Expenses',
        data: dailySpending.map(item => item.total),
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.2
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h3>Spending Summary</h3>

      <div className="nav-buttons">
        <button onClick={() => navigate('/expense')}>Track Expense</button>
        <button onClick={() => navigate('/history')}>View History</button>
        <button onClick={() => navigate('/budget')}>Set Budget</button>
      </div>

      <div className="chart-section">
        {loading ? (
          <p>Loading chart...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {Object.keys(spendByCategory).length > 0 ? (
              <div className="chart-card">
                <h4>Spending by Category</h4>
                <Pie data={pieData} />
              </div>
            ) : (
              <p>No expenses recorded yet.</p>
            )}

            {dailySpending.length > 0 && (
              <div className="chart-card">
                <h4>Daily Spending Over Time</h4>
                <Line data={lineData} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;


