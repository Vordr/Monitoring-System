// Express for building Rest API's
const express = require("express");
// Body-Parser helps to parse the requests and create the req.body object
const bodyParser = require("body-parser");
// Cors provides Express middleware to enable CORS with various options
const cors = require("cors");

const app = express();


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // Drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to monitoring application" });
});

require("./app/routes/monitors.routes")(app);
require("./app/routes/monitorings.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});