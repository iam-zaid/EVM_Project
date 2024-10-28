import React, { useState, useEffect } from "react";
import "./BookAppointment.css";
import cookie from "js-cookie";

const BookAppointment = ({ onLogout, onBookSuccess }) => {
    const [serviceType, setServiceType] = useState("");
    const [branchName, setBranchName] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [checkInTime, setCheckInTime] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const userEmail = cookie.get("email");
        setEmail(userEmail);
    }, []);

    const handleLogout = () => {
        cookie.remove("email");
        onLogout();
    };

    const handleServiceTypeChange = (event) => {
        setServiceType(event.target.value);
    };

    const handleBranchNameChange = (event) => {
        setBranchName(event.target.value);
    };

    const handleDateChange = (event) => {
        setAppointmentDate(event.target.value);
        setError("");
    };

    const handleCheckInTimeChange = (event) => {
        setCheckInTime(event.target.value);
        setError("");
    };

    const validateDateTime = () => {
        if (appointmentDate && checkInTime) {
            const appointmentDateTime = new Date(appointmentDate + " " + checkInTime);
            const currentDateTime = new Date();
            return appointmentDateTime > currentDateTime;
        }
        return false;
    };

    const mapBranchNameToId = (branchName) => {
        const branchMap = {
            Barrington: 31,
            "Spring Garden": 32,
            Bedford: 33,
            Darthmouth: 34,
            Mumford: 35,
        };
        return branchMap[branchName] || 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateDateTime()) {
            setError("Check-in date and time must be in the future.");
            return;
        }

        const branchId = mapBranchNameToId(branchName);
        const appointmentDateTime = new Date(`${appointmentDate}T${checkInTime}`);

        const appointmentData = {
            AppointType: serviceType,
            AppointmentDate: appointmentDateTime.toISOString(),
            AppointmentTime: `${checkInTime}:00`, // Adjust this format as needed for your backend
            BranchId: branchId,
        };

        try {
            const response = await fetch("/api/Appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Include any other headers your API requires
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
                console.log(response);
            }

            // Handle the response data as needed
            onBookSuccess();
            console.log("Appointment booked successfully");
            // Reset form or navigate user as needed
        } catch (error) {
            console.error("Failed to book appointment:", error);
            setError("Failed to book appointment, please try again.");
        }
    };

    return (
        <div className="appointment-container">
            <h2>Book Your Car Service Appointment</h2>
            {email && <p>Logged in as: {email}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="serviceType">Service Type:</label>
                <select
                    id="serviceType"
                    value={serviceType}
                    onChange={handleServiceTypeChange}
                    required
                >
                    <option value="">Select a Service</option>
                    <option value="oil-change">Oil Change(80 CAD)</option>
                    <option value="tire-rotation">Tire Rotation(100 CAD)</option>
                    <option value="general-inspection">General Inspection(50 CAD)</option>
                </select>

                <label htmlFor="branchName">Branch Name:</label>
                <select
                    id="branchName"
                    value={branchName}
                    onChange={handleBranchNameChange}
                    required
                >
                    <option value="">Select a Branch</option>
                    <option value="Barrington">Barrington</option>
                    <option value="Spring Garden">Spring Garden</option>
                    <option value="Bedford">Bedford</option>
                    <option value="Darthmouth">Darthmouth</option>
                    <option value="Mumford">Mumford</option>
                </select>

                <label htmlFor="appointmentDate">Date:</label>
                <input
                    type="date"
                    id="appointmentDate"
                    value={appointmentDate}
                    onChange={handleDateChange}
                    required
                />

                <label htmlFor="checkInTime">Check-In Time:</label>
                <input
                    type="time"
                    id="checkInTime"
                    value={checkInTime}
                    onChange={handleCheckInTimeChange}
                    required
                />

                {error && <div className="error-message">{error}</div>}

                <button type="submit">Book Appointment</button>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;