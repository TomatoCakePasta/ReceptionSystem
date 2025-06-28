
g_status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
function handleEntryExit(id) {
    // If g_status[i] is 0, set it to 1, and send http message
    if (g_status[id] === 0) {
        g_status[id] = 1;
        console.log(`Entry detected for ID: ${id}`);
        // Here you would send a http message to the IP
        fetch(`http://your-ip-address/entry`, {
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
        fetch(`http://your-ip-address/exit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, status: 'exit' })
        });
    }
}