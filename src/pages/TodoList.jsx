import { useState } from "react";

const Item = ({ s, onComplete }) => {
  return (
    <>
      <div className="flex flex-row m-2">
        <input type="checkbox" className="m-1" onChange={onComplete}></input>
        <p className="">{s}</p>
      </div>
    </>
  );
};
const CompletedItem = ({ s, onUncomplete }) => {
  return (
    <>
      <div className="flex flex-row m-2">
        <input
          type="checkbox"
          className="m-1"
          checked="true"
          onChange={onUncomplete}
        ></input>
        <p className="">{s}</p>
      </div>
    </>
  );
};
export const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [itemName, setItemName] = useState("");
  const textFollow = (e) => {
    setItemName(e.currentTarget.value);
  };
  const addToArray = () => {
    setItems(items.concat(itemName));
    setItemName("");
    console.log(items);
  };

  const handleComplete = (itemIndex) => {
    const itemToMove = items[itemIndex];
    setItems(items.filter((_, index) => index !== itemIndex));
    setCompleted([...completed, itemToMove]);
  };
  const handleUncomplete = (itemIndex) => {
    const itemToMove = completed[itemIndex];
    setCompleted(completed.filter((_, index) => index !== itemIndex));
    setItems([...items, itemToMove]);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h3>This is a To-Do List</h3>
        <input
          type="text"
          value={itemName}
          onChange={textFollow}
          className="bg-inherit m-2 rounded-md border-2	border-white border-spacing-2"
        ></input>
        <button
          className="text-2xl bg-cyan-500 dark:bg-indigo-800 rounded-md p-2"
          onClick={addToArray}
        >
          Submit
        </button>
        <div className="mt-4">
          {items.map((item, index) => (
            <Item
              key={index}
              s={item}
              onComplete={() => handleComplete(index)}
            />
          ))}
        </div>
        <h3 className="text-3xl">Completed:</h3>
        <div>
          {completed.map((item, index) => (
            <CompletedItem
              key={index}
              s={item}
              onUncomplete={() => handleUncomplete(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
