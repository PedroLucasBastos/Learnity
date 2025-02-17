import React, { useState } from "react";
import { subjectsData } from "./subjectsData";
import RecursiveTopic from "../recursiveTopic/recursiveTopic";

const SubjectsSelector = ({ selectedCourse, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  if (!selectedCourse || !subjectsData[selectedCourse]) {
    return (
      <p className="text-gray-500">
        Selecione um curso para ver as disciplinas.
      </p>
    );
  }

  const handleSelect = (item) => {
    const newSelected = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(newSelected);
    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded-lg shadow-md">
      {Object.keys(subjectsData[selectedCourse]).map((topLevelKey) => (
        <div
          key={topLevelKey}
          className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
        >
          <RecursiveTopic
            topic={topLevelKey}
            data={subjectsData[selectedCourse][topLevelKey]}
            onSelect={handleSelect}
            selectedItems={selectedItems}
            level={0}
          />
        </div>
      ))}
    </div>
  );
};

export default SubjectsSelector;
