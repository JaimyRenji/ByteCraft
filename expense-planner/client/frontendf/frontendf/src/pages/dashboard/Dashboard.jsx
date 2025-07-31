import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const pieData = {
    labels: Object.keys(data.spendByCategory),
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
        data: Object.values(data.spendByCategory || {}),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#82CA9D', '#9B59B6'],
      },
    ],
  };


  const lineData = {
    labels: dailySpending.map(item => item._id),
    labels: data.dailySpend?.map((entry) => entry.date) || [],
    datasets: [
      {
        label: 'Daily Expenses',
        data: dailySpending.map(item => item.total),
        label: 'Daily Spending',
        data: data.dailySpend?.map((entry) => entry.amount) || [],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.2
      }
    ]
  };
        borderColor: '#4bc0c0',
      },
    ],
  };

  const totalExpenses = Object.values(data.spendByCategory || {}).reduce((a, b) => a + b, 0);

  const alerts = Object.entries(data.categoryBudgets || {}).filter(
    ([_, { spent, budget }]) => budget > 0 && spent / budget >= 0.8
  ).map(([category, { spent, budget }]) => {
    const percentage = ((spent / budget) * 100).toFixed(1);
    const isOverspent = spent > budget;
    return (
      <div key={category} className="alert">
        {isOverspent ? (
          <>You have <strong>overspent</strong> in <strong>{category}</strong>! (Spent: ₹{spent}, Budget: ₹{budget})</>
        ) : (
          <>You have used <strong>{percentage}%</strong> of your <strong>{category}</strong> budget! (Spent: ₹{spent}, Budget: ₹{budget})</>
        )}
      </div>
    );
  });

  return (
    <div className="dashboard-container">
      <h3>Spending Summary</h3>

      <div className="alerts-section">
        <h3>Budget Alerts</h3>
        {alerts.length > 0 ? alerts : <p className="no-alerts">No budget warnings</p>}
      </div>

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


