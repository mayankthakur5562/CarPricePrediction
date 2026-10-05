import os
import warnings
import joblib
import numpy as np
import pandas as pd

from flask import Flask, jsonify, request
from flask_cors import CORS

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

warnings.filterwarnings("ignore")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DIR = os.path.join(BASE_DIR, "models")
DATA_FILE = os.path.join(DATA_DIR, "car_price_dataset.csv")
MODEL_FILE = os.path.join(MODEL_DIR, "car_price_model.pkl")
META_FILE = os.path.join(MODEL_DIR, "model_meta.pkl")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(MODEL_DIR, exist_ok=True)

app = Flask(__name__)
CORS(app)

model = None
meta = None


def clean_columns(df):
    df = df.copy()
    df.columns = (
        df.columns.astype(str)
        .str.strip()
        .str.lower()
        .str.replace(" ", "_", regex=False)
        .str.replace("-", "_", regex=False)
    )
    return df


def goodwill(brand):
    b = str(brand).lower().strip()
    premium = ["mercedes", "bmw", "audi", "lexus", "volvo", "jaguar", "porsche", "land rover", "range rover"]
    high = ["toyota", "honda", "hyundai", "kia", "volkswagen", "skoda", "jeep", "ford"]
    normal = ["maruti", "suzuki", "nissan", "renault", "tata", "mahindra"]
    if any(x in b for x in premium):
        return 5
    if any(x in b for x in high):
        return 4
    if any(x in b for x in normal):
        return 3
    return 3


def make_demo_dataset(path):
    rng = np.random.default_rng(42)
    brands = ["Toyota", "Honda", "Hyundai", "Maruti", "Tata", "BMW", "Audi", "Ford"]
    fuels = ["Petrol", "Diesel", "Electric"]
    transmissions = ["Manual", "Automatic"]

    rows = []
    for _ in range(300):
        brand = rng.choice(brands)
        year = int(rng.integers(2012, 2026))
        age = 2026 - year
        horsepower = float(np.clip(rng.normal(125, 35), 60, 300))
        engine = float(np.clip(rng.normal(1.7, 0.5), 0.8, 4.0))
        mileage = float(np.clip(rng.normal(45000 + age * 5000, 18000), 3000, 180000))
        fuel = rng.choice(fuels)
        transmission = rng.choice(transmissions)
        owners = int(rng.integers(1, 4))
        base = {
            "BMW": 42000, "Audi": 38000, "Toyota": 24000, "Honda": 22000,
            "Hyundai": 17000, "Ford": 16000, "Tata": 14000, "Maruti": 12000
        }[brand]
        price = (
            base
            + horsepower * 70
            + engine * 2200
            - age * 1700
            - mileage * 0.045
            - owners * 1200
            + (3500 if transmission == "Automatic" else 0)
            + (2500 if fuel == "Electric" else 0)
            + rng.normal(0, 2500)
        )
        rows.append({
            "Brand": brand, "Year": year, "Age": age,
            "Horsepower": round(horsepower, 1),
            "Engine_Size_L": round(engine, 2),
            "Mileage": round(mileage, 0),
            "Fuel_Type": fuel,
            "Transmission": transmission,
            "Owners": owners,
            "Price": round(max(price, 3000), 2)
        })
    pd.DataFrame(rows).to_csv(path, index=False)


def prepare_dataframe(df):
    df = clean_columns(df)

    target_candidates = ["price", "selling_price", "sellingprice", "present_price"]
    target = next((c for c in target_candidates if c in df.columns), None)
    if target is None:
        raise ValueError(f"Price column not found. Available columns: {list(df.columns)}")

    for col in ["year", "age", "horsepower", "engine_size_l", "engine_size", "mileage", "owners", target]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    if "age" not in df.columns and "year" in df.columns:
        df["age"] = 2026 - df["year"]
    if "year" not in df.columns and "age" in df.columns:
        df["year"] = 2026 - df["age"]

    if "brand" in df.columns:
        df["brand_goodwill"] = df["brand"].apply(goodwill)

    if "engine_size" in df.columns and "engine_size_l" not in df.columns:
        df["engine_size_l"] = df["engine_size"]

    df = df.drop_duplicates()
    df = df.dropna(subset=[target])
    df = df[df[target] > 0].copy()
    df["age"] = df["age"].clip(lower=0) if "age" in df.columns else df.get("age")

    return df, target


