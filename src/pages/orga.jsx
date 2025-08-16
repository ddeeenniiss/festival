import "../styles/orga.css";
import {useState} from 'react';
function Organisation() {
  const groups = {
    Persönliches: ["Vorname", "Nachname", "Wohnort", "Telefonnummer", "Instagram", "Geburtstag"],
    Treffpunkt: ["Mi früh", "Mi abend"],
    Mitbringen: ["Mitbringen1", "Mitbringen2"] // Beispiel
  };

  const [activeGroup, setActiveGroup] = useState("Persönliches");

  // Initiale Header
  const initialHeaders = Object.entries(groups).flatMap(([group, cols]) =>
    cols.map((col) => ({ label: col, group }))
  );

  const [headers, setHeaders] = useState(initialHeaders);

  // Tabelle: Array von Zeilen, jede Zeile = Array von Zellen
  const [tableData, setTableData] = useState([
    Array(headers.length).fill("") // erste Zeile leer
  ]);

  // Wert in einer Zelle ändern
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  // Neue Zeile hinzufügen
  const addRow = () => {
    setTableData([...tableData, Array(headers.length).fill("")]);
  };

  // Neue Spalte hinter einer bestehenden Spalte einfügen
  const addColumn = (colIndex) => {
    const label = prompt("Name der neuen Spalte:");
    if (!label) return;

    // Header hinzufügen
    const newHeaders = [...headers];
    newHeaders.splice(colIndex + 1, 0, { label, group: headers[colIndex].group });
    setHeaders(newHeaders);

    // Alle Zeilen anpassen
    const newData = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(colIndex + 1, 0, "");
      return newRow;
    });
    setTableData(newData);
  };

  // Zeilen nach activeGroup filtern (für Teillisten)
  const filteredCols = headers
    .map((h, i) => (h.group === activeGroup ? i : null))
    .filter((i) => i !== null);

  return (
    <div>
      <h1>Orga-Seite</h1>

      {/* Buttons für Teillisten */}
      <div style={{ marginBottom: "1rem" }}>
        {Object.keys(groups).map((group) => (
          <button key={group} onClick={() => setActiveGroup(group)} style={{ marginRight: "0.5rem" }}>
            {group}
          </button>
        ))}
        <button onClick={addRow}>Neue Zeile</button>
      </div>

      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {headers.map((h, colIndex) => (
              <th key={colIndex}>
                {h.label}{" "}
                <button onClick={() => addColumn(colIndex)} style={{ fontSize: "0.6rem" }}>
                  +
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: "100%" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Teilliste: {activeGroup}</h2>
      <table border="1" style={{ marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {filteredCols.map((i) => (
              <th key={i}>{headers[i].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {filteredCols.map((i) => (
                <td key={i}>{row[i]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Organisation;
