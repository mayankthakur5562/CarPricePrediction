import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Search,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function About() {
  return (
    <>
      <style>{`
        .about-page {
          background: #f7f8fc;
          color: #172033;
        }

        .about-container {
          max-width: 1120px;
          margin: auto;
          padding: 0 20px;
        }

        .about-hero {
          padding: 70px 0;
          background: white;
          text-align: center;
        }

        .about-label {
          color: #5b50d6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .about-hero h1 {
          max-width: 760px;
          margin: 13px auto;
          font-size: 43px;
          line-height: 1.15;
        }

        .about-hero h1 span {
          color: #5b50d6;
        }

        .about-hero p {
          max-width: 650px;
          margin: auto;
          color: #788294;
          font-size: 14px;
          line-height: 1.8;
        }

        .about-intro {
          padding: 70px 0;
        }

        .about-intro-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 55px;
          align-items: center;
        }

        .about-image {
          height: 390px;
          overflow: hidden;
          border-radius: 17px;
          background: #ddd;
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-content > span {
          color: #5b50d6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .about-content h2 {
          margin: 12px 0 15px;
          font-size: 32px;
          line-height: 1.25;
        }

        .about-content p {
          color: #70798b;
          font-size: 13px;
          line-height: 1.8;
        }

        .about-list {
          display: grid;
          gap: 12px;
          margin: 22px 0;
        }

        .about-list div {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 12px;
          font-weight: 600;
        }

        .about-list svg {
          color: #43a56b;
        }

        .about-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 12px 17px;
          border-radius: 8px;
          background: #5b50d6;
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
        }

        .about-process {
          padding: 70px 0;
          background: white;
        }

        .about-heading {
          max-width: 650px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .about-heading span {
          color: #5b50d6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .about-heading h2 {
          margin: 10px 0;
          font-size: 31px;
        }

        .about-heading p {
          color: #788294;
          font-size: 13px;
          line-height: 1.7;
        }

        .about-process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .about-process-card {
          padding: 25px;
          border: 1px solid #e4e6ec;
          border-radius: 13px;
          background: #fafbfc;
        }

        .about-process-icon {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 9px;
          background: #f0efff;
          color: #5b50d6;
        }

        .about-process-card h3 {
          margin: 0 0 8px;
          font-size: 15px;
        }

        .about-process-card p {
          margin: 0;
          color: #7b8495;
          font-size: 11px;
          line-height: 1.7;
        }

        .about-use {
          padding: 70px 0;
        }

        .about-use-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .about-use-card {
          padding: 27px;
          border-radius: 13px;
          background: #171b2b;
          color: white;
        }

        .about-use-card svg {
          color: #aaa5ff;
        }

        .about-use-card h3 {
          margin: 15px 0 8px;
          font-size: 16px;
        }

        .about-use-card p {
          margin: 0;
          color: #aeb5c5;
          font-size: 12px;
          line-height: 1.7;
        }

        .about-note {
          margin-top: 35px;
          padding: 20px;
          border: 1px solid #e3e5ea;
          border-radius: 11px;
          background: white;
        }

        .about-note strong {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
        }

        .about-note p {
          margin: 0;
          color: #788294;
          font-size: 11px;
          line-height: 1.7;
        }

        @media (max-width: 850px) {
          .about-intro-grid {
            grid-template-columns: 1fr;
          }

          .about-process-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-use-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 550px) {
          .about-hero h1 {
            font-size: 34px;
          }

          .about-process-grid {
            grid-template-columns: 1fr;
          }

          .about-image {
            height: 280px;
          }
        }
      `}</style>

      <main className="about-page">

        <section className="about-hero">
          <div className="about-container">

            <div className="about-label">
              ABOUT AUTOPREDICT
            </div>

            <h1>
              A simple way to understand
              <span> your car's value.</span>
            </h1>

            <p>
              AutoPredict helps car owners get a quick estimated market
              value based on important information about their vehicle.
            </p>

          </div>
        </section>

        <section className="about-intro">
          <div className="about-container about-intro-grid">

            <div className="about-image">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.hTLVORUbyVJVbQ9Zc5tLVAHaEo?r=0&pid=Api&h=220&P=0"
                alt="Car"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div className="about-content">

              <span>WHY AUTOPREDICT</span>

              <h2>
                Make better decisions
                about your vehicle.
              </h2>

              <p>
                Whether you are planning to sell your car, looking for
                a used vehicle or simply want to understand its current
                market value, AutoPredict provides a convenient way to
                get an estimated price.
              </p>

              <div className="about-list">

                <div>
                  <CheckCircle2 size={18} />
                  Easy vehicle information
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  Quick price estimation
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  Simple and clear results
                </div>

              </div>

              <Link to="/predict" className="about-button">
                Check Car Price
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>
        </section>

        <section className="about-process">
          <div className="about-container">

            <div className="about-heading">
              <span>HOW AUTOPREDICT WORKS</span>

              <h2>
                From vehicle details to price estimate.
              </h2>

              <p>
                The process is designed to be simple so you can get
                an estimated value without complicated calculations.
              </p>
            </div>

            <div className="about-process-grid">

              <div className="about-process-card">
                <div className="about-process-icon">
                  <Search size={20} />
                </div>

                <h3>Enter Details</h3>

                <p>
                  Provide basic information about your car such as
                  model, year and fuel type.
                </p>
              </div>

              <div className="about-process-card">
                <div className="about-process-icon">
                  <CarFront size={20} />
                </div>

                <h3>Vehicle Information</h3>

                <p>
                  Your vehicle information is considered to estimate
                  its current market value.
                </p>
              </div>

              <div className="about-process-card">
                <div className="about-process-icon">
                  <TrendingUp size={20} />
                </div>

                <h3>Price Estimation</h3>

                <p>
                  AutoPredict calculates an estimated price based on
                  the available vehicle data.
                </p>
              </div>

              <div className="about-process-card">
                <div className="about-process-icon">
                  <CheckCircle2 size={20} />
                </div>

                <h3>View Result</h3>

                <p>
                  Get your estimated car value and use it as a
                  reference for your decision.
                </p>
              </div>

            </div>

          </div>
        </section>

        <section className="about-use">
          <div className="about-container">

            <div className="about-heading">
              <span>WHO CAN USE IT</span>

              <h2>
                Useful for different car decisions.
              </h2>
            </div>

            <div className="about-use-grid">

              <div className="about-use-card">
                <CarFront size={25} />

                <h3>Selling Your Car</h3>

                <p>
                  Get an estimated value to help you understand your
                  car's market position before selling.
                </p>
              </div>

              <div className="about-use-card">
                <Search size={25} />

                <h3>Buying a Used Car</h3>

                <p>
                  Use an estimated price as one reference while
                  evaluating a used vehicle.
                </p>
              </div>

              <div className="about-use-card">
                <TrendingUp size={25} />

                <h3>Checking Market Value</h3>

                <p>
                  Quickly check an estimated value when you simply
                  want to understand your vehicle's worth.
                </p>
              </div>

            </div>

            <div className="about-note">
              <strong>Important to know</strong>

              <p>
                The displayed price is an estimated value and should
                be treated as a reference. Actual vehicle prices may
                vary depending on condition, location, service history,
                ownership, demand and other market factors.
              </p>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}