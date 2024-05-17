// PickerPage.js
import React, { useState } from 'react';
import '../App.css';

function PickerPage() {
    const [values, setValues] = useState(Array(9).fill(1)); // Default values
    const [predictedModel, setPredictedModel] = useState('');
    const [responseText, setResponseText] = useState('');
    const baseURL = process.env.REACT_APP_ml_base_url;
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true); // Set loading state to true
      // Construct the query parameters for the endpoint
      const queryParams = values.map((value, index) => `param${index + 1}=${value}`).join('&');
      const endpoint = `${baseURL}/process_data/?${queryParams}`;
  
      // Send values to server
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setResponseText(JSON.stringify(responseData));
        setPredictedModel(responseData['Predicted Model']);
        console.log('Response received:', responseData);
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
          <h1>Car Predictor</h1>
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
              </tbody>
            </table>
            <div className="row">
              <label>
                Predicted Model:
                <input type="text" value={predictedModel} readOnly />
              </label>
            </div>
            <button type="submit" disabled={loading}>Submit</button>
          </form>
        </header>
        </div>
      </div>
    );
}

export default PickerPage;