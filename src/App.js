import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === "[object Date]";
    }

    function isObj(val) {
        return typeof val === "object";
    }

    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val);
        } else {
            return val;
        }
    }

    function buildForm({ action, params }) {
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", action);

        Object.keys(params).forEach((key) => {
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", key);
            input.setAttribute("value", stringifyValue(params[key]));
            form.appendChild(input);
        });

        return form;
    }

    function post(details) {
        const form = buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    }

    const handlePayment = (e) => {
        e.preventDefault();
        axios
            .post("https://paytm-backend.vercel.app/api/payment", {
                amount: 5000,
                email: "abc@gmail.comup",
                phoneno: "9876543211",
            })
            .then((res) => {
                console.log(res.data);
                let info = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: res.data,
                };
                post(info);
            });
    };
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handlePayment}> Pay </button>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
