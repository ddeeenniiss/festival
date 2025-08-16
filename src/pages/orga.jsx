import "../styles/orga.css";
import { useState, useRef } from "react";

function Organisation() {
  const groups = {
    Persönliches: ["Vorname", "Nachname", "Wohnort", "Telefonnummer", "Instagram", "Geburtstag"],
    Treffpunkt: ["Mi früh", "Mi abend"],
    Mitbringen: ["Mitbringen1", "Mitbringen2"]
  };

  const [activeGroup, setActiveGroup] = useState("Persönliches");

  const initialHeaders = Object.entries(groups).flatMap(([group, cols]) =>
    cols.map((col) => ({ label: col, group }))
  );

  const [headers, setHeaders] = useState(initialHeaders);
  const [tableData, setTableData] = useState([Array(initialHeaders.length).fill("")]);

  // Ref auf die Tabelle, um scrollen zu können
  const tableRef = useRef(null);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const addRow = () => {
    setTableData([...tableData, Array(headers.length).fill("")]);
  };

  const addColumn = (colIndex) => {
    const label = prompt("Name der neuen Spalte:");
    if (!label) return;

    const newHeaders = [...headers];
    newHeaders.splice(colIndex + 1, 0, { label, group: headers[colIndex].group });
    setHeaders(newHeaders);

    const newData = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(colIndex + 1, 0, "");
      return newRow;
    });
    setTableData(newData);
  };

  const deleteColumn = (colIndex) => {
    const confirmDelete = window.confirm(`Spalte "${headers[colIndex].label}" wirklich löschen?`);
    if (!confirmDelete) return;

    const newHeaders = headers.filter((_, i) => i !== colIndex);
    setHeaders(newHeaders);

    const newData = tableData.map((row) => row.filter((_, i) => i !== colIndex));
    setTableData(newData);
  };

  const scrollToGroup = (group) => {
    const firstIndex = headers.findIndex((h) => h.group === group);
    if (firstIndex !== -1 && tableRef.current) {
      const th = tableRef.current.querySelectorAll("th")[firstIndex];
      if (th) th.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
    setActiveGroup(group);
  };

  return (
    <div>
      <h1>Orga-Seite</h1>

      {/* Buttons für Überthemen */}
      <div style={{ marginBottom: "1rem" }}>
        {Object.keys(groups).map((group) => (
          <button key={group} onClick={() => scrollToGroup(group)} style={{ marginRight: "0.5rem" }}>
            {group}
          </button>
        ))}
        <button onClick={addRow}>Neue Zeile</button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table ref={tableRef} border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              {headers.map((h, colIndex) => (
                <th key={colIndex}>
                  {h.label}{" "}
                  <button onClick={() => addColumn(colIndex)} style={{ fontSize: "0.6rem" }}>
                    +
                  </button>
                  <button onClick={() => deleteColumn(colIndex)} style={{ fontSize: "0.6rem", marginLeft: "0.2rem" }}>
                    -
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
      </div>
    </div>
  );
}

export default Organisation;
