interface IMaxDescCharsProps {
  current: number;
  max: number;
}

const MaxDescChars = ({ current, max }: IMaxDescCharsProps) => {
  return (
    <span
      className={`duration-300 ease-in-out text-sm ${
        current > max ? "text-red-500 font-bold" : "text-green-500"
      }`}
    >
      {max - current < 0
        ? `אתם בחריגה של ${Math.abs(max - current)} אותיות.`
        : `${max - current}/${max}`}
    </span>
  );
};

export default MaxDescChars;
