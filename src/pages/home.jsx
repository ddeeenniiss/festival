import { useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "../styles/home.css";

function Home() {
  const [inviteText, setInviteText] = useState("");
  const [inputField, setInputField] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sendInvite = () => {
    alert(`Lade ein für "${inviteText}"`);
    setInviteText("");
    setInputField(false);
  };
  return (
    <>
      <div className="container">
        <button id="currentLocation">Location</button>
        <button id="menu" onClick={() => setShowMenu(!showMenu)}>
          ORGA
        </button>
        <button id="addInvite" onClick={() => setInputField(true)}>
          +
        </button>
      </div>
      <div>
          <h2>Nächste Festivals: </h2>
          <p>SMS</p> <p>Am 05.08.2026</p><p>Noch ... Tage!!</p><button>Bin dabei</button>
          <p>Parookaville</p> <button>Bin dabei</button>
      </div>

      {showMenu && (
  <div className="sidebar">
    <ul>
      <li><Link smooth to="/orga#reservierungen">Reservierungen</Link></li>
      <li><Link smooth to="/orga#mitbringen">Wer bringt was mit?</Link></li>
      <li><Link smooth to="/orga#anschaffungen">Anschaffungsideen</Link></li>
      <li><Link smooth to="/orga#vierte">Vierte</Link></li>
    </ul>
  </div>
)}

      {inputField && (
        <div>
          <input
            type="text"
            value={inviteText}
            onChange={(e) => setInviteText(e.target.value)}
            placeholder="Einladungstext"
          />
          <button onClick={sendInvite}>DONE</button>
        </div>
      )}
    </>
  );
}

export default Home;
