//import React, { Component } from 'react';

//export class Home extends Component {
//  static displayName = Home.name;

//  render() {
//    return (
//      <div>
//        <h1>Hello, world!</h1>
//        <p>Welcome to your new single-page application, built with:</p>
//        <ul>
//          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
//          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
//          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
//        </ul>
//        <p>To help you get started, we have also set up:</p>
//        <ul>
//          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
//          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
//          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
//        </ul>
//        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
//      </div>
//    );
//  }
//}
import React, { useState } from "react";
//import "./Home.css";

const Home = ({ onLoginClick }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        validateName(newName);
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

    const validateName = (name) => {
        setNameError(name ? "" : "Name is required");
    };

    const validateEmail = (email) => {
        if (!email) {
            setEmailError("Email is required");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailRegex.test(email) ? "" : "Invalid email format");
        }
    };

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Password is required");
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
            confirmPassword === password ? "" : "Passwords do not match"
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateName(name);
        validateEmail(email);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);

        if (
            name &&
            email &&
            password &&
            confirmPassword &&
            !nameError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError
        ) {
            console.log("User Registered:", {
                name,
                email,
                password,
                confirmPassword,
            });
            const userData = {
                FirstName: name.split(" ")[0], // Assuming first part of the name is the first name
                LastName: name.split(" ")[1] || "LastName", // Placeholder for last name
                UserName: `test123`, // Creating a username from the name
                Email: email,
                PhoneNo: "123-456-7890", // Placeholder phone number
                City: "123 CITY", // Placeholder address
                State:"Nova Scotia",
                Country: "Canada",
                Password: password,
            };
            fetch("https://localhost:7278/api/Registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    // Handle success (e.g., show a success message or redirect)
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // Handle errors (e.g., show an error message)
                });
        } else {
            console.log("Validation errors");
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                <h2>Register for Car Services</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    {nameError && <div className="error">{nameError}</div>}
                </div>
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
                <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {confirmPasswordError && (
                        <div className="error">{confirmPasswordError}</div>
                    )}
                </div>
                <button type="submit">Register</button> { }
                <p>
                    Already have an account?{" "}
                    <button type="button" onClick={onLoginClick}>
                        Login here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Home;
