import "../styles/orga.css";
import { useState, useRef, useEffect } from "react";

function Organisation() {
  const groups = {
    Persönliches: [
      "Vorname",
      "Nachname",
      "Wohnort",
      "Telefonnummer",
      "Instagram",
      "Geburtstag",
    ],
    Treffpunkt: ["Mi früh", "Mi abend", "Noch Plätze frei?", "Fährt mit:"],
    Mitbringen: [
      "Pavillon",
      "5l Benzin",
      "Bierpong-Tisch",
      "Tisch",
      "Tischtennisbälle",
      "Spülstation",
      "Kühlschrank",
      "Kühlbox",
      "Wasserkanister",
      "Campingkocher + Gas",
      "Herdplatte",
      "Grill",
      "Holzkohle",
      "Schere",
      "Dosenöffner",
      "Küchenkrepp",
      "Eiswürfelmaschine",
      "Toilettenpapier",
      "Feuchttücher",
      "Mischpult",
      "Bluetooth-Box",
      "Trichter",
      "Wasserpistolen",
      "Flunkyball",
      "Seifenblasenmaschine",
      "Tattoos",
      "Flagge",
      "Minipool",
      "Campingstuhl",
      "Sofa",
    ],
    Reservierungen: ["Autostellplatz", "Zeltstellplatz"],
  };

  const groupColors = {
    Persönliches: "group-pers",
    Treffpunkt: "group-treff",
    Mitbringen: "group-mit",
    Reservierungen: "group-res",
  };
  const [activeGroup, setActiveGroup] = useState("Persönliches");

  const initialHeaders = Object.entries(groups).flatMap(([group, cols]) =>
    cols.map((col) => ({ label: col, group }))
  );

  const [headers, setHeaders] = useState(() => {
    const saved = localStorage.getItem("orgaHeaders");
    return saved ? JSON.parse(saved) : initialHeaders;
  });

  const [tableData, setTableData] = useState(() => {
    const saved = localStorage.getItem("orgaTableData");
    return saved ? JSON.parse(saved) : [Array(initialHeaders.length).fill("")];
  });

  const tableRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("orgaTableData", JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    localStorage.setItem("orgaHeaders", JSON.stringify(headers));
  }, [headers]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const addRow = () => {
    setTableData([...tableData, Array(headers.length).fill("")]);
  };

  const deleteRow = () => {
    if (tableData.length === 0) return;
    if (window.confirm("Letzte Zeile wirklich löschen?")) {
      setTableData(tableData.slice(0, -1));
    }
  };

  const addColumn = (colIndex) => {
    const label = prompt("Name der neuen Spalte:");
    if (!label) return;
  
    // immer die Gruppe der aktuellen Spalte übernehmen
    const group = headers[colIndex].group;
  
    const newHeaders = [...headers];
    newHeaders.splice(colIndex + 1, 0, { label, group });
    setHeaders(newHeaders);
  
    const newData = tableData.map((row) => {
      const newRow = [...row];
      newRow.splice(colIndex + 1, 0, "");
      return newRow;
    });
    setTableData(newData);
  };
  

  const deleteColumn = (colIndex) => {
    if (
      !window.confirm(`Spalte "${headers[colIndex].label}" wirklich löschen?`)
    )
      return;
    setHeaders(headers.filter((_, i) => i !== colIndex));
    setTableData(tableData.map((row) => row.filter((_, i) => i !== colIndex)));
  };

  const scrollToGroup = (group) => {
    const firstIndex = headers.findIndex((h) => h.group === group);
    if (firstIndex !== -1 && tableRef.current) {
      const th = tableRef.current.querySelectorAll("th")[firstIndex];
      if (th) {
        if (group === "Persönliches") {
          // Ganz nach links
          tableRef.current.parentElement.scrollLeft = 0;
        } else {
          // Scroll bis kurz vor die Spalte (Offset z. B. 20px)
          const offset = 165;
          tableRef.current.parentElement.scrollLeft = Math.max(
            th.offsetLeft - offset,
            0
          );
        }
      }
    }
    setActiveGroup(group);
  };
  

  return (
    <div>
      <h1>Organisation</h1>

      <div className="controls">
        {Object.keys(groups).map((group) => (
          <button key={group} onClick={() => scrollToGroup(group)}>
            {group}
          </button>
        ))}
        <button onClick={addRow}>Neue Zeile</button>
        <button onClick={deleteRow}>Zeile löschen</button>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {headers.map((h, colIndex) => (
                <th
                  key={colIndex}
                  className={groupColors[h.group]} // dynamische Klasse
                >
                  {h.label}
                  <br></br>
                  <button onClick={() => addColumn(colIndex)}>+</button>
                  <button onClick={() => deleteColumn(colIndex)}>-</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}

                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
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
