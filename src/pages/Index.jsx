import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Index = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [newColumn, setNewColumn] = useState("");
  const [newRow, setNewRow] = useState("");

  const addColumn = () => {
    if (newColumn.trim() !== "") {
      setColumns([...columns, newColumn]);
      setNewColumn("");
    }
  };

  const addRow = () => {
    if (newRow.trim() !== "") {
      setRows([...rows, newRow]);
      setNewRow("");
    }
  };

  const toggleCell = (rowIndex, colIndex) => {
    const updatedRows = rows.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        const updatedRow = row.map((cell, cIndex) => {
          if (cIndex === colIndex) {
            return cell === "✅" ? "❌" : "✅";
          }
          return cell;
        });
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Comparison Table</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          placeholder="New Column Header"
        />
        <Button onClick={addColumn}>Add Column</Button>
      </div>
      <div className="flex space-x-2 mb-4">
        <Input
          value={newRow}
          onChange={(e) => setNewRow(e.target.value)}
          placeholder="New Row Header"
        />
        <Button onClick={addRow}>Add Row</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2"></th>
              {columns.map((col, colIndex) => (
                <th
                  key={colIndex}
                  className="border border-gray-300 p-2"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 p-2">{row}</td>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="border border-gray-300 p-2 text-center cursor-pointer"
                    onClick={() => toggleCell(rowIndex, colIndex)}
                  >
                    {rows[rowIndex][colIndex] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;