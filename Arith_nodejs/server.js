const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
    const { num1, num2, operation } = req.body;

    let result;

    if (operation === "add") {
        result = Number(num1) + Number(num2);
    } 
    else if (operation === "subtract") {
        result = Number(num1) - Number(num2);
    } 
    else if (operation === "multiply") {
        result = Number(num1) * Number(num2);
    } 
    else if (operation === "divide") {
        if (Number(num2) === 0) {
            return res.status(400).json({ error: "Cannot divide by zero" });
        }
        result = Number(num1) / Number(num2);
    } 
    else {
        return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ result });
});

app.listen(5000, () => {
    console.log("Backend running on http://localhost:5000");
});