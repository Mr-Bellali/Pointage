import  { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pointage = () => {
    const [isPresent, setIsPresent] = useState(false);
    const userID = "7b12749b-3d1b-4293-b739-32f415e707f0";

    useEffect(() => {
        fetch(`http://localhost:8080/checkattendancestatus?user_id=${userID}`)
            .then(response => response.json())
            .then(data => {
                if (data.checked_in) {
                    setIsPresent(true);
                }
            })
            .catch(error => {
                console.error('Error checking attendance status:', error);
            });
    }, []);

    const handlePresentClick = () => {
        const now = new Date();
        const start = new Date(now.setHours(8, 30, 0, 0)); 
        const end = new Date(now.setHours(12, 30, 0, 0)); 

        if (now < start || now > end) {
            toast.error('Attendance can only be checked between 8:30 AM and 10:30 AM');
            return;
        }

        const data = {
            user_id: userID,
            arrival_time: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())).toISOString(),
            is_present: true
        };

        console.log(data);

        fetch('http://localhost:8080/createattendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                toast.success('Attendance created successfully.');
                setIsPresent(true);
            } else {
                toast.error('Failed to create attendance.');
            }
        })
        .catch(error => {
            toast.error('Error creating attendance:', error);
        });
    };

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-1/3 text-3xl font-semibold flex items-center justify-center">
                <h1>
                    Pointez votre présence
                </h1>
            </div>
            <div className="w-2/3 flex items-center justify-center">
                <button 
                    className={`w-[150px] h-[30px] ${isPresent ? 'bg-gray-400 text-gray-700' : 'bg-green-400 text-green-900'} text-2xl rounded-xl flex items-center justify-center p-6 ml-4`}
                    onClick={handlePresentClick}
                    disabled={isPresent} 
                >
                    Present
                </button>
                <button 
                    className={`w-[150px] h-[30px] ${isPresent ? 'bg-gray-400 text-gray-700' : 'bg-red-400 text-red-900'} text-2xl rounded-xl flex items-center justify-center p-6 ml-4`}
                    disabled={isPresent}
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
