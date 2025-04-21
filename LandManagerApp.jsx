import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import LandForm from './LandForm';
import api from './services/api';

function LandManagerApp() {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      const response = await api.get('/land');
      setLands(response.data);
    } catch (error) {
      console.error('Error fetching lands:', error);
    }
  };

  const handleSelectLand = (land) => {
    setSelectedLand(land);
  };

  const handleSaveLand = async (landData) => {
    try {
      if (landData.id) {
        // Update existing land
        await api.put(`/land/${landData.id}`, landData);
      } else {
        // Create new land
        await api.post('/land', landData);
      }
      fetchLands();
      setSelectedLand(null);
    } catch (error) {
      console.error('Error saving land:', error);
    }
  };

  const handleDeleteLand = async (id) => {
    try {
      await api.delete(`/land/${id}`);
      fetchLands();
      setSelectedLand(null);
    } catch (error) {
      console.error('Error deleting land:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar lands={lands} onSelectLand={handleSelectLand} />
      <div style={{ flex: 1, padding: '20px' }}>
        <LandForm
          selectedLand={selectedLand}
          onSave={handleSaveLand}          // Ensure this prop is correctly passed
          onDelete={handleDeleteLand}
        />
      </div>
    </div>
  );
}

export default LandManagerApp;
