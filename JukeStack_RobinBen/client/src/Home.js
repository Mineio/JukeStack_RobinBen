import "./Home.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  // const for displaying the songs
  const [songList, setSongList] = useState([]);
  // states for ausleihen
  const [AuslTime, setAuslTime] = useState(0);
  const [UserID, setUserID] = useState(0);
  const [SongID, setSongID] = useState(0);
  // states for displaying ausgeliehene songs
  const [RentedList, setRentedList] = useState([]);
  const [SongID2, setSongID2] = useState(0);
  const [SongID3, setSongID3] = useState(0);
  const [SongID4, setSongID4] = useState(0);
  const [SongID5, setSongID5] = useState(0);
  const [SongID6, setSongID6] = useState(0);

  const getRentedSongs = () => {
    getUserID();
    //console.log(UserID);
    Axios.get("http://localhost:3001/borrows?UserID=" + UserID).then(
      (response) => {
        //console.log(response);
        if (response.data.length == 5) {
          setSongID2(response.data[0].SongID);
          setSongID3(response.data[1].SongID);
          setSongID4(response.data[2].SongID);
          setSongID5(response.data[3].SongID);
          setSongID6(response.data[4].SongID);
        } else if (response.data.length == 4) {
          setSongID2(response.data[0].SongID);
          setSongID3(response.data[1].SongID);
          setSongID4(response.data[2].SongID);
          setSongID5(response.data[3].SongID);
        } else if (response.data.length == 3) {
          setSongID2(response.data[0].SongID);
          setSongID3(response.data[1].SongID);
          setSongID4(response.data[2].SongID);
        } else if (response.data.length == 2) {
          setSongID2(response.data[0].SongID);
          setSongID3(response.data[1].SongID);
        } else if (response.data.length == 1) {
          setSongID2(response.data[0].SongID);
        } else {
        }
      }
    );
  };
  const getActualRentedSongs = () => {
    getRentedSongs();
    Axios.get(
      "http://localhost:3001/actual?SongID2=" +
        SongID2 +
        "&SongID3=" +
        SongID3 +
        "&SongID4=" +
        SongID4 +
        "&SongID5=" +
        SongID5 +
        "&SongID6=" +
        SongID6
    ).then((response) => {
      if (response.data.length > 0) {
        setRentedList(response.data);
      } else {
        setRentedList(["None"]);
      }
    });
  };
  //ZURÜCKGEBEN
  const weg = (id) => {
    Axios.delete("http://localhost:3001/delete?id=" + id).then(
      (response) => {}
    );
    //window.location.reload();
    getAvailableSongs();
    getActualRentedSongs();
  };
  const getAvailableSongs = () => {
    Axios.get("http://localhost:3001/songs").then((response) => {
      setSongList(response.data);
    });
  };

  const getUserID = () => {
    Axios.get("http://localhost:3001/userdata").then((response) => {
      setUserID(response.data[0].UserID);
    });
  };
  //AUSLEIHEN
  const checkSongAmount = () => {
    let underFive = true;
    Axios.get("http://localhost:3001/usersongs").then((response) => {
      if (response.data.length >= 5) {
        underFive = false;
      }
    });
    return underFive;
  };
  const ausleihen = (id) => {
    var date = new Date();
    var formattedDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0");

    setAuslTime(formattedDate);
    getUserID();
    setSongID(id);
    let underFive = checkSongAmount();
    if (underFive == true) {
      Axios.post("http://localhost:3001/ausleihen", {
        AuslTime: AuslTime,
        UserID: UserID,
        SongID: SongID,
      }).then((response) => {
        if (response) {
          console.log(response);
        }
      });
      getActualRentedSongs();
      getAvailableSongs();
    } else {
      alert("Du kannst nur 5 Songs ausleihen");
    }
  };
  window.onload = getAvailableSongs();
  return (
    <div className="home">
      <button className="anzeigen" onClick={getActualRentedSongs}>
        Ausgeliehene Songs anzeigen
      </button>
      <div className="availableSongs">
        <div id="Wrapper">
          <div id="First">
            {songList.map((val, key) => {
              return (
                <div className="songList">
                  <div>
                    <h3>{val.SongName}</h3>
                    <h3>{val.SongArtist}</h3>
                  </div>
                  <button
                    className="ausleihen"
                    onClick={() => {
                      ausleihen(val.SongID);
                    }}
                  >
                    Ausleihen
                  </button>
                </div>
              );
            })}
          </div>
          
          <div id="Second">
            {RentedList.map((val, key) => {
              return (
                <div className="RentedList">
                  <div>
                    <h3>{val.SongName}</h3>
                    <h3>{val.SongArtist}</h3>
                  </div>
                  <button
                    className="zurückgeben"
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
    </div>
  );
}
export default Home;
