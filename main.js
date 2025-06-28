g_status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

fetch('./json/config.json')
    .then(response => response.json())
    .then(data => {
        // Assuming the config.json contains the IP and port
        ipAddress = data.CARD_READER_IP;
        port = data.SERVER_PORT;
        console.log(`IP Address: ${ipAddress}, Port: ${port}`);
    })
    .catch(error => {
        console.error('Error fetching config:', error);
    });

function handleEntryExit(id) {
    // If g_status[i] is 0, set it to 1, and send http message
    if (g_status[id] === 0) {
        g_status[id] = 1;
        console.log(`Entry detected for ID: ${id}`);
        // Here you would send a http message to the IP
        fetch(`http://${ipAddress}:${port}/entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, status: 'entry' })
        });
    } else {
        g_status[id] = 0;
        console.log(`Exit detected for ID: ${id}`);
        // Here you would send a http message to the IP
        fetch(`http://${ipAddress}:${port}/exit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, status: 'exit' })
        });
    }
}