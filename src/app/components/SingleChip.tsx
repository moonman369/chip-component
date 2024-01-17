import Blockies from "react-blockies";
import { RxCross2 } from "react-icons/rx";

interface SingleChipProps {
  item: { _id: string; name: string; email: string };
  handleChipRemove: Function;
  highlight: boolean;
}

const SingleChip: React.FC<SingleChipProps> = ({
  item,
  handleChipRemove,
  highlight,
}) => {
  return (
    <div
      key={item._id}
      className={`${
        highlight
          ? "bg-blue-300 border-2 border-black font-bold"
          : "bg-blue-200"
      } text-gray-700 rounded-full mr-2 mt-2 mb-2 flex flex-row justify-between pr-4`}
    >
      <Blockies
        seed={item.email}
        // color="#dfe"
        // bgColor="#ffe"
        // spotColor="#abc"
        className="rounded-full mr-2"
      />
      <p className="mt-1 ">{item.name}</p>
      <button onClick={() => handleChipRemove(item)} className="ml-2">
        <RxCross2 />
      </button>
    </div>
  );
};

export default SingleChip;
