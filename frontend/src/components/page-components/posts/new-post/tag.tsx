interface ITagProps {
  tag: string;
  removeTag: () => void;
}

const Tag = ({ tag, removeTag }: ITagProps) => {
  return (
    <div className="bg-cyan-300/30 p-1 rounded-xl px-2 text-sm flex gap-1 border-b-2 border-cyan-800/30 shadow-sm items-center justify-center">
      {tag}
      <div
        onClick={removeTag}
        className="rounded-full bg-cyan-400/40 p-2 w-5 h-5 flex items-center justify-center text-sm cursor-pointer hover:bg-red-600/60 duration-300 ease-in-out hover:text-white"
      >
        &#x2715;
      </div>
    </div>
  );
};

export default Tag;
