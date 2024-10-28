import React from 'react';
import './ConfirmPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'js-cookie'; // Ensure you have imported cookie

const ConfirmedPage = ({ onLogout }) => {

    const handleLogout = () => {
        cookie.remove("email");
        onLogout();
    };

    return (
        <div className="container mt-5">
            <div>
                <h1>YOUR APPOINTMENT BOOKING IS CONFIRMED!</h1>
                <p>Your booking details have been successfully recorded.</p>
            </div>

            {/* Logout Button */}
            <div className="logout-button">
                <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ConfirmedPage;
