import React, { useEffect, useState } from "react";
import {
  Calculator,
  CarFront,
  RotateCcw,
  Sparkles,
  Gauge,
  Fuel,
  Settings2,
  Info,
  CheckCircle2
} from "lucide-react";
import api from "../services/api";

const vehicleModels = {
  Toyota: [
    "Innova Crysta",
    "Fortuner",
    "Camry",
    "Corolla",
    "Glanza",
    "Urban Cruiser",
    "Hyryder"
  ],
  Honda: ["City", "Amaze", "Elevate", "Civic", "WR-V"],
  Hyundai: [
    "Creta",
    "Venue",
    "Verna",
    "i20",
    "i10",
    "Tucson",
    "Alcazar"
  ],
  Maruti: [
    "Swift",
    "Baleno",
    "Dzire",
    "Brezza",
    "Ertiga",
    "Grand Vitara",
    "Ciaz"
  ],
  Tata: ["Nexon", "Harrier", "Safari", "Punch", "Altroz", "Tiago"],
  BMW: ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  Mercedes: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC"],
  Kia: ["Seltos", "Sonet", "Carens", "Sportage"],
  Mahindra: ["Scorpio", "Scorpio N", "XUV700", "Thar", "XUV300"],
  Ford: ["EcoSport", "Endeavour", "Figo", "Aspire", "Freestyle"],
  Volkswagen: ["Polo", "Virtus", "Taigun", "Tiguan"],
  Skoda: ["Slavia", "Kushaq", "Superb", "Octavia", "Kodiaq"],
  Renault: ["Kwid", "Kiger", "Triber", "Duster"],
  Nissan: ["Magnite", "Kicks", "Terrano"],
  MG: ["Hector", "Astor", "Gloster", "ZS EV"],
  Jeep: ["Compass", "Meridian", "Wrangler", "Grand Cherokee"],
  Volvo: ["XC40", "XC60", "XC90", "S90"],
  Jaguar: ["XE", "XF", "F-Pace", "I-Pace"],
  Land_Rover: [
    "Defender",
    "Discovery",
    "Range Rover",
    "Range Rover Sport"
  ]
};

const fallback = {
  brands: Object.keys(vehicleModels),
  fuel_types: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
  transmissions: ["Manual", "Automatic", "AMT", "CVT", "DCT"]
};

const USD_TO_INR = 96;

