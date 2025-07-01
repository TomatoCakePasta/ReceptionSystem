g_status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
g_red = 255; // Default color
g_green = 0; // Default color
g_blue = 0; // Default color


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
            body: JSON.stringify({ id: id, status: 'entry', color: { r: g_red, g: g_green, b: g_blue } })
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

function setColor(color) {
    [g_red, g_green, g_blue] = hexToRgb(color);
    console.log(`Color set to: ${color}, RGB: ${g_red}, ${g_green}, ${g_blue}`);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}