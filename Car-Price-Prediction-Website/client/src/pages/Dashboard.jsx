import React, { useEffect, useState } from "react";
import {
  Activity,
  CarFront,
  Database,
  Gauge,
  RefreshCw,
  TrendingUp,
  BarChart3,
  IndianRupee,
} from "lucide-react";

import api from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [models, setModels] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsResponse, modelsResponse] = await Promise.all([
        api.get("/stats"),
        api.get("/models"),
      ]);

      setStats(statsResponse.data);
      setModels(modelsResponse.data);
    } catch (err) {
      console.error(err);

      setError(
        "We couldn't load the latest vehicle valuation information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <style>{`
        .dashboard-page {
          min-height: 100vh;
          padding: 55px 20px 80px;
          background: #f7f8fc;
          color: #172033;
        }

        .dashboard-container {
          max-width: 1180px;
          margin: auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .dashboard-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #5b50d6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .dashboard-header h1 {
          margin: 9px 0;
          font-size: 34px;
        }

        .dashboard-header p {
          margin: 0;
          color: #788294;
          font-size: 13px;
        }

        .dashboard-refresh {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 11px 15px;
          border: 1px solid #dfe2e9;
          border-radius: 8px;
          background: white;
          color: #30384a;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .dashboard-refresh:hover {
          border-color: #5b50d6;
          color: #5b50d6;
        }

        .dashboard-loading {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .dashboard-loading h3 {
          margin: 15px 0 5px;
        }

        .dashboard-loading p {
          color: #788294;
          font-size: 13px;
        }

        .loading-icon {
          color: #5b50d6;
          animation: dashboard-spin 1s linear infinite;
        }

        @keyframes dashboard-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .dashboard-alert {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 20px;
          padding: 13px 15px;
          border: 1px solid #f0d3d3;
          border-radius: 8px;
          background: #fff6f6;
          color: #b34242;
          font-size: 12px;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 25px;
        }

        .dashboard-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 25px;
        }

        .dashboard-info-card {
          display: flex;
          gap: 15px;
          padding: 22px;
          border: 1px solid #e3e5eb;
          border-radius: 13px;
          background: white;
        }

        .info-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #f0efff;
          color: #5b50d6;
        }

        .dashboard-info-card h3 {
          margin: 0 0 7px;
          font-size: 15px;
        }

        .dashboard-info-card p {
          margin: 0;
          color: #7a8394;
          font-size: 12px;
          line-height: 1.7;
        }

        .valuation-table-card {
          overflow: hidden;
          border: 1px solid #e2e4ea;
          border-radius: 14px;
          background: white;
        }

        .valuation-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 25px;
          border-bottom: 1px solid #eceef2;
        }

        .table-label {
          color: #5b50d6;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .valuation-table-header h2 {
          margin: 7px 0;
          font-size: 21px;
        }

        .valuation-table-header p {
          margin: 0;
          color: #7c8595;
          font-size: 12px;
        }

        .best-model {
          min-width: 150px;
          padding: 13px;
          border-radius: 9px;
          background: #f6f5ff;
        }

        .best-model span {
          display: block;
          margin-bottom: 5px;
          color: #7d8191;
          font-size: 10px;
        }

        .best-model strong {
          color: #5b50d6;
          font-size: 13px;
        }

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .valuation-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
        }

        .valuation-table th,
        .valuation-table td {
          padding: 15px 20px;
          text-align: left;
          border-bottom: 1px solid #eef0f3;
          font-size: 12px;
        }

        .valuation-table th {
          background: #fafbfc;
          color: #6e7789;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .model-name {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .model-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5b50d6;
        }

        .score-badge {
          display: inline-block;
          padding: 5px 8px;
          border-radius: 5px;
          background: #f0efff;
          color: #5b50d6;
          font-weight: 700;
        }

        .dashboard-cta {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 25px;
          padding: 25px;
          border-radius: 13px;
          background: #171b2b;
          color: white;
        }

        .dashboard-cta-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #292e43;
          color: #aaa5ff;
        }

        .dashboard-cta h3 {
          margin: 0 0 5px;
          font-size: 16px;
        }

        .dashboard-cta p {
          margin: 0;
          color: #aeb5c5;
          font-size: 12px;
        }

        .dashboard-cta-button {
          margin-left: auto;
          padding: 11px 16px;
          border-radius: 7px;
          background: white;
          color: #171b2b;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-info-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .dashboard-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .dashboard-stats {
            grid-template-columns: 1fr;
          }

          .valuation-table-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .dashboard-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .dashboard-cta-button {
            margin-left: 0;
          }
        }
      `}</style>

      <section className="dashboard-page">
        <div className="dashboard-container">

          {loading ? (
            <div className="dashboard-loading">
              <RefreshCw size={28} className="loading-icon" />
              <h3>Loading AutoPredict...</h3>
              <p>
                Preparing vehicle valuation information.
              </p>
            </div>
          ) : (
            <>
              <div className="dashboard-header">
                <div>
                  <div className="dashboard-label">
                    <CarFront size={15} />
                    AUTOPREDICT
                  </div>

                  <h1>Vehicle Valuation Overview</h1>

                  <p>
                    Explore vehicle data and price estimation information
                    in one place.
                  </p>
                </div>

                <button
                  className="dashboard-refresh"
                  onClick={loadDashboard}
                  type="button"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>

              {error && (
                <div className="dashboard-alert">
                  <Activity size={17} />
                  {error}
                </div>
              )}

              {stats && (
                <div className="dashboard-stats">
                  <StatCard
                    icon={<Database />}
                    value={stats.rows}
                    label="Vehicle Records"
                  />

                  <StatCard
                    icon={<BarChart3 />}
                    value={stats.columns}
                    label="Vehicle Features"
                  />

                  <StatCard
                    icon={<Gauge />}
                    value={stats.best_model}
                    label="Active Valuation Model"
                  />

                  <StatCard
                    icon={<IndianRupee />}
                    value={`₹${Number(
                      stats.average_price || 0
                    ).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}`}
                    label="Average Vehicle Price"
                  />
                </div>
              )}

              <div className="dashboard-info-grid">

                <div className="dashboard-info-card">
                  <div className="info-icon">
                    <CarFront size={21} />
                  </div>

                  <div>
                    <h3>Vehicle Valuation</h3>
                    <p>
                      AutoPredict uses important vehicle details to
                      estimate a car's market value.
                    </p>
                  </div>
                </div>

                <div className="dashboard-info-card">
                  <div className="info-icon">
                    <TrendingUp size={21} />
                  </div>

                  <div>
                    <h3>Price Insights</h3>
                    <p>
                      View available valuation model information and
                      understand the price estimation process.
                    </p>
                  </div>
                </div>

              </div>

              {models && (
                <div className="valuation-table-card">

                  <div className="valuation-table-header">
                    <div>
                      <div className="table-label">
                        PRICE ESTIMATION
                      </div>

                      <h2>Valuation Model Overview</h2>

                      <p>
                        Comparison of the models used for vehicle
                        price estimation.
                      </p>
                    </div>

                    <div className="best-model">
                      <span>Current model</span>
                      <strong>{models.best_model}</strong>
                    </div>
                  </div>

                  <div className="table-wrapper">
                    <table className="valuation-table">
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Price Error (MAE)</th>
                          <th>RMSE</th>
                          <th>Accuracy Score (R²)</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Object.entries(models.results || {}).map(
                          ([name, value]) => (
                            <tr key={name}>
                              <td>
                                <div className="model-name">
                                  <span className="model-dot"></span>
                                  <strong>{name}</strong>
                                </div>
                              </td>

                              <td>
                                {Number(value.mae).toFixed(2)}
                              </td>

                              <td>
                                {Number(value.rmse).toFixed(2)}
                              </td>

                              <td>
                                <span className="score-badge">
                                  {Number(value.r2).toFixed(4)}
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              <div className="dashboard-cta">
                <div className="dashboard-cta-icon">
                  <CarFront size={25} />
                </div>

                <div>
                  <h3>Want to know what your car is worth?</h3>
                  <p>
                    Enter your vehicle details and get an estimated price.
                  </p>
                </div>

                <a
                  href="/predict"
                  className="dashboard-cta-button"
                >
                  Check Car Price
                </a>
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}