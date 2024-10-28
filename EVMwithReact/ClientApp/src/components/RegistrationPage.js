import React, { useState } from "react";
import "./RegistrationPage.css";
import cookie from "js-cookie";

const registrationpage_url = '/api/Registration';

const RegistrationPage = ({ onLoginClick, onRegistrationSuccess, onHomeClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [phoneNoError, setPhoneNoError] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState("");
    const [countryError, setCountryError] = useState("");

    const nameAndLocationRegex = /^[a-zA-Z\-'\s]+$/;

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
        setFirstNameError(
            nameAndLocationRegex.test(value) ? "" : "Invalid first name format."
        );
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
        setLastNameError(
            nameAndLocationRegex.test(value) ? "" : "Invalid last name format."
        );
    };

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
        setCityError(
            nameAndLocationRegex.test(value) ? "" : "Invalid city format."
        );
    };

    const handleStateChange = (event) => {
        const value = event.target.value;
        setState(value);
        setStateError(
            nameAndLocationRegex.test(value) ? "" : "Invalid state format."
        );
    };

    const handleCountryChange = (event) => {
        const value = event.target.value;
        setCountry(value);
        setCountryError(
            nameAndLocationRegex.test(value) ? "" : "Invalid country format."
        );
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handlePhoneNoChange = (event) => {
        const newPhoneNo = event.target.value;
        setPhoneNo(newPhoneNo);
        validatePhoneNo(newPhoneNo);
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        validateEmail(newEmail);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        validateConfirmPassword(newConfirmPassword);
    };

    const validatePhoneNo = (phoneNo) => {
        const phoneNoRegex = /^[0-9]+$/;
        setPhoneNoError(
            phoneNoRegex.test(phoneNo) ? "" : "Phone number must be numeric."
        );
    };

    const validateEmail = (email) => {
        if (!email) {
            setEmailError("Email is required.");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailRegex.test(email) ? "" : "Invalid email format.");
        }
    };

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Password is required.");
        } else {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            setPasswordError(
                passwordRegex.test(password)
                    ? ""
                    : "Password must be at least 8 characters long, contain a number, a lowercase and an uppercase letter."
            );
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        setConfirmPasswordError(
            confirmPassword === password ? "" : "Passwords do not match."
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateEmail(email);
        validatePhoneNo(phoneNo);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);

        if (
            firstName &&
            lastName &&
            phoneNo &&
            userName &&
            email &&
            city &&
            state &&
            country &&
            postalCode &&
            password &&
            confirmPassword &&
            !phoneNoError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError
        ) {
            console.log("User Registered:", {
                email,
                password,
                confirmPassword,
            });
            const userData = {
                FirstName: firstName,
                LastName: lastName,
                UserName: userName,
                Email: email,
                PhoneNo: phoneNo,
                City: city,
                State: state,
                Country: country,
                PostalCode: postalCode,
                Password: password,
            };
            fetch(registrationpage_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    cookie.set("email", email);
                    onRegistrationSuccess();
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            console.log("Validation errors");
            alert("Please enter correct values in all fields.");
        }
    };

 return (
            <div className="registration-container">
                <form onSubmit={handleSubmit}>
                    <h2>Register for Car Services</h2>

                    {/* First Name Field */}
                    <div>
                        <label htmlFor="first-name">First Name:</label>
                        <input
                            type="text"
                            id="first-name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                        />
                        {firstNameError && <div className="error">{firstNameError}</div>}
                    </div>

                    {/* Last Name Field */}
                    <div>
                        <label htmlFor="last-name">Last Name:</label>
                        <input
                            type="text"
                            id="last-name"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                        />
                        {lastNameError && <div className="error">{lastNameError}</div>}
                    </div>

                    {/* User Name Field */}
                    <div>
                        <label htmlFor="user-name">User Name:</label>
                        <input
                            type="text"
                            id="user-name"
                            value={userName}
                            onChange={handleUserNameChange}
                            required
                        />
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label htmlFor="phone-no">Phone No:</label>
                        <input
                            type="text"
                            id="phone-no"
                            value={phoneNo}
                            onChange={handlePhoneNoChange}
                            required
                        />
                        {phoneNoError && <div className="error">{phoneNoError}</div>}
                    </div>

                    {/* City Field */}
                    <div>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleCityChange}
                            required
                        />
                        {cityError && <div className="error">{cityError}</div>}
                    </div>

                    {/* State Field */}
                    <div>
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            value={state}
                            onChange={handleStateChange}
                            required
                        />
                        {stateError && <div className="error">{stateError}</div>}
                    </div>

                    {/* Country Field */}
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            id="country"
                            value={country}
                            onChange={handleCountryChange}
                            required
                        />
                        {countryError && <div className="error">{countryError}</div>}
                    </div>

                    {/* Postal Code Field */}
                    <div>
                        <label htmlFor="postal-code">Postal Code:</label>
                        <input
                            type="text"
                            id="postal-code"
                            value={postalCode}
                            onChange={handlePostalCodeChange}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {emailError && <div className="error">{emailError}</div>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        {passwordError && <div className="error">{passwordError}</div>}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                    </div>

                    <button type="submit">Register</button>

                    <p>
                        Already have an account?{" "}
                        <button type="button" onClick={onLoginClick}>
                            Login here
                        </button>
                        <button onClick={onHomeClick} className="back-to-home-button">
                            Back to Home
                        </button>
                    </p>
                </form>
            </div>
            );
};

            export default RegistrationPage;
