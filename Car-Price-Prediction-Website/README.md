# Car Price Prediction Website

A complete full-stack Machine Learning website for Task 3:
- React + Vite frontend
- Flask + scikit-learn backend
- Pandas preprocessing
- Feature engineering: car age + brand goodwill
- Regression models: Linear Regression, Ridge, Random Forest, Gradient Boosting
- Model evaluation: MAE, RMSE, R2
- Pages: Home, Predict, Dashboard, About, Contact, 404
- Responsive UI

## 1. Requirements

Install:
- Node.js 18+
- Python 3.10+

## 2. Run backend

Open terminal in `server`:

```bash
cd server
python -m venv venv
```

Windows:
```bash
venv\Scripts\activate
```

macOS/Linux:
```bash
source venv/bin/activate
```

Install packages:
```bash
pip install -r requirements.txt
```

Start:
```bash
python app.py
```

Backend runs on:
`http://127.0.0.1:5000`

On first start, if `data/car_price_dataset.csv` is missing, the server creates a small demo dataset automatically so the website still works. For your actual internship/task result, replace it with the downloaded CSV.

Expected real dataset columns can include:
`Brand, Year, Age, Horsepower, Engine_Size_L, Mileage, Fuel_Type, Transmission, Owners, Price`

## 3. Run frontend

Open another terminal in `client`:

```bash
cd client
npm install
npm run dev
```

Open:
`http://localhost:5173`

## 4. If you have the real dataset

Put it here:

`server/data/car_price_dataset.csv`

Then restart the backend. It will train the models from your CSV.

## 5. Main API endpoints

- GET `/api/health`
- GET `/api/options`
- GET `/api/stats`
- GET `/api/models`
- POST `/api/predict`

Prediction body example:
```json
{
  "brand": "Toyota",
  "year": 2022,
  "horsepower": 120,
  "engine_size_l": 1.5,
  "mileage": 30000,
  "fuel_type": "Petrol",
  "transmission": "Automatic",
  "owners": 1
}
```
