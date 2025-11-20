import express from "express"

const app = express()

const PORT = 3000

// Required to parse JSON from POST requests
app.use(express.json());

// Variable to store the last value sent by the ESP
let lastValue = null;

// Route where your ESP is sending the POST request: /esp
app.post("/esp", (req, res) => {
    lastValue = req.body.value;   // We store the value
    console.log("Datos recibidos del ESP8266:");
    console.log(req.body);   // will see { value: X }

    res.json({ status: "ok", received: req.body });
});

// Root route that displays the last received value
app.get("/", (req, res) => {
    if (lastValue === null) {
        res.send("Aún no se ha recibido ningún valor del ESP8266.");
    } else {
        res.send(`El valor recibido es: ${lastValue}`);
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)

})