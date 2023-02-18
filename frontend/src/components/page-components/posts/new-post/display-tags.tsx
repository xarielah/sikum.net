import Button from "../../../ui-elements/button/button";
import Tag from "./tag";

interface IDisplayTagsProps {
  tags: string[];
  removeTag: (tag: string) => void;
  removeAll: () => void;
}

const DisplayTags = ({ tags, removeTag, removeAll }: IDisplayTagsProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <article className="border-[1px] rounded-lg p-3 text-sm border-slate-200 flex gap-3 flex-wrap">
        {!tags || tags.length === 0 ? (
          <p className="flex justify-center w-full text-center">
            אין תגיות משויכות כרגע לפוסט רצוי להוסיף תגיות לפוסט,
            <br />
            אלו יסיעו באיתור קל יותר של הפוסט עבור משתמשים אחרים.
          </p>
        ) : (
          tags.map((tag, i) => (
            <Tag key={i} removeTag={() => removeTag(tag)} tag={tag} />
          ))
        )}
      </article>
      {tags.length > 0 ? (
        <Button onClick={removeAll} type="button" className="w-max text-sm">
          הסר הכל
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default DisplayTags;