def train_models():
    global model, meta

    if not os.path.exists(DATA_FILE):
        make_demo_dataset(DATA_FILE)

    raw = pd.read_csv(DATA_FILE)
    df, target = prepare_dataframe(raw)

    X = df.drop(columns=[target])
    y = df[target]

    X = X.drop(columns=[c for c in ["id", "car_id", "unnamed:_0", "unnamed:_0.1"] if c in X.columns])

    numeric_features = X.select_dtypes(include=np.number).columns.tolist()
    categorical_features = X.select_dtypes(include=["object", "category", "bool"]).columns.tolist()

    preprocessor = ColumnTransformer([
        ("numeric", Pipeline([
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler())
        ]), numeric_features),
        ("categorical", Pipeline([
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("onehot", OneHotEncoder(handle_unknown="ignore"))
        ]), categorical_features)
    ])

    models = {
        "Linear Regression": LinearRegression(),
        "Ridge Regression": Ridge(alpha=1.0),
        "Random Forest": RandomForestRegressor(
            n_estimators=250, random_state=42, n_jobs=-1
        ),
        "Gradient Boosting": GradientBoostingRegressor(
            n_estimators=180, learning_rate=0.05, max_depth=3, random_state=42
        )
    }

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )

    results = {}
    pipelines = {}

    for name, estimator in models.items():
        pipe = Pipeline([
            ("preprocessor", preprocessor),
            ("model", estimator)
        ])
        pipe.fit(X_train, y_train)
        pred = pipe.predict(X_test)
        results[name] = {
            "mae": float(mean_absolute_error(y_test, pred)),
            "rmse": float(np.sqrt(mean_squared_error(y_test, pred))),
            "r2": float(r2_score(y_test, pred))
        }
        pipelines[name] = pipe

    best_name = max(results, key=lambda k: results[k]["r2"])
    best_pipe = pipelines[best_name]

    joblib.dump(best_pipe, MODEL_FILE)

    # Options used by the frontend
    brands = sorted(df["brand"].dropna().astype(str).unique().tolist()) if "brand" in df.columns else []
    fuels = sorted(df["fuel_type"].dropna().astype(str).unique().tolist()) if "fuel_type" in df.columns else []
    transmissions = sorted(df["transmission"].dropna().astype(str).unique().tolist()) if "transmission" in df.columns else []

    meta = {
        "best_model": best_name,
        "results": results,
        "features": list(X.columns),
        "brands": brands,
        "fuel_types": fuels,
        "transmissions": transmissions,
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "price_min": float(y.min()),
        "price_max": float(y.max()),
        "average_price": float(y.mean())
    }
    joblib.dump(meta, META_FILE)
    return meta


def ensure_model():
    global model, meta
    if os.path.exists(MODEL_FILE) and os.path.exists(META_FILE):
        try:
            model = joblib.load(MODEL_FILE)
            meta = joblib.load(META_FILE)
            return
        except Exception:
            pass
    meta = train_models()
    model = joblib.load(MODEL_FILE)


@app.route("/api/health", methods=["GET"])
def health():
    ensure_model()
    return jsonify({"success": True, "message": "Car Price API is running", "model": meta["best_model"]})


@app.route("/api/options", methods=["GET"])
def options():
    ensure_model()
    return jsonify({
        "success": True,
        "brands": meta["brands"],
        "fuel_types": meta["fuel_types"],
        "transmissions": meta["transmissions"]
    })


@app.route("/api/stats", methods=["GET"])
def stats():
    ensure_model()
    return jsonify({
        "success": True,
        "rows": meta["rows"],
        "columns": meta["columns"],
        "average_price": meta["average_price"],
        "price_min": meta["price_min"],
        "price_max": meta["price_max"],
        "best_model": meta["best_model"]
    })


@app.route("/api/models", methods=["GET"])
def models():
    ensure_model()
    return jsonify({
        "success": True,
        "best_model": meta["best_model"],
        "results": meta["results"]
    })


@app.route("/api/predict", methods=["POST"])
def predict():
    ensure_model()

    data = request.get_json(silent=True) or {}

    required = ["brand", "year", "horsepower", "engine_size_l", "mileage", "fuel_type", "transmission", "owners"]
    missing = [x for x in required if x not in data]
    if missing:
        return jsonify({"success": False, "message": f"Missing fields: {', '.join(missing)}"}), 400

    try:
        year = int(data["year"])
        age = max(0, 2026 - year)

        row = {
            "brand": str(data["brand"]),
            "year": year,
            "age": age,
            "horsepower": float(data["horsepower"]),
            "engine_size_l": float(data["engine_size_l"]),
            "mileage": float(data["mileage"]),
            "fuel_type": str(data["fuel_type"]),
            "transmission": str(data["transmission"]),
            "owners": int(data["owners"]),
            "brand_goodwill": goodwill(data["brand"])
        }

        input_df = pd.DataFrame([row])

        expected = getattr(model.named_steps["preprocessor"], "feature_names_in_", None)
        if expected is not None:
            for col in expected:
                if col not in input_df.columns:
                    input_df[col] = np.nan
            input_df = input_df[list(expected)]

        prediction = float(model.predict(input_df)[0])
        prediction = max(0.0, prediction)

        return jsonify({
            "success": True,
            "prediction": prediction,
            "formatted_prediction": f"${prediction:,.2f}",
            "age": age,
            "brand_goodwill": goodwill(data["brand"]),
            "model": meta["best_model"]
        })
    except Exception as exc:
        return jsonify({"success": False, "message": str(exc)}), 500


@app.route("/api/retrain", methods=["POST"])
def retrain():
    try:
        result = train_models()
        ensure_model()
        return jsonify({"success": True, "message": "Model retrained successfully", "best_model": result["best_model"]})
    except Exception as exc:
        return jsonify({"success": False, "message": str(exc)}), 500


if __name__ == "__main__":
    ensure_model()
    print("Backend running on http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
