import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();

    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  return (
    <>
      <style>{`
        .contact-page {
          min-height: 100vh;
          padding: 60px 20px 80px;
          background: #f7f8fc;
          color: #172033;
        }

        .contact-container {
          max-width: 1050px;
          margin: 0 auto;
        }

        /* Header */

        .contact-header {
          max-width: 650px;
          margin: 0 auto 45px;
          text-align: center;
        }

        .contact-header span {
          color: #5b50d6;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .contact-header h1 {
          margin: 12px 0;
          font-size: 38px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .contact-header p {
          margin: 0;
          color: #788294;
          font-size: 14px;
          line-height: 1.7;
        }

        /* Main Content */

        .contact-content {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 25px;
        }

        /* Contact Information */

        .contact-info {
          padding: 32px;
          border-radius: 15px;
          background: #171b2b;
          color: white;
        }

        .contact-info h2 {
          margin: 0 0 10px;
          font-size: 24px;
        }

        .contact-info > p {
          margin: 0 0 35px;
          color: #aeb4c3;
          font-size: 13px;
          line-height: 1.7;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 24px;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;
          background: #292e43;
          color: #aaa5ff;
        }

        .contact-item-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact-item-content span {
          color: #8f97a9;
          font-size: 10px;
          letter-spacing: 0;
        }

        .contact-item-content strong {
          color: white;
          font-size: 12px;
          font-weight: 600;
        }

        /* Form */

        .contact-form {
          padding: 32px;
          border: 1px solid #e5e7ed;
          border-radius: 15px;
          background: white;
        }

        .contact-form h2 {
          margin: 0 0 22px;
          font-size: 22px;
        }

        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .contact-form label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;

          color: #394354;
          font-size: 11px;
          font-weight: 600;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          box-sizing: border-box;

          padding: 11px 12px;

          border: 1px solid #dfe2e8;
          border-radius: 8px;

          background: #fafbfc;
          color: #202738;

          font-family: inherit;
          font-size: 12px;

          outline: none;
          transition: 0.2s;
        }

        .contact-form textarea {
          resize: vertical;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #5b50d6;
          background: white;
          box-shadow: 0 0 0 3px rgba(91, 80, 214, 0.08);
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: #a0a7b3;
        }

        /* Button */

        .contact-form button {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          padding: 12px;

          border: none;
          border-radius: 8px;

          background: #5b50d6;
          color: white;

          font-family: inherit;
          font-size: 12px;
          font-weight: 700;

          cursor: pointer;
          transition: 0.2s;
        }

        .contact-form button:hover {
          background: #4d43c4;
          transform: translateY(-1px);
        }

        /* Success Message */

        .contact-success {
          display: flex;
          align-items: center;
          gap: 8px;

          margin-bottom: 18px;
          padding: 11px 13px;

          border: 1px solid #ccebd8;
          border-radius: 8px;

          background: #f0faf4;
          color: #248452;

          font-size: 11px;
        }

        /* Responsive */

        @media (max-width: 750px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .contact-page {
            padding: 45px 15px 60px;
          }

          .contact-header h1 {
            font-size: 30px;
          }

          .contact-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .contact-info,
          .contact-form {
            padding: 25px 20px;
          }
        }
      `}</style>

      <section className="contact-page">
        <div className="contact-container">

          {/* Header */}
          <div className="contact-header">
            <span>CONTACT US</span>

            <h1>Get in touch with us</h1>

            <p>
              Have a question about AutoPredict or need help with your
              car valuation? Send us a message and we'll be happy to help.
            </p>
          </div>


          {/* Content */}
          <div className="contact-content">

            {/* Contact Information */}
            <div className="contact-info">

              <h2>Let's talk</h2>

              <p>
                Feel free to contact us if you have any questions,
                suggestions or feedback.
              </p>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={19} />
                </div>

                <div className="contact-item-content">
                  <span>Email</span>
                  <strong>support@autopredict.com</strong>
                </div>
              </div>


              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={19} />
                </div>

                <div className="contact-item-content">
                  <span>Location</span>
                  <strong>India</strong>
                </div>
              </div>

            </div>


            {/* Form */}
            <div className="contact-form">

              <h2>Send us a message</h2>

              {sent && (
                <div className="contact-success">
                  <CheckCircle2 size={18} />
                  <span>
                    Your message has been sent successfully.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="contact-row">

                  <label>
                    Name

                    <input
                      type="text"
                      placeholder="Your name"
                      required
                    />
                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                </div>


                <label>
                  Subject

                  <input
                    type="text"
                    placeholder="Enter subject"
                    required
                  />
                </label>


                <label>
                  Message

                  <textarea
                    rows="5"
                    placeholder="Write your message..."
                    required
                  />
                </label>


                <button type="submit">
                  <Send size={16} />
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}
