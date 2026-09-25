import { useState } from "react";
import "./App.css";

function App() {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [result, setResult] = useState("");

    const calculate = async (operation) => {
        try {
            const response = await fetch("http://localhost:5000/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    num1: Number(num1),
                    num2: Number(num2),
                    operation: operation
                })
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data.result);
            } else {
                setResult(data.error);
            }
        } catch (error) {
            setResult("Backend server is not running");
        }
    };

    return (
        <div className="container">
            <h1>Arithmetic Calculator</h1>

            <input
                type="number"
                placeholder="Enter first number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
            />

            <input
                type="number"
                placeholder="Enter second number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
            />

            <div className="buttons">
                <button onClick={() => calculate("add")}>+</button>
                <button onClick={() => calculate("subtract")}>-</button>
                <button onClick={() => calculate("multiply")}>×</button>
                <button onClick={() => calculate("divide")}>÷</button>
            </div>

            <h2>Result: {result}</h2>
        </div>
    );
}

export default App;