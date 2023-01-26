import "./App.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  // states for registering
  const [Surname, setSurname] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  // states for Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  // states for redirecting
  const navigate = useNavigate();

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      Surname: Surname,
      Name: Name,
      Email: Email,
      Password: Password,
    }).then((response) => {
      console.log("registered");
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      Email: loginEmail,
      Password: loginPassword,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus("Email oder Passwort falsch");
      } else if (response.data[0].UserID != 1000) {
        setLoginStatus("Eingeloggt als " + response.data[0].UserEmail);
        navigate("/home");
      } else {
        navigate("/Adminpage");
      }
    });
  };

  return (
    <div className="App">
      <div className="Inputs">
        <h2>Registrieren</h2>
       
        <input
          type="text"
          placeholder="Vorname..."
          onChange={(event) => {
            setSurname(event.target.value);
          }}
        />
        
        <input
          type="text"
          placeholder="Nachname..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        
        <input
          type="text"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        
        <input
          type="password"
          placeholder="Passwort..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={register}>Registrieren</button>
      </div>
      <div className="Login">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Passwort..."
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
