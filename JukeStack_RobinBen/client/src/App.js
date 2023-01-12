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
  // states for displaying all Users
  const [userList, setUserList] = useState([]);
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
      console.log("sucess");
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      Email: loginEmail,
      Password: loginPassword,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus("Email oder Passwort falsch");
      } else {
        setLoginStatus("Eingeloggt als " + response.data[0].UserEmail);
        navigate("/home");
         
      }
    });
  };
  

  /*const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUserList(response.data); 
    });
  };*/

  return (
    <div className="App">
      <div className="Inputs">
        <label>Vorname</label>
        <input
          type="text"
          onChange={(event) => {
            setSurname(event.target.value);
          }}
        />
        <label>Nachname</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>E-Mail</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Passwort</label>
        <input
          type="password"
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
