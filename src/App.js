import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [getResponseData, setGetResponseData] = useState(null); // State for GET response
    const [selectedFilters, setSelectedFilters] = useState([]);

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

    const handleFilterChange = (selected) => {
        setSelectedFilters(selected);
    };

    const renderResponse = () => {
        if (!responseData) return null;
        const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

        return (
            <>
                {selectedFilters.includes('Numbers') && <p>Numbers: {numbers.join(', ')}</p>}
                {selectedFilters.includes('Alphabets') && <p>Alphabets: {alphabets.join(', ')}</p>}
                {selectedFilters.includes('Highest Lowercase Alphabet') && <p>Highest Lowercase: {highest_lowercase_alphabet.join(', ')}</p>}
            </>
        );
    };

    return (
        <div>
            <h1>{`21BDS0268`}</h1>
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON"
            />
            <button onClick={handleSubmit}>Submit POST Request</button>

            {responseData && (
                <>
                    <select multiple onChange={(e) => handleFilterChange([...e.target.selectedOptions].map(opt => opt.value))}>
                        <option value="Numbers">Numbers</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    {renderResponse()}
                </>
            )}

            <button onClick={handleGetRequest}>Click for GET Endpoint</button>

            {getResponseData && (
                <div>
                    <h2>GET Response</h2>
                    <p>Operation Code: {getResponseData.operation_code}</p>
                </div>
            )}
        </div>
    );
}

export default App;
