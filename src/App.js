import React, { useState } from 'react';
import './App.css';  // Assuming you have App.css for styles

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [getResponseData, setGetResponseData] = useState(null);

    // Handle POST request
    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await fetch('https://bajaj-backend-gold.vercel.app/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: parsedData.data }),
            });
            const data = await res.json();
            setResponseData(data);
        } catch (error) {
            console.error('Invalid JSON');
        }
    };

    // Handle GET request
    const handleGetRequest = async () => {
        try {
            const res = await fetch('https://bajaj-backend-gold.vercel.app/bfhl', {
                method: 'GET',
            });
            const data = await res.json();
            setGetResponseData(data);
        } catch (error) {
            console.error('Error fetching GET response');
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">{`21BDS0268`}</h1>
            <div className="input-container">
                <input
                    className="input-box"
                    type="text"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Enter JSON"
                />
                <button className="submit-btn" onClick={handleSubmit}>Submit POST Request</button>
            </div>

            {responseData && (
                <div className="table-container animate">
                    <h2>POST Response</h2>
                    <table className="response-table">
                        <tbody>
                            <tr>
                                <td><strong>User ID:</strong></td>
                                <td>{responseData.user_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{responseData.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Roll Number:</strong></td>
                                <td>{responseData.roll_number}</td>
                            </tr>
                            <tr>
                                <td><strong>Numbers:</strong></td>
                                <td>{responseData.numbers.join(', ')}</td>
                            </tr>
                            <tr>
                                <td><strong>Alphabets:</strong></td>
                                <td>{responseData.alphabets.join(', ')}</td>
                            </tr>
                            <tr>
                                <td><strong>Highest Lowercase Alphabet:</strong></td>
                                <td>{responseData.highest_lowercase_alphabet.join(', ')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <button className="get-btn" onClick={handleGetRequest}>Click for GET Endpoint</button>

            {getResponseData && (
                <div className="get-response animate">
                    <h2>GET Response</h2>
                    <p>Operation Code: {getResponseData.operation_code}</p>
                </div>
            )}
        </div>
    );
}

export default App;
