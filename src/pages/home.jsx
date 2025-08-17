import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import "../styles/home.css";

function Home() {
  const [inviteText, setInviteText] = useState("");
  const [inputField, setInputField] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const sendInvite = () => {
    alert(`Lass uns sinnvolles tun: "${inviteText}"`);
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
      <div className="incomingFestivals">
        <table>
            <tr>
          <th>Nächste Festivals: </th>
          <th>Datum: </th>
          <th>Wie viel Tage noch: </th>
          <th>Nimmst du teil?</th>
          </tr>
          <tr>
            <td>SMS</td>
            <td>06.08.2026 - 10.08.2025</td>
            <td>Noch ... Tage!!</td>
            <td>
              <button>Bin dabei</button>
            </td>
          </tr>
          <tr><td>Parookaville</td><td>Datum</td><td>Tage left</td> <td><button>Bin dabei</button></td></tr>
          <tr><td>Defqon 1</td><td>25.06.2025 - 28.06.2025</td><td>Tage left</td> <td><button>Bin dabei</button></td></tr>
          <tr><td>Airbeat One</td><td>08.07.2025 - 12.07.2025</td><td>Tage left</td> <td><button>Bin dabei</button></td></tr>
        </table>
      </div>

      {showMenu && (
        <div className="sidebar">
          <ul>
            <li>
              <Link smooth to="/orga#persönliches">
                Persönliches
              </Link>
            </li>
            <li>
              <Link smooth to="/orga#treffpunkt">
                Treffpunkt
              </Link>
            </li>
            <li>
              <Link smooth to="/orga#mitbringen">
                Wer bringt was mit?
              </Link>
            </li>
            <li>
              <Link smooth to="/orga#reservierungen">
                Wie viel Platz muss reserviert werden?
              </Link>
            </li>
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
