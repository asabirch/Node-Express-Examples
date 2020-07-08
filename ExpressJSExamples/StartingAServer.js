// Import the express library here
const express = require('express');
// Instantiate the app here
const app = express();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
	console.log('server is listening for requests');
});

// Invoke the app's `.listen()` method below:
