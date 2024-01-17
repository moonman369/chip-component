import React, { useEffect, useRef, useState } from "react";
import SingleChip from "./SingleChip";
import Blockies from "react-blockies";

interface ChipProps {
  items: { _id: string; name: string; email: string }[];
}

const Chip: React.FC<ChipProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [highlightEnabled, setHighlightEnabled] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item: {
    _id: string;
    name: string;
    email: string;
  }) => {
    !selectedItems.includes(item) && setSelectedItems([...selectedItems, item]);
    setInputValue("");
  };

  const handleChipRemove = (item: {
    _id: string;
    name: string;
    email: string;
  }) => {
    const updatedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(updatedItems);
    setHighlightEnabled(false);
  };

  useEffect(() => {
    if (inputValue) {
      const itemsCopy = items;
      const filteredItemsStartsWith: {
        _id: string;
        name: string;
        email: string;
      }[] = [];
      const filteredItemsIncludes: {
        _id: string;
        name: string;
        email: string;
      }[] = [];

      for (let item of itemsCopy) {
        if (
          !selectedItems.includes(item) &&
          item.name.toLowerCase().startsWith(inputValue.toLowerCase(), 0)
        ) {
          filteredItemsStartsWith.push(item);
        }
      }
      filteredItemsStartsWith.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );

      for (let item of itemsCopy) {
        if (
          !selectedItems.includes(item) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          filteredItemsStartsWith
            .map((filItem) => filItem.name.toLowerCase())
            .indexOf(item.name.toLowerCase()) == -1
        ) {
          filteredItemsIncludes.push(item);
        }
      }
      filteredItemsIncludes.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );

      console.log(filteredItemsStartsWith, filteredItemsIncludes);
      setFilteredItems(() => [
        ...filteredItemsStartsWith,
        ...filteredItemsIncludes,
      ]);
    } else {
      setFilteredItems([]);
    }
    console.log(inputRef.current?.offsetLeft);
    console.log(divRef.current?.offsetWidth);
    divRef.current?.offsetWidth &&
      chipRef.current?.offsetWidth &&
      setInputWidth(
        divRef.current?.offsetWidth -
          chipRef.current?.offsetWidth -
          40 * selectedItems.length
      );
    console.log(inputWidth);
  }, [inputValue]);

  return (
    <div className="w-full">
      <h1 className="items-center text-3xl mb-10 text-green-600">
        Sample Chip Component
      </h1>
      <div
        ref={divRef}
        className="flex flex-row bg-white text-black flex-wrap px-3 mx-4 rounded-lg"
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && !inputValue) {
            if (!highlightEnabled) {
              setHighlightEnabled(true);
              return;
            } else {
              setSelectedItems((selectedItems) =>
                selectedItems.slice(0, selectedItems.length - 1)
              );
              setHighlightEnabled(false);
            }
          }
        }}
      >
        {selectedItems.map((selectedItem, index) => (
          <SingleChip
            key={selectedItem._id}
            item={selectedItem}
            handleChipRemove={handleChipRemove}
            highlight={highlightEnabled && index == selectedItems.length - 1}
          />
        ))}

        <div className="flex flex-col rounded-lg float-none overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
            className="border-none focus:outline-none py-3 px-3"
            // style={{ width: selectedItems.length > 0 ? inputWidth : "100%" }}
          />
        </div>
      </div>
      <div
        className={`mt-2 bg-white ml-[${
          inputRef.current?.offsetLeft
        }px] sm:w-1/3 w-full text-black rounded-lg ${
          filteredItems.length > 0
            ? "overflow-hidden h-[350px] overflow-y-scroll"
            : ""
        }`}
        style={{ marginLeft: inputRef.current?.offsetLeft }}
      >
        <ul>
          {filteredItems.map((item) => (
            <li
              key={item._id}
              onClick={() => handleItemClick(item)}
              className={`cursor-pointer hover:bg-gray-200 p-2 ml-[${inputRef.current?.offsetLeft}px] flex flex-row`}
            >
              <Blockies seed={item.email} className="rounded-full" />
              <div className="justify-between">
                <p className="ml-2 mt-1">{item.name}</p>
                <p className="ml-2 mt-1 text-gray-500 text-xs">{item.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chip;
