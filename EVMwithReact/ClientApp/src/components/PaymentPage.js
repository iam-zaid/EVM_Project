import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = ({ onPaymentSuccess }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [cardNameError, setCardNameError] = useState("");
    const [expiryDateError, setExpiryDateError] = useState("");
    const [cvvError, setCvvError] = useState("");
    const [cardType, setCardType] = useState("");

    const nameRegex = /^[a-zA-Z\-'\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const canadaPostalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const usZipCodeRegex = /^\d{5}(-\d{4})?$/;
    const phoneNumberRegex = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    const masterCardRegex = /^5[1-5][0-9]{14}$/;
    const visaRegex = /^4[0-9]{15}$/;
    const amexRegex = /^(34|37)[0-9]{13}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/20(1[6-9]|2[0-9]|30|31)$/;

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setFirstNameError(
            nameRegex.test(value)
                ? ""
                : "Names must not contain special characters or numbers."
        );
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        setLastNameError(
            nameRegex.test(value)
                ? ""
                : "Names must not contain special characters or numbers."
        );
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(emailRegex.test(value) ? "" : "Invalid email address.");
    };

    const handleCountryChange = (e) => {
        const newCountry = e.target.value;
        setCountry(newCountry);
        // Reset postal code error when country changes
        setPostalCodeError("");
    };

    const handlePostalCodeChange = (e) => {
        const value = e.target.value;
        setPostalCode(value);
        if (country === "Canada") {
            setPostalCodeError(
                canadaPostalCodeRegex.test(value) ? "" : "Invalid Canadian postal code."
            );
        } else if (country === "USA") {
            setPostalCodeError(
                usZipCodeRegex.test(value) ? "" : "Invalid US zip code."
            );
        }
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setPhoneNumberError(
            phoneNumberRegex.test(value) ? "" : "Invalid phone number."
        );
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);

        switch (cardType) {
            case "MasterCard":
                setCardNumberError(
                    masterCardRegex.test(value)
                        ? ""
                        : "Invalid MasterCard number. Please enter a correct 16-digit MasterCard number."
                );
                break;
            case "Visa":
                setCardNumberError(
                    visaRegex.test(value)
                        ? ""
                        : "Invalid Visa card number. Please enter a correct 16-digit Visa number."
                );
                break;
            case "American Express":
                setCardNumberError(
                    amexRegex.test(value)
                        ? ""
                        : "Invalid American Express card number. Please enter a correct 15-digit Amex number."
                );
                break;
            default:
                setCardNumberError("Please select a card type.");
        }
    };

    const handleCardNameChange = (e) => {
        const value = e.target.value;
        setCardName(value);
        setCardNameError(
            nameRegex.test(value)
                ? ""
                : "Names must not contain special characters or numbers."
        );
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value;
        setExpiryDate(value);
        setExpiryDateError(
            expiryDateRegex.test(value)
                ? ""
                : "Invalid expiry date. Use MM/YYYY format."
        );
    };

    const handleCvvChange = (e) => {
        const value = e.target.value;
        setCvv(value);
        if (cardNumber.startsWith("3") && value.length === 4) {
            setCvvError("");
        } else if (!cardNumber.startsWith("3") && value.length === 3) {
            setCvvError("");
        } else {
            setCvvError("Invalid CVV.");
        }
    };

    const validateInput = () => {
        // Validation logic here
        // Return true if all validations pass
        return (
            !firstNameError &&
            !lastNameError &&
            !emailError &&
            !postalCodeError &&
            !phoneNumberError &&
            !cardNumberError &&
            !cardNameError &&
            !expiryDateError &&
            !cvvError
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateInput()) {
            alert("Please correct the errors before submitting.");
            return;
        }

        console.log("Payment Details:", {
            firstName,
            lastName,
            email,
            country,
            postalCode,
            phoneNumber,
            cardNumber,
            cardName,
            expiryDate,
            cvv,
        });
        onPaymentSuccess();
    };

    return (
        <div className="payment-container">
            <h2>Payment Details</h2>
            <form onSubmit={handleSubmit}>
                {/* First Name Field */}
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                    {firstNameError && (
                        <div className="error-message">{firstNameError}</div>
                    )}
                </div>

                {/* Last Name Field */}
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                    {lastNameError && (
                        <div className="error-message">{lastNameError}</div>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>

                {/* Country Field */}
                <div>
                    <label htmlFor="country">Country:</label>
                    <select
                        id="country"
                        value={country}
                        onChange={handleCountryChange}
                        required
                    >
                        <option value="">Select Country</option>
                        <option value="Canada">Canada</option>
                        <option value="USA">USA</option>
                    </select>
                </div>

                {/* Postal Code Field */}
                <div>
                    <label htmlFor="postalCode">Postal Code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        value={postalCode}
                        onChange={handlePostalCodeChange}
                        required
                    />
                    {postalCodeError && (
                        <div className="error-message">{postalCodeError}</div>
                    )}
                </div>

                {/* Phone Number Field */}
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                    {phoneNumberError && (
                        <div className="error-message">{phoneNumberError}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="cardType">Credit Card Type:</label>
                    <select
                        id="cardType"
                        value={cardType}
                        onChange={(e) => setCardType(e.target.value)}
                        required
                    >
                        <option value="">Select Card Type</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Visa">Visa</option>
                        <option value="American Express">American Express</option>
                    </select>
                </div>

                {/* Credit Card Number Field */}
                <div>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="Card Number"
                        maxLength={cardType === "American Express" ? 15 : 16}
                        required
                    />
                    {cardNumberError && (
                        <div className="error-message">{cardNumberError}</div>
                    )}
                </div>

                {/* Cardholder Name Field */}
                <div>
                    <label htmlFor="cardName">Cardholder Name:</label>
                    <input
                        type="text"
                        id="cardName"
                        value={cardName}
                        onChange={handleCardNameChange}
                        placeholder="Name on Card"
                        required
                    />
                    {cardNameError && (
                        <div className="error-message">{cardNameError}</div>
                    )}
                </div>

                {/* Expiry Date Field */}
                <div>
                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YYYY"
                        maxLength="7"
                        required
                    />
                    {expiryDateError && (
                        <div className="error-message">{expiryDateError}</div>
                    )}
                </div>

                {/* CVV Field */}
                <div>
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="CVV"
                        maxLength="4"
                        required
                    />
                    {cvvError && <div className="error-message">{cvvError}</div>}
                </div>

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
};

export default PaymentPage;
