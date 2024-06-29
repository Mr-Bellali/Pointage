import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pointage = () => {
    const [isPresent, setIsPresent] = useState(false);
    const [isAbsentChecked, setIsAbsentChecked] = useState(false);
    const userID = "b0e7d6e9-fdf0-42b6-825c-4e90723724ad";

    useEffect(() => {
        fetch(`http://localhost:8080/checkattendancestatus?user_id=${userID}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.checked_in) {
                    setIsPresent(true);
                }
            })
            .catch((error) => {
                console.error("Error checking attendance status:", error);
            });
    }, []);

    const handlePresentClick = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30, 0); // 9:30 AM
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30, 0); // 12:30 PM

        if (now < start || now > end) {
            toast.error("Attendance can only be checked between 9:30 AM and 12:30 PM");
            return;
        }

        const data = {
            user_id: userID,
            arrival_time: now.toISOString(),
            is_present: true,
        };

        fetch("http://localhost:8080/createattendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Attendance created successfully.");
                    setIsPresent(true);
                } else {
                    toast.error("Failed to create attendance.");
                }
            })
            .catch((error) => {
                toast.error("Error creating attendance:", error);
            });
    };

    const handleAbsentClick = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30, 0); // 9:30 AM
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30, 0); // 12:30 PM
    
        if (now < start || now > end) {
            toast.error("Attendance can only be checked between 9:30 AM and 12:30 PM");
            return;
        }
    
        const data = {
            user_id: userID,
            arrival_time: now.toISOString(),
            is_present: false,
        };
    
        fetch("http://localhost:8080/createattendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Absence recorded successfully.");
                    setIsAbsentChecked(true); // Update state to disable absence button
                } else {
                    toast.error("Failed to record absence.");
                }
            })
            .catch((error) => {
                toast.error("Error recording absence:", error);
            });
    };
    

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-1/3 text-3xl font-semibold flex items-center justify-end">
                <h1>Pointez votre présence</h1>
            </div>
            <div className="w-2/3 flex items-center justify-center">
                <button
                    className={`w-[150px] h-[30px] ${
                        isPresent
                            ? "bg-gray-400 text-gray-700"
                            : "bg-green-400 text-green-900"
                    } text-2xl rounded-xl flex items-center justify-center p-6 ml-4`}
                    onClick={handlePresentClick}
                    disabled={isPresent || isAbsentChecked}
                >
                    Present
                </button>
                <button
                    className={`w-[150px] h-[30px] ${
                        isAbsentChecked
                            ? "bg-gray-400 text-gray-700"
                            : "bg-red-400 text-red-900"
                    } text-2xl rounded-xl flex items-center justify-center p-6 ml-4`}
                    onClick={handleAbsentClick}
                    disabled={isAbsentChecked || isPresent}
                >
                    Absent
                </button>
                {isPresent && (
                    <button
                        className="w-[150px] h-[30px] bg-blue-400 text-blue-900 text-2xl rounded-xl flex items-center justify-center p-6 ml-4"
                    >
                        Leaving
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Pointage;