export default function Predict() {
  const [options, setOptions] = useState(fallback);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    brand: "Toyota",
    vehicle_model: "Innova Crysta",
    year: 2022,
    vehicle_age: 4,
    horsepower: 120,
    engine_size_l: 1.5,
    mileage: 30000,
    fuel_type: "Petrol",
    transmission: "Automatic",
    owners: 1
  });

  useEffect(() => {
    api
      .get("/options")
      .then((res) => {
        if (res.data.success) {
          const backendBrands =
            res.data.brands?.length > 0
              ? res.data.brands
              : fallback.brands;

          const backendFuelTypes =
            res.data.fuel_types?.length > 0
              ? res.data.fuel_types
              : fallback.fuel_types;

          const backendTransmissions =
            res.data.transmissions?.length > 0
              ? res.data.transmissions
              : fallback.transmissions;

          setOptions({
            brands: backendBrands,
            fuel_types: backendFuelTypes,
            transmissions: backendTransmissions
          });

          const firstBrand = backendBrands[0] || "Toyota";

          setForm((old) => ({
            ...old,
            brand: firstBrand,
            vehicle_model:
              vehicleModels[firstBrand]?.[0] || old.vehicle_model,
            fuel_type:
              backendFuelTypes[0] || old.fuel_type,
            transmission:
              backendTransmissions[0] || old.transmission
          }));
        }
      })
      .catch(() => {
        setApiError(
          "Unable to connect to the valuation service. Please try again."
        );
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const numericFields = [
      "year",
      "vehicle_age",
      "horsepower",
      "engine_size_l",
      "mileage",
      "owners"
    ];

    if (name === "brand") {
      setForm((previous) => ({
        ...previous,
        brand: value,
        vehicle_model: vehicleModels[value]?.[0] || ""
      }));
      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResult(null);
    setApiError("");

    try {
      /*
       * The existing backend expects the same prediction fields.
       * Vehicle age is used on the frontend for customer input/display.
       */
      const predictionData = {
        brand: form.brand,
        vehicle_model: form.vehicle_model,
        year: form.year,
        horsepower: form.horsepower,
        engine_size_l: form.engine_size_l,
        mileage: form.mileage,
        fuel_type: form.fuel_type,
        transmission: form.transmission,
        owners: form.owners
      };

      const res = await api.post("/predict", predictionData);

      setResult(res.data);
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Prediction failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    const firstBrand = options.brands?.[0] || "Toyota";

    setResult(null);
    setApiError("");

    setForm({
      brand: firstBrand,
      vehicle_model:
        vehicleModels[firstBrand]?.[0] || "Innova Crysta",
      year: 2022,
      vehicle_age: 4,
      horsepower: 120,
      engine_size_l: 1.5,
      mileage: 30000,
      fuel_type: options.fuel_types?.[0] || "Petrol",
      transmission:
        options.transmissions?.[0] || "Automatic",
      owners: 1
    });
  };

  const predictionINR =
    result && Number.isFinite(Number(result.prediction))
      ? Number(result.prediction) * USD_TO_INR
      : 0;

  const formattedINR =
    predictionINR > 0
      ? `₹${predictionINR.toLocaleString("en-IN", {
          maximumFractionDigits: 0
        })}`
      : "₹0";

  return (
    <>
      <style>{`
        .predict-page {
          min-height: 100vh;
          padding: 55px 20px 80px;
          background: #f7f8fc;
          color: #172033;
        }

        .predict-container {
          max-width: 1120px;
          margin: 0 auto;
        }

        .predict-header {
          max-width: 720px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .predict-label {
          display: inline-block;
          margin-bottom: 12px;
          color: #5b50d6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .predict-header h1 {
          margin: 0 0 12px;
          font-size: 40px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .predict-header p {
          margin: 0;
          color: #788294;
          font-size: 14px;
          line-height: 1.7;
        }

        .predict-layout {
          display: grid;
          grid-template-columns: 1.45fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        .form-card {
          background: #ffffff;
          border: 1px solid #e4e7ed;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 8px 30px rgba(25, 30, 45, 0.04);
        }

        .form-top {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 28px;
        }

        .form-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          background: #eeecff;
          color: #5b50d6;
        }

        .form-top h2 {
          margin: 0 0 4px;
          font-size: 21px;
        }

        .form-top p {
          margin: 0;
          color: #8a92a1;
          font-size: 12px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 26px 0 15px;
          padding-bottom: 9px;
          border-bottom: 1px solid #edf0f4;
          color: #303849;
          font-size: 12px;
          font-weight: 800;
        }

        .section-title:first-of-type {
          margin-top: 0;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field span {
          color: #515a6b;
          font-size: 11px;
          font-weight: 700;
        }

        .field input,
        .field select {
          width: 100%;
          box-sizing: border-box;
          padding: 11px 12px;
          border: 1px solid #dfe3e9;
          border-radius: 8px;
          background: #fafbfc;
          color: #202738;
          font-family: inherit;
          font-size: 12px;
          outline: none;
          transition: 0.2s;
        }

        .field input:focus,
        .field select:focus {
          border-color: #5b50d6;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(91, 80, 214, 0.08);
        }

        .age-field {
          position: relative;
        }

        .age-field input {
          padding-right: 55px;
        }

        .age-unit {
          position: absolute;
          right: 12px;
          bottom: 12px;
          color: #9299a8;
          font-size: 11px;
          pointer-events: none;
        }

        .age-note {
          margin-top: 6px;
          color: #9098a6;
          font-size: 10px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }

        .reset-btn,
        .predict-btn {
          height: 44px;
          border-radius: 9px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s;
        }

        .reset-btn {
          flex: 0 0 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid #dfe2e8;
          background: #ffffff;
          color: #525b6b;
        }

        .reset-btn:hover {
          background: #f5f6f9;
        }

        .predict-btn {
          flex: 1;
          border: none;
          background: #5b50d6;
          color: white;
        }

        .predict-btn:hover {
          background: #4d43c4;
          transform: translateY(-1px);
        }

        .predict-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .error-box {
          margin-top: 18px;
          padding: 12px 14px;
          border: 1px solid #f0caca;
          border-radius: 8px;
          background: #fff5f5;
          color: #b33c3c;
          font-size: 11px;
          line-height: 1.5;
        }

        .result-card {
          position: sticky;
          top: 25px;
          overflow: hidden;
          border-radius: 16px;
          background: #171b2b;
          color: white;
          box-shadow: 0 12px 35px rgba(20, 24, 40, 0.13);
        }

        .result-top {
          padding: 28px 25px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .result-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #aaa5ff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .result-top h2 {
          margin: 12px 0 6px;
          font-size: 25px;
        }

        .result-top p {
          margin: 0;
          color: #969daf;
          font-size: 11px;
          line-height: 1.6;
        }

        .price-box {
          padding: 25px;
        }

        .price-title {
          margin-bottom: 7px;
          color: #9098aa;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .price {
          margin-bottom: 25px;
          color: #ffffff;
          font-size: 35px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .details-list {
          display: grid;
          gap: 10px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          font-size: 11px;
        }

        .detail-row span {
          color: #8f97a9;
        }

        .detail-row strong {
          color: #ffffff;
          font-weight: 600;
          text-align: right;
        }

        .result-empty {
          padding: 25px;
          color: #9098aa;
          font-size: 12px;
          line-height: 1.7;
        }

        .result-empty-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border-radius: 11px;
          background: #292e43;
          color: #aaa5ff;
        }

        .result-note {
          margin: 0 25px 25px;
          padding: 12px;
          border-radius: 8px;
          background: #22273a;
          color: #8f97a9;
          font-size: 10px;
          line-height: 1.6;
        }

        .info-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 18px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px;
          border: 1px solid #e4e7ed;
          border-radius: 10px;
          background: white;
        }

        .info-item svg {
          flex-shrink: 0;
          color: #5b50d6;
        }

        .info-item span {
          color: #697284;
          font-size: 10px;
          line-height: 1.4;
        }

        @media (max-width: 850px) {
          .predict-layout {
            grid-template-columns: 1fr;
          }

          .result-card {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .predict-page {
            padding: 42px 15px 60px;
          }

          .predict-header h1 {
            font-size: 31px;
          }

          .form-card {
            padding: 22px 18px;
          }

          .field-grid {
            grid-template-columns: 1fr;
          }

          .info-strip {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .reset-btn {
            flex: auto;
          }
        }
      `}</style>

      <section className="predict-page">
        <div className="predict-container">

          <div className="predict-header">
            <span className="predict-label">
              CAR PRICE ESTIMATOR
            </span>

            <h1>Find out what your car could be worth.</h1>

            <p>
              Enter a few details about your vehicle to get an
              estimated market value based on its specifications
              and usage.
            </p>
          </div>

          <div className="predict-layout">

            <div className="form-card">

              <div className="form-top">
                <div className="form-icon">
                  <CarFront size={22} />
                </div>

                <div>
                  <h2>Tell us about your car</h2>
                  <p>
                    Enter the details below for a personalised estimate.
                  </p>
                </div>
              </div>

              <form onSubmit={submit}>

                <div className="section-title">
                  <CarFront size={14} />
                  Vehicle Details
                </div>

                <div className="field-grid">

                  <Field label="Brand">
                    <select
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                    >
                      {options.brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Vehicle Model">
                    <select
                      name="vehicle_model"
                      value={form.vehicle_model}
                      onChange={handleChange}
                    >
                      {(vehicleModels[form.brand] || []).map(
                        (model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        )
                      )}
                    </select>
                  </Field>

                  <Field label="Manufacturing Year">
                    <input
                      type="number"
                      name="year"
                      min="1990"
                      max={new Date().getFullYear()}
                      value={form.year}
                      onChange={handleChange}
                    />
                  </Field>

                  <div className="field age-field">
                    <span>Vehicle Age</span>

                    <input
                      type="number"
                      name="vehicle_age"
                      min="0"
                      max="30"
                      step="1"
                      value={form.vehicle_age}
                      onChange={handleChange}
                    />

                    <span className="age-unit">
                      years
                    </span>

                    <div className="age-note">
                      Enter the actual age of your vehicle.
                    </div>
                  </div>

                  <Field label="Horsepower">
                    <input
                      type="number"
                      name="horsepower"
                      min="20"
                      max="2000"
                      value={form.horsepower}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field label="Engine Size (L)">
                    <input
                      type="number"
                      name="engine_size_l"
                      min="0.5"
                      max="10"
                      step="0.1"
                      value={form.engine_size_l}
                      onChange={handleChange}
                    />
                  </Field>

                </div>

                <div className="section-title">
                  <Gauge size={14} />
                  Usage & Ownership
                </div>

                <div className="field-grid">

                  <Field label="Mileage (km)">
                    <input
                      type="number"
                      name="mileage"
                      min="0"
                      max="1000000"
                      value={form.mileage}
                      onChange={handleChange}
                    />
                  </Field>

                  <Field label="Previous Owners">
                    <input
                      type="number"
                      name="owners"
                      min="0"
                      max="10"
                      value={form.owners}
                      onChange={handleChange}
                    />
                  </Field>

                </div>

                <div className="section-title">
                  <Fuel size={14} />
                  Fuel & Transmission
                </div>

                <div className="field-grid">

                  <Field label="Fuel Type">
                    <select
                      name="fuel_type"
                      value={form.fuel_type}
                      onChange={handleChange}
                    >
                      {options.fuel_types.map((fuel) => (
                        <option key={fuel} value={fuel}>
                          {fuel}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Transmission">
                    <select
                      name="transmission"
                      value={form.transmission}
                      onChange={handleChange}
                    >
                      {options.transmissions.map(
                        (transmission) => (
                          <option
                            key={transmission}
                            value={transmission}
                          >
                            {transmission}
                          </option>
                        )
                      )}
                    </select>
                  </Field>

                </div>

                <div className="form-actions">

                  <button
                    type="button"
                    className="reset-btn"
                    onClick={reset}
                  >
                    <RotateCcw size={15} />
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="predict-btn"
                    disabled={loading}
                  >
                    {loading
                      ? "Calculating..."
                      : "Estimate Car Price"}
                  </button>

                </div>

              </form>

              {apiError && (
                <div className="error-box">
                  {apiError}
                </div>
              )}

            </div>

            <div className="result-card">

              <div className="result-top">
                <div className="result-label">
                  <Sparkles size={13} />
                  YOUR ESTIMATE
                </div>

                <h2>Estimated Market Value</h2>

                <p>
                  Your estimated vehicle value will appear here
                  after you submit the details.
                </p>
              </div>

              {!result ? (
                <div className="result-empty">

                  <div className="result-empty-icon">
                    <Calculator size={21} />
                  </div>

                  <strong>
                    Ready when you are.
                  </strong>

                  <p>
                    Complete the vehicle details and click
                    "Estimate Car Price" to see your result.
                  </p>

                </div>
              ) : (
                <div className="price-box">

                  <div className="price-title">
                    ESTIMATED VALUE
                  </div>

                  <div className="price">
                    {formattedINR}
                  </div>

                  <div className="details-list">

                    <div className="detail-row">
                      <span>Brand</span>
                      <strong>{form.brand}</strong>
                    </div>

                    <div className="detail-row">
                      <span>Vehicle</span>
                      <strong>
                        {form.vehicle_model}
                      </strong>
                    </div>

                    <div className="detail-row">
                      <span>Vehicle Age</span>
                      <strong>
                        {form.vehicle_age} years
                      </strong>
                    </div>

                    <div className="detail-row">
                      <span>Mileage</span>
                      <strong>
                        {Number(form.mileage).toLocaleString(
                          "en-IN"
                        )} km
                      </strong>
                    </div>

                    <div className="detail-row">
                      <span>Fuel</span>
                      <strong>{form.fuel_type}</strong>
                    </div>

                    <div className="detail-row">
                      <span>Transmission</span>
                      <strong>
                        {form.transmission}
                      </strong>
                    </div>

                  </div>

                </div>
              )}

              <div className="result-note">
                <Info
                  size={13}
                  style={{
                    verticalAlign: "middle",
                    marginRight: "5px"
                  }}
                />

                This estimate is based on the vehicle
                information provided and may vary from the
                actual resale price.
              </div>

            </div>

          </div>

          <div className="info-strip">

            <div className="info-item">
              <CheckCircle2 size={17} />
              <span>
                Enter accurate vehicle details
              </span>
            </div>

            <div className="info-item">
              <Gauge size={17} />
              <span>
                Mileage and age affect valuation
              </span>
            </div>

            <div className="info-item">
              <Sparkles size={17} />
              <span>
                Get an instant estimated value
              </span>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
