import React from "react";
import "./HomePage.css";
import loginimg from "./login.png";

const HomePage = ({ onLoginClick, onRegisterClick }) => {
    const backgroundStyle = {
        backgroundImage: `url(${loginimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    return (
        <div>
            <div style={backgroundStyle}>
                <div className="container text-center text-light">
                    <h1 className="display-4">Welcome to Eazy Vehicle Maintainence</h1>
                    <p className="lead">Providing top-notch car services for you!</p>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary btn-lg mx-2" onClick={onLoginClick}>
                            Login
                        </button>
                        <button className="btn btn-secondary btn-lg mx-2" onClick={onRegisterClick}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card mb-4 bg-transparent text-light">
                        <div className="card-body">
                            <h2 className="card-title">Our Services</h2>
                            <p className="card-text">
                                Auto Repair Services
                            </p>
                            <p className="card-text">
                                Car Maintenance
                            </p>
                            <p className="card-text">
                                Vehicle Diagnostics
                            </p>
                            <p className="card-text">
                                Brake Repair
                            </p>
                            <p className="card-text">
                                AC and Heating Services
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card mb-4 bg-transparent text-light">
                        <div className="card-body">
                            <h2 className="card-title">Contact Us</h2>
                            <p className="card-text">
                               evm@testingdemo.com
                            </p>
                            <p className="card-text">
                                PHONE: +12233445566
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;