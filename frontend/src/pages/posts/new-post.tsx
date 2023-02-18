import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormFieldError from "../../components/page-components/forms/form-field-error";
import DisplayTags from "../../components/page-components/posts/new-post/display-tags";
import MaxDescChars from "../../components/page-components/posts/new-post/max-desc-chars";
import Button from "../../components/ui-elements/button/button";
import ClassicInput from "../../components/ui-elements/input/classic-input";
import ClassicSelect from "../../components/ui-elements/input/classic-select";
import ClassicTextarea from "../../components/ui-elements/input/classic-textarea";
import RippleLoading from "../../components/ui-elements/loading/ripple-loading";
import { axiosClient } from "../../service/axios/axiosClient";

const schema = yup
  .object({
    title: yup.string().required("שדה כותרת הוא שדה חובה").max(32),
    description: yup.string().max(256).required("שדה תיאור הוא שדה חובה"),
    topicId: yup.string().default(""),
  })
  .required();

const NewPost = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagError, setTagError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const tagInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const topicResults = await axiosClient
          .get("/topic")
          .finally(() => setLoading(false));
        setTopics(topicResults.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTopics();
  }, []);

  const addTag = () => {
    setTagError("");
    if (tagInput.current) {
      const tag = tagInput.current.value.trim() ?? "";
      const regex = new RegExp(/^[a-zA-Z0-9\u0590-\u05FF']+$/);

      if (!tag) {
        setTagError("לא ניתן להוסיף תגית ריקה");
        return;
      }

      if (!regex.test(tag)) {
        setTagError("תגית צריכה להכיל רק אנגלית, עברית ומספרים");
        return;
      }

      if (tags.includes(tag.toLowerCase())) {
        setTagError("תגית זו כבר קיימת בתגיות שהזנת");
        return;
      }

      if (tag.length < 3 || tag.length > 32) {
        setTagError("תגית צריכה להכיל מינימום 3 אותיות מקסימום 32 אותיות");
        return;
      }

      if (tags.length === 10 || tags.length >= 10) {
        setTagError("ניתן להוסיף עד עשרה תגיות פר סיכום");
        return;
      }

      const newTags = [...tags, tag.toLowerCase()];
      setTags(newTags);
      tagInput.current.value = ""; // Resets the input value
    } else return;
  };

  const removeTag = (tagToRemove: string) => {
    const filteredTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(filteredTags);
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostFields>({ resolver: yupResolver(schema) });

  const onsubmit = async (data: NewPostFields) => {
    setLoading(true);

    const postData: NewPostFields = {
      ...data,
      tags: tags,
    };

    try {
      await axiosClient
        .post("/post", postData)
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <RippleLoading />;
  else
    return (
      <section className="flex flex-col space-y-6">
        <h1 className="font-bold underline text-center text-xl">
          יצירת פוסט סיכום חדש
        </h1>

        <form
          noValidate
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col space-y-6 max-w-2xl mx-auto w-full"
        >
          <div className="input-control">
            <label htmlFor="title" className="classic-form-label">
              איך קוראים לסיכום שלכם?
            </label>
            <ClassicInput
              id="title"
              className="w-full"
              {...register("title")}
              placeholder="כותרת הפוסט..."
            />
            {errors.title?.message ? (
              <FormFieldError>{errors.title.message}</FormFieldError>
            ) : (
              ""
            )}
          </div>
          <div className="input-control">
            <label htmlFor="topic" className="classic-form-label">
              באיזה נושא הסיכום שלכם?
            </label>
            <ClassicSelect id="topic" {...register("topicId")}>
              {topics.length > 0
                ? topics.map((topic, i) => (
                    <option key={i} value={topic.id}>
                      {topic.label}
                    </option>
                  ))
                : ""}
            </ClassicSelect>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="classic-form-label">
              על מה הסיכום שלכם?
            </label>
            <ClassicTextarea
              id="description"
              {...register("description")}
              rows={6}
              placeholder="רצוי להוסיף כמה מילים על הסיכום שאתם מעלים, כמו קורס, מעט על התוכן, זה יאפשר לכם ולמשתמשים אחרים אחר כך להבין בחטף עין יותר טוב מה הסיכום שהעלתם מכיל..."
            />
            <MaxDescChars
              current={
                watch("description") ? watch("description").trim().length : 0
              }
              max={256}
            />
            {errors.description?.message ? (
              <FormFieldError>{errors.description.message}</FormFieldError>
            ) : (
              ""
            )}
          </div>
          <div className="input-control">
            <label htmlFor="tag" className="classic-form-label">
              לאיזה קטגוריות הנושא שלכם רלוונטי?
            </label>
            <div className="flex gap-3">
              <ClassicInput
                id="tag"
                className="w-full"
                placeholder="הוספת תגית"
                ref={tagInput}
                onKeyDown={(event: any) => event.keyCode === 13 && addTag()}
              />
              <Button onClick={addTag} type="button">
                הוספה
              </Button>
            </div>
            {tagError ? <FormFieldError>{tagError}</FormFieldError> : ""}
          </div>
          <DisplayTags
            tags={tags}
            removeAll={() => setTags([])}
            removeTag={removeTag}
          />
          <Button type="submit">יצירת פוסט</Button>
        </form>
      </section>
    );
};

interface NewPostFields {
  title: string;
  description: string;
  tags?: string[];
  file: any;
  topicId: string;
}

interface ITopic {
  id: string;
  label: string;
}

export default NewPost;
