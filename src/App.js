import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await fetch('https://bajaj-backend-i4qd.onrender.com/bfhl', {
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
            <button onClick={handleSubmit}>Submit</button>

            {responseData && (
                <select multiple onChange={(e) => handleFilterChange([...e.target.selectedOptions].map(opt => opt.value))}>
                    <option value="Numbers">Numbers</option>
                    <option value="Alphabets">Alphabets</option>
                    <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
                </select>
            )}

            {renderResponse()}
        </div>
    );
}

export default App;
