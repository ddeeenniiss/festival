import { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [inviteText, setInviteText] = useState("");
  const [inputField, setInputField] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [festivals, setFestivals] = useState(() => {
    const saved = localStorage.getItem("festivals");
    const initial = saved
      ? JSON.parse(saved)
      : [
          { name: "SMS", start: "2026-08-06", end: "2026-08-10", participant: "" },
          { name: "Parookaville", start: "2026-07-20", end: "2026-07-23", participant: "" },
          { name: "Defqon 1", start: "2026-06-25", end: "2026-06-28", participant: "" },
          { name: "Airbeat One", start: "2026-07-08", end: "2026-07-12", participant: "" },
        ];
    return initial.sort((a,b) => new Date(a.start) - new Date(b.start));
  });
  

  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  const navigate = useNavigate();

  // Speichert Festivals in localStorage, wenn sich etwas ändert
  useEffect(() => {
    localStorage.setItem("festivals", JSON.stringify(festivals));
  }, [festivals]);

  const sendInvite = () => {
    alert(`Lass uns sinnvolles tun: "${inviteText}"`);
    setInviteText("");
    setInputField(false);
  };

  const addFestival = () => {
    const newFestival = {
      name: "Neues Festival",
      start: new Date().toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
      participant: ""
    };
    const updated = [...festivals, newFestival];
    updated.sort((a, b) => new Date(a.start) - new Date(b.start));
    setFestivals(updated);
  };
  
  const deleteFestival = (index) => {
    if (window.confirm(`Willst du das Festival "${festivals[index].name}" wirklich löschen?`)) {
      const updated = [...festivals];
      updated.splice(index, 1);
      setFestivals(updated);
    }
  };
  

  const handleParticipate = (index) => {
    setEditingIndex(index);
    setNewName(festivals[index].participant);
  };

  const saveParticipant = (index) => {
    const updated = [...festivals];
    updated[index].participant = newName;
    setFestivals(updated);
    setEditingIndex(null);
  };

  const daysLeft = (start) => {
    const today = new Date();
    const startDate = new Date(start);
    const diff = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
  };

  return (
    <>
      <div className="container">
        <button id="menu" onClick={() => setShowMenu(!showMenu)}>
          ORGA
        </button>
      </div>

      <div className="incomingFestivals">
  <table>
    <thead>
      <tr>
        <th>Festival</th>
        <th>Datum</th>
        <th>Wie viel Tage noch</th>
        <th>Teilnehmer</th>
        <th>Nimmst du teil?</th>
        <th>Löschen</th>
      </tr>
    </thead>
    <tbody>
  {festivals.map((festival, index) => (
    <tr key={index}>
      {/* Festival Name */}
      <td>
        <input
          type="text"
          value={festival.name}
          onChange={(e) => {
            const updated = [...festivals];
            updated[index].name = e.target.value;
            setFestivals(updated);
          }}
        />
      </td>

      {/* Datum */}
      <td>
        <input
          type="date"
          value={festival.start}
          onChange={(e) => {
            const updated = [...festivals];
            updated[index].start = e.target.value;
            setFestivals(updated);
          }}
        />
        -
        <input
          type="date"
          value={festival.end}
          onChange={(e) => {
            const updated = [...festivals];
            updated[index].end = e.target.value;
            setFestivals(updated);
          }}
        />
      </td>

      {/* Tage noch */}
      <td>{daysLeft(festival.start)}</td>

      {/* Teilnehmer */}
      <td>
        <input
          type="text"
          value={festival.participant}
          onChange={(e) => {
            const updated = [...festivals];
            updated[index].participant = e.target.value;
            setFestivals(updated);
          }}
        />
      </td>

      {/* Nimmst du teil? */}
      <td>
        {festival.editing ? (
          <>
            <input
              type="text"
              value={festival.participant}
              onChange={(e) => {
                const updated = [...festivals];
                updated[index].participant = e.target.value;
                setFestivals(updated);
              }}
            />
            <button
              onClick={() => {
                const updated = [...festivals];
                updated[index].editing = false;
                setFestivals(updated);
              }}
            >
              Speichern
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              const updated = [...festivals];
              updated[index].editing = true;
              setFestivals(updated);
            }}
          >
            Bin dabei
          </button>
        )}
      </td>

      {/* Löschen */}
      <td>
        <button onClick={() => deleteFestival(index)}>Löschen</button>
      </td>
    </tr>
  ))}
</tbody>



  </table>

  {/* Button unter der Tabelle */}
  <button onClick={addFestival} style={{ marginTop: "10px" }}>Neue Zeile einfügen</button>
</div>


      {showMenu && (
        <div className="sidebar">
          <ul>
            <li>
              <Link smooth to="/orga">
                Persönliches
              </Link>
            </li>
            <li>
              <Link smooth to="/orga">
                Treffpunkt
              </Link>
            </li>
            <li>
              <Link smooth to="/orga">
                Wer bringt was mit?
              </Link>
            </li>
            <li>
              <Link smooth to="/orga">
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
