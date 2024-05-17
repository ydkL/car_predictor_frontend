// PickerPage.js
import React, { useState } from 'react';
import '../App.css';

function RecordPage() {
    const [values, setValues] = useState(Array(9).fill(1)); // Default values
    const [modelName, setModelName] = useState('');
    const [manufacturerName, setManufacturerName] = useState('');
    const [error, setError] = useState('');
    const [responseText, setResponseText] = useState('');
    const baseURL = process.env.REACT_APP_db_base_url;
    const [loading, setLoading] = useState(false); // Loading state
    const labels = [
        "Grid",
        "Comfort",
        "Tech",
        "Visualize",
        "Volume",
        "Reliability",
        "Security",
        "Service",
        "Insulation"
    ];

    const handleChange = (index, event) => {
        const newValues = [...values];
        newValues[index] = parseInt(event.target.value);
        let sum = newValues.reduce((acc, curr) => acc + curr, 0);
        if (sum < 20) {
            setValues(newValues);
        }
    };

    const handleModelNameChange = (event) => {
        setModelName(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (modelName.trim() === '') {
          setError('Model name cannot be empty');
          return;
        }

        setError('');
        setLoading(true); // Set loading state to true
        event.preventDefault();
        const endpoint = `${baseURL}/items/`;
    
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "modelName": modelName,
              "segmentName": "SUV",
              "Grid": values[0],
              "Comfort": values[1], // Assuming values[1] contains Comfort value
              "Tech": values[2],    // Assuming values[2] contains Tech value
              "Visualize": values[3], // Assuming values[3] contains Visualize value
              "Volume": values[4],   // Assuming values[4] contains Volume value
              "Reliability": values[5], // Assuming values[5] contains Reliability value
              "Security": values[6], // Assuming values[6] contains Security value
              "Service": values[7], // Assuming values[7] contains Service value
              "Insulation": values[8] // Assuming values[8] contains Insulation value
            })
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit data');
          }
    
          // Handle successful submission
          console.log('Data submitted successfully');
        } catch (error) {
          console.error('Error:', error);
        }finally {
            setLoading(false); // Set loading state back to false
          }
      };

    return (
        <div className="App">
            <div className="record-page">
            <header className="App-header">           
                <h1>Vote a Car</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Specification</th>
                                <th></th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values.map((value, index) => (
                                <tr key={index}>
                                    <td>{labels[index]}</td>
                                    <td>
                                        <input
                                            type="range"
                                            min="1"
                                            max="6"
                                            value={value}
                                            onChange={(event) => handleChange(index, event)}
                                        />
                                    </td>
                                    <td>
                                        <input type="text" value={value} readOnly />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td><label> Model:</label></td>
                                <td><input type="text" value={modelName} onChange={handleModelNameChange}/></td>
                                <td><input type="text" value={manufacturerName} /></td>
                            </tr>
                        </tbody>
                    </table>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type="submit" disabled={loading}>Submit</button>
                </form>
            </header>
            </div>
        </div>
    );
}

export default RecordPage;