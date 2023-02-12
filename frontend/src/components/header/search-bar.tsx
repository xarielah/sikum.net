import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui-elements/button/button";
import ClassicInput from "../ui-elements/input/classic-input";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const searchRel = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value.trim());

  const goSearch = () => {
    if (!searchValue) return searchRel.current?.focus();

    navigate(`/posts/search?q=${searchValue}`);
    setSearchValue("");
  };

  return (
    <section className="flex flex-row-reverse justify-center md:justify-start space-x-3 p-4">
      <Button onClick={goSearch}>חיפוש</Button>
      <ClassicInput
        ref={searchRel}
        value={searchValue}
        onChange={onChangeHandler}
        placeholder="חיפוש לפי מונח, כותרת, מילים חלקיות..."
      />
    </section>
  );
};

export default SearchBar;
