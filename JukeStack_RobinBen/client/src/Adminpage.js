import Axios from "axios";
import { useState } from "react";
import "./Adminpage.css";

function Adminpage() {
  const [userList, setUserList] = useState([]);
  const [songList, setSongList] = useState([]);
  const [userID, setUserID] = useState([]);

  const displayUsers = () => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setUserList(response.data);
    });
  };
  const getSongIDs = (UserID) => {
    setUserID(UserID);
    Axios.get("http://localhost:3001/getSongIDs?UserID=" + UserID).then(
      (response) => {
        setSongList(response.data);
      }
    );
  };
  const weg = (id) => {
    Axios.delete("http://localhost:3001/delete?id=" + id).then(
      (response) => {}
    );
    getSongIDs(userID);
  };

  window.onload = displayUsers();
  return (
    <div className="Adminpage">
      <div id="Wrapper">
        <div id="First">
          {userList.map((val, key) => {
            return (
              <div className="userList">
                <div>
                  <h3>{val.UserVorname}</h3>
                  <h3>{val.UserNachname}</h3>
                  <h3>{val.UserEmail}</h3>
                </div>
                <button
                  className="selectUser"
                  onClick={() => {
                    getSongIDs(val.UserID);
                  }}
                >
                  Ausleihen anzeigen
                </button>
              </div>
            );
          })}
        </div>

        <div id="Second">
          {songList.map((val, key) => {
            return (
              <div className="songList">
                <div>
                  <h3>{val.SongName}</h3>
                  <h3>{val.SongArtist}</h3>
                </div>
                <button
                  className="removeSong"
                  onClick={() => {
                    weg(val.SongID);
                  }}
                >
                  Song zurückgeben
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Adminpage;
