import React, { useState } from "react";
import { Checkbox } from "antd";
import "./recursiveTopic.css";

const RecursiveTopic = ({
  topic, // nome do tópico (por exemplo, "1º ANO", "Gramática", etc.)
  data, // conteúdo do tópico (pode ser um objeto ou um array)
  onSelect, // função para manipular a seleção
  selectedItems,
  level = 0, // nível para indentação
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const indentStyle = { marginLeft: level * 20 };

  if (Array.isArray(data)) {
    return (
      <div style={indentStyle}>
        <strong>{topic}</strong>
        <div className="subtopic-container">
          {data.map((item, index) => (
            <div
              key={item + index}
              className="checkbox-item"
              style={{ marginLeft: 20 }}
            >
              <Checkbox
                checked={selectedItems.includes(item)}
                onChange={() => onSelect(item)}
              >
                {item}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (typeof data === "object") {
    return (
      <div style={indentStyle}>
        <button
          onClick={toggleOpen}
          style={{
            background: "none",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {topic}
        </button>
        <div className={`subtopic-container ${isOpen ? "" : "collapsed"}`}>
          {isOpen && (
            <div>
              {Object.keys(data).map((subKey) => (
                <RecursiveTopic
                  key={subKey}
                  topic={subKey}
                  data={data[subKey]}
                  onSelect={onSelect}
                  selectedItems={selectedItems}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default RecursiveTopic;
