import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import PaymentPage from "./components/PaymentPage";
import HomePage from "./components/HomePage";
import cookie from "js-cookie";
import BookAppointment from "./components/BookAppointment";
import ConfirmedPage from "./components/ConfirmPage";

function App() {
    const [currentPage, setCurrentPage] = useState("bookAppointment");

    const checkLoggedIn = () => {
        return cookie.get("email") ? true : false;
    };

    const navigateToConfirm = () => {
        setCurrentPage("confirm");
    };

    const navigateToPayment = () => {
        setCurrentPage("payment");
    };
    const onLogout = () => {
        cookie.remove("email"); // Clear the cookie on logout
        setCurrentPage("home"); // Navigate to home after logout
    };

    const onHomeClick = () => {
        setCurrentPage("home"); // Navigate to the home page
    };

    const navigateTo = (page) => {
        setCurrentPage(page); // Allow direct navigation to any page
    };

    const onLoginSuccess = () => {
        setCurrentPage("bookAppointment");
    };

    useEffect(() => {
        setCurrentPage(checkLoggedIn() ? "bookAppointment" : "home");
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case "bookAppointment":
                return (
                    <BookAppointment
                        onLogout={onLogout}
                        onBookSuccess={navigateToPayment}
                    />
                );
            //case "payment":
            //    return <PaymentPage />;
            case "payment":
                return <PaymentPage onPaymentSuccess={navigateToConfirm} />;
            case "confirm":
                return <ConfirmedPage onLogout={onLogout} onHomeClick={() => setCurrentPage("home")} />;
            case "login":
                return (
                    <LoginPage
                        onRegisterClick={() => navigateTo("register")}
                        onLoginSuccess={onLoginSuccess}
                    />
                );
            case "register":
                return (
                    <RegistrationPage
                        onLoginClick={() => navigateTo("login")}
                        onRegistrationSuccess={onLoginSuccess}
                        onHomeClick={onHomeClick}
                    />
                );
            case "home":
            default:
                return (
                    <HomePage
                        onLoginClick={() => navigateTo("login")}
                        onRegisterClick={() => navigateTo("register")}
                    />
                );
        }
    };

    return <div className="App">{renderPage()}</div>;
}

export default App;
