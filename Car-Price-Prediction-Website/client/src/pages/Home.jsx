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

export default function Home() {
  return (
    <>
      <style>{`
        .home-page {
          background: #f7f8fc;
          color: #172033;
        }

        .home-container {
          max-width: 1180px;
          margin: auto;
          padding: 0 20px;
        }

        /* HERO */
        .home-hero {
          padding: 75px 0;
          background: white;
        }

        .home-hero-grid {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 55px;
          align-items: center;
        }

        .home-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 20px;
          background: #f0efff;
          color: #5b50d6;
          font-size: 12px;
          font-weight: 700;
        }

        .home-hero h1 {
          margin: 18px 0;
          font-size: 52px;
          line-height: 1.08;
          letter-spacing: -1.5px;
        }

        .home-hero h1 span {
          color: #5b50d6;
        }

        .home-hero p {
          max-width: 580px;
          color: #70798b;
          font-size: 16px;
          line-height: 1.8;
        }

        .home-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }

        .home-btn-primary,
        .home-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .home-btn-primary {
          background: #5b50d6;
          color: white;
        }

        .home-btn-primary:hover {
          background: #4c42c2;
        }

        .home-btn-secondary {
          border: 1px solid #dddfea;
          color: #30384a;
          background: white;
        }

        .home-points {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 25px;
        }

        .home-points span {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #687185;
          font-size: 12px;
        }

        .home-points svg {
          color: #43a56b;
        }

        /* HERO CARD */
        .home-car-card {
          overflow: hidden;
          border-radius: 18px;
          background: #171b2b;
          color: white;
          box-shadow: 0 18px 45px rgba(20, 25, 45, 0.15);
        }

        .home-car-photo {
          height: 270px;
          overflow: hidden;
        }

        .home-car-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .home-car-info {
          padding: 22px;
        }

        .home-price-label {
          color: #aeb5c5;
          font-size: 11px;
        }

        .home-price {
          margin: 5px 0 18px;
          font-size: 30px;
        }

        .home-car-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding-top: 15px;
          border-top: 1px solid #30354a;
        }

        .home-car-details span {
          display: block;
          margin-bottom: 5px;
          color: #8f97aa;
          font-size: 10px;
        }

        .home-car-details strong {
          font-size: 12px;
        }

        /* FEATURES */
        .home-features {
          padding: 35px 0;
          background: #fff;
          border-top: 1px solid #eceef3;
          border-bottom: 1px solid #eceef3;
        }

        .home-feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .home-feature {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .home-feature-icon {
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

        .home-feature strong {
          display: block;
          margin-bottom: 4px;
          font-size: 13px;
        }

        .home-feature span {
          color: #7b8495;
          font-size: 11px;
        }

        /* HOW IT WORKS */
        .home-how {
          padding: 75px 0;
        }

        .home-section-heading {
          max-width: 650px;
          margin: 0 auto 45px;
          text-align: center;
        }

        .home-section-heading > span {
          color: #5b50d6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .home-section-heading h2 {
          margin: 12px 0;
          font-size: 34px;
        }

        .home-section-heading p {
          color: #788294;
          font-size: 14px;
          line-height: 1.7;
        }

        .home-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .home-step {
          position: relative;
          padding: 28px;
          border: 1px solid #e4e6ed;
          border-radius: 14px;
          background: white;
        }

        .home-step-number {
          margin-bottom: 20px;
          color: #c4c7d3;
          font-size: 12px;
          font-weight: 800;
        }

        .home-step svg {
          color: #5b50d6;
        }

        .home-step h3 {
          margin: 15px 0 8px;
          font-size: 17px;
        }

        .home-step p {
          margin: 0;
          color: #7b8495;
          font-size: 12px;
          line-height: 1.7;
        }

        /* CTA */
        .home-cta {
          padding: 20px 0 75px;
        }

        .home-cta-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
          padding: 38px;
          border-radius: 16px;
          background: #171b2b;
          color: white;
        }

        .home-cta-box h2 {
          margin: 0 0 8px;
          font-size: 26px;
        }

        .home-cta-box p {
          margin: 0;
          color: #aeb5c5;
          font-size: 13px;
        }

        .home-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 8px;
          background: white;
          color: #171b2b;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
        }

        @media (max-width: 850px) {
          .home-hero-grid {
            grid-template-columns: 1fr;
          }

          .home-feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .home-steps {
            grid-template-columns: 1fr;
          }

          .home-hero h1 {
            font-size: 42px;
          }
        }

        @media (max-width: 550px) {
          .home-hero {
            padding: 50px 0;
          }

          .home-hero h1 {
            font-size: 36px;
          }

          .home-feature-grid {
            grid-template-columns: 1fr;
          }

          .home-actions {
            flex-direction: column;
          }

          .home-btn-primary,
          .home-btn-secondary {
            justify-content: center;
          }

          .home-cta-box {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <main className="home-page">

        <section className="home-hero">
          <div className="home-container home-hero-grid">

            <div>
              <div className="home-tag">
                <CarFront size={15} />
                Smart Car Price Estimator
              </div>

              <h1>
                Find the right value
                <span> for your car.</span>
              </h1>

              <p>
                Get an estimated market value for your car using
                important vehicle details such as model, year, fuel type,
                mileage and more.
              </p>

              <div className="home-actions">
                <Link to="/predict" className="home-btn-primary">
                  Check Car Price
                  <ArrowRight size={17} />
                </Link>

                <Link to="/about" className="home-btn-secondary">
                  Learn More
                </Link>
              </div>

              <div className="home-points">
                <span>
                  <CheckCircle2 size={15} />
                  Quick estimate
                </span>

                <span>
                  <CheckCircle2 size={15} />
                  Easy process
                </span>

                <span>
                  <CheckCircle2 size={15} />
                  Data-based result
                </span>
              </div>
            </div>

            <div className="home-car-card">
              <div className="home-car-photo">
                <img
                  src="https://images.hdqwalls.com/wallpapers/bugatti-sport-car-77.jpg"
                  alt="Car"
                />
              </div>

              <div className="home-car-info">
                <div className="home-price-label">
                  Estimated Car Value
                </div>

                <div className="home-price">
                  ₹8.45 Lakh
                </div>

                <div className="home-car-details">
                  <div>
                    <span>Model</span>
                    <strong>Premium Sedan</strong>
                  </div>

                  <div>
                    <span>Year</span>
                    <strong>2022</strong>
                  </div>

                  <div>
                    <span>Fuel</span>
                    <strong>Petrol</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="home-features">
          <div className="home-container home-feature-grid">

            <div className="home-feature">
              <div className="home-feature-icon">
                <CarFront size={20} />
              </div>
              <div>
                <strong>Multiple Models</strong>
                <span>Popular vehicles</span>
              </div>
            </div>

            <div className="home-feature">
              <div className="home-feature-icon">
                <TrendingUp size={20} />
              </div>
              <div>
                <strong>Price Estimation</strong>
                <span>Market value estimate</span>
              </div>
            </div>

            <div className="home-feature">
              <div className="home-feature-icon">
                <Search size={20} />
              </div>
              <div>
                <strong>Easy Search</strong>
                <span>Simple vehicle details</span>
              </div>
            </div>

            <div className="home-feature">
              <div className="home-feature-icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <strong>Clear Results</strong>
                <span>Easy to understand</span>
              </div>
            </div>

          </div>
        </section>

        <section className="home-how">
          <div className="home-container">

            <div className="home-section-heading">
              <span>HOW IT WORKS</span>

              <h2>
                Get your car's estimated value
                in three simple steps.
              </h2>

              <p>
                Enter a few details about your vehicle and get an
                estimated price in just a few moments.
              </p>
            </div>

            <div className="home-steps">

              <div className="home-step">
                <div className="home-step-number">01</div>
                <Search size={24} />

                <h3>Enter Car Details</h3>

                <p>
                  Select your car brand, model, year, fuel type and
                  other important vehicle information.
                </p>
              </div>

              <div className="home-step">
                <div className="home-step-number">02</div>
                <TrendingUp size={24} />

                <h3>Get Price Estimate</h3>

                <p>
                  Your vehicle details are processed to calculate an
                  estimated market price.
                </p>
              </div>

              <div className="home-step">
                <div className="home-step-number">03</div>
                <CheckCircle2 size={24} />

                <h3>View Your Result</h3>

                <p>
                  See the estimated value and use it as a reference
                  when buying or selling a vehicle.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-container">
            <div className="home-cta-box">
              <div>
                <h2>Want to know what your car is worth?</h2>
                <p>
                  Enter your vehicle details and get an estimated price.
                </p>
              </div>

              <Link to="/predict" className="home-cta-button">
                Check Car Price
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
