// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');

//Function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badges and ${points} points in JavaScript`;
    console.log(message);
}

function getProfile(username) {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        console.log(response.statusCode);
        // Read the data - without the toString() it will return the buffer
        let body = "";
        response.on('data', data => {
            body += data.toString();
        });
        response.on('end', () => {
            // Parse the data
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        })
        //there is an end event and there needs to be an end handler

        // Print the data
    });
}

const users = process.argv.slice(2);

users.forEach(getProfile);
