import { useState } from 'react';

const Pointage = () => {
    const [isPresent, setIsPresent] = useState(false);

    const handlePresentClick = () => {
        const now = new Date();
        const data = {
            user_id: "801459a4-05c4-4398-bcfe-e0ee4c07db17",
            arrival_time: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())).toISOString(),
            is_present: true
        };

        console.log(data)

        fetch('http://localhost:8080/createattendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('Attendance created successfully.');
                setIsPresent(true);
            } else {
                console.error('Failed to create attendance.');
            }
        })
        .catch(error => {
            console.error('Error creating attendance:', error);
        });
    };

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-1/3 bg-white text-3xl font-semibold flex items-center justify-center">
                <h1>
                    Poinez votre présence
                </h1>
            </div>
            <div className="w-2/3 flex items-center">
                <button 
                    className="w-[150px] h-[30px] bg-green-400 text-2xl text-green-900 rounded-xl flex items-center justify-center p-6 ml-4"
                    onClick={handlePresentClick}
                    disabled={isPresent} 
                >
                    Present
                </button>
                <button className="w-[150px] h-[30px] bg-red-400 text-2xl text-red-900 rounded-xl flex items-center justify-center p-6 ml-4">
                    Absent
                </button>
            </div>
        </div>
    );
};

export default Pointage;
