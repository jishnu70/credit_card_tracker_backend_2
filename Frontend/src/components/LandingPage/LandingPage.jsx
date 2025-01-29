import React from "react";
import cards from "../../assets/img/credit-card.jpg";
import { FaUserFriends, FaChartPie, FaLayerGroup ,FaShieldAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-900 text-white">
      {/* First Row with 2 Columns */}
      <div className="flex items-center justify-between gap-10 px-10 mb-6 mt-10">
        <div className="min-w-[50%]">
          <h1 className="text-6xl text-teal-400 font-bold my-10">Track Wise</h1>
          <p className="text-slate-100 mt-4 font-semibold text-lg">
            Track Wise is a secure credit card transaction tracker that stores
            your credit cards, monitors transactions online, and provides
            real-time visual insights while securely managing and monitoring
            transaction data.
          </p>
          <button onClick={() => navigate("/login")} className="mt-4 font-semibold rounded-md border border-gray-300 px-6 py-2 text-white hover:bg-slate-700 hover:shadow-md transition duration-300">
            Get Started
          </button>
        </div>
        <div className="ml-auto">
          <img
            src={cards}
            alt="Credit Card"
            className="w-auto h-auto rounded shadow-lg"
          />
        </div>
      </div>

      {/* Second Row with 4 Columns */}
      <div className="flex items-center justify-between gap-6 px-6 mt-10 mx-6 mb-6">
        {/* Column 1 */}
        <div className="text-center mx-2">
          <FaUserFriends className="text-teal-400 text-4xl mx-auto mb-4" />
          <h3 className="font-semibold text-lg ">User-friendly</h3>
          <p className="text-slate-300">
            Welcome to our user-friendly transaction tracker web application.
          </p>
        </div>

        {/* Column 2 */}
        <div className="text-center mx-2">
          <FaShieldAlt className="text-teal-400 text-4xl mx-auto mb-4" />
          <h3 className="font-semibold text-lg">Security</h3>
          <p className="text-slate-300">
            We ensure secure and encrypted data storage for sensitive credit
            card information.
          </p>
        </div>

        {/* Column 3 */}
        <div className="text-center mx-2">
          <FaChartPie className="text-teal-400 text-4xl mx-auto mb-4 pt-8 " />
          <h3 className="font-semibold text-lg">Transaction Summary</h3>
          <p className="text-slate-300">
            We provide real-time transaction summaries and interactive
            visualizations.
          </p>
        </div>

        {/* Column 4 */}
        <div className="text-center mx-2">
          <FaLayerGroup className="text-teal-400 text-4xl mx-auto mb-4 pt-6" />
          <h3 className="font-semibold text-lg">Scalability</h3>
          <p className="text-slate-300">
            We provide a scalable solution suitable for personal and small
            business use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
