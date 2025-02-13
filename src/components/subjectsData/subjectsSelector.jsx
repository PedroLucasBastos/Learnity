import React, { useState } from "react";
import { subjectsData } from "./subjectsData";
import { Checkbox } from "antd";

const SubjectsSelector = ({ selectedCourse }) => {
  const [openTopics, setOpenTopics] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  if (!selectedCourse || !subjectsData[selectedCourse]) {
    return (
      <p className="text-gray-500">
        Selecione um curso para ver as disciplinas.
      </p>
    );
  }

  const toggleTopic = (topic) => {
    setOpenTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const handleSelection = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className="space-y-4">
      {Object.keys(subjectsData[selectedCourse]).map((topic) => (
        <div key={topic} className="border p-2 rounded-lg">
          <button
            className="w-full text-left font-semibold text-primaryGreen hover:text-green-700"
            onClick={() => toggleTopic(topic)}
          >
            {topic}
          </button>
          {openTopics[topic] && (
            <div className="mt-2 space-y-1">
              {subjectsData[selectedCourse][topic].map((subject) => (
                <Checkbox
                  key={subject}
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => handleSelection(subject)}
                >
                  {subject}
                </Checkbox>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubjectsSelector;
