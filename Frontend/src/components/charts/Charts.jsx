import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../Api/axios";  // Import the API utility you already created

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await api.get("api/transactions/");
        const transactions = response.data;

        // Extract and format the transaction data for the bar chart
        const transactionAmounts = transactions.map(transaction => transaction.total_amount);
        const transactionsLabels = transactions.map(transaction => `Transaction ${transaction.id}`);
        setTransactionData({
          labels: transactionsLabels,
          datasets: [
            {
              label: "Transaction Amounts (in rupees)",
              data: transactionAmounts,
              backgroundColor: ["#4caf50", "#2196f3", "#ff5722"],
              borderColor: ["#388e3c", "#1976d2", "#d84315"],
              borderWidth: 1,
            },
          ],
        });

        // Extract and format the product data for the bar chart
        const products = [];
        const productQuantities = [];

        transactions.forEach(transaction => {
          transaction.items.forEach(item => {
            if (!products.includes(item.name)) {
              products.push(item.name);
              productQuantities.push(item.quantity);
            }
          });
        });

        setProductData({
          labels: products,
          datasets: [
            {
              label: "Quantities Purchased",
              data: productQuantities,
              backgroundColor: ["#4caf50", "#2196f3", "#ff5722", "#ffc107", "#9c27b0", "#00bcd4"],
              borderColor: ["#388e3c", "#1976d2", "#d84315", "#ffb300", "#7b1fa2", "#008394"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color:"#fff",
          font: {
            size: 14,
          },
        },
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div>
      <span className="m-20 text-4xl font-bold font-sans">Visualize Your Transactions </span>
      <div className="flex justify-center items-center m-20 gap-20">
        {/* Transaction Amounts Chart */}
        <div style={{ width: "60%", height: "400px", marginBottom: "20px" }}>
          {transactionData ? (
            <Bar
              data={transactionData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: { display: true, text: "Alice Smith's Transactions" },
                },
              }}
            />
          ) : <p>Loading transaction data...</p>}
        </div>

        {/* Products Purchased Chart */}
        <div style={{ width: "60%", height: "400px" }}>
          {productData ? (
            <Bar
              data={productData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: { display: true, text: "Products Purchased by Alice Smith" },
                },
              }}
            />
          ) : <p>Loading product data...</p>}
        </div>
      </div>
    </div>
  );
};

export default Charts;
