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
  const inputRef = useRef<HTMLInputElement>(null);

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
      // items.filter(
      //   (item) =>
      //     !selectedItems.includes(item) && item.name.includes(inputValue)
      // );
      for (let item of itemsCopy) {
        if (
          !selectedItems.includes(item) &&
          item.name.toLowerCase().startsWith(inputValue.toLowerCase(), 0)
        ) {
          filteredItemsStartsWith.push(item);
        }
      }
      for (let item of itemsCopy) {
        if (
          !selectedItems.includes(item) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        ) {
          filteredItemsIncludes.push(item);
        }
      }
      console.log(filteredItemsStartsWith, filteredItemsIncludes);
      setFilteredItems((filteredItems) => [
        ...filteredItemsStartsWith,
        ...filteredItemsIncludes,
      ]);
    } else {
      setFilteredItems([]);
    }
    console.log(inputRef.current?.offsetLeft);
  }, [inputValue]);

  return (
    <div className="w-full">
      <h1 className="items-center text-3xl mb-10 text-green-600">
        Sample Chip Component
      </h1>
      <div className="flex flex-row bg-white text-black flex-wrap">
        {selectedItems.map((selectedItem) => (
          <SingleChip
            key={selectedItem._id}
            item={selectedItem}
            handleChipRemove={handleChipRemove}
          />
        ))}

        <div className="flex flex-col">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder=""
            className="border-none focus:outline-none w-full py-3 px-3"
          />
        </div>
      </div>
      <div
        className={`mt-2 bg-white ml-[${inputRef.current?.offsetLeft}px] w-1/3 text-black`}
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
