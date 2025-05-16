document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#disaster-data');
  
    // Show Loading Message
    tableBody.innerHTML = '<tr><td colspan="6">Loading data, please wait...</td></tr>';
  
    try {
      // Fetch Data from API
      const response = await fetch('/api/disasters');
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Check for Data Availability
      if (!data || !data.data || data.data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">No disaster data available.</td></tr>';
        return;
      }
  
      // Clear Table and Render Data
      tableBody.innerHTML = '';
      data.data.forEach((disaster, index) => {
        const row = document.createElement('tr');
  
        const date = disaster.fields?.date?.created
          ? new Date(disaster.fields.date.created).toLocaleDateString()
          : '-';
        const time = disaster.fields?.date?.created
          ? new Date(disaster.fields.date.created).toLocaleTimeString()
          : '-';
        const location = disaster.fields?.country?.[0]?.name || '-';
        const countryCode = disaster.fields?.country?.[0]?.iso3 || '-';
        
        // Extracting Cause
        const cause = disaster.fields?.primary_type 
          ? (Array.isArray(disaster.fields.primary_type) 
            ? disaster.fields.primary_type.map(type => type.name).join(', ')
            : disaster.fields.primary_type.name)
          : '-';
  
        // Append Data to Table
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${date}</td>
          <td>${location}</td>
          <td>${countryCode}</td>
          <td>${cause}</td>
          <td>${time}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
      tableBody.innerHTML = '<tr><td colspan="6">Failed to load data. Please try again later.</td></tr>';
    }
  });
  