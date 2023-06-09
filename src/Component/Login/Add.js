import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [emp_id, setEmployeeID] = useState('');
  const [member, setMember] = useState('');
  const [position, setPosition] = useState('');
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();

    if (emp_id.trim() === '') {
      console.error('Employee ID is required');
      return;
    }

    var database_id = document.getElementById('database').value;
    const newData = {
      emp_id: emp_id,
      member: member,
      position: position,
      remarks: remarks
    };

    var url = database_id === 'RD' ? 'http://localhost:8000/rdadd/' : 'http://localhost:8000/dbadd/';

    axios
      .post(url, newData)
      .then((response) => {
        console.log('Added in database', database_id);
        navigate('/hometest');
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });

    // Reset the form fields after submitting
    setEmployeeID('');
    setMember('');
    setPosition('');
    setRemarks('');
  };

  return (
    <div>
      <h2>Add Data:</h2>
      <div>
        <label>Employee ID:</label>
        <input type="text" value={emp_id} onChange={(e) => setEmployeeID(e.target.value)} />
      </div>
      <form onSubmit={handleAdd}>
        <div>
          <label>Member:</label>
          <input type="text" value={member} onChange={(e) => setMember(e.target.value)} />
        </div>
        <div>
          <label>Position:</label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
        </div>
        <div>
          <label>Remarks:</label>
          <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <div>
          <label>Select:</label>
          <select id="database">
            <option value="RD">RD</option>
            <option value="DB">DB</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Add;
