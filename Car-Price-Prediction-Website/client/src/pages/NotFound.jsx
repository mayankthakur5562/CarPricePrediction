import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center-page">
        <div className="big-404">404</div>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="btn btn-primary" to="/">Back to Home</Link>
      </div>
    </section>
  );
}
