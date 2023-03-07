import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormFieldError from "../../components/page-components/forms/form-field-error";
import GoBackButton from "../../components/page-components/go-back-from-button/go-back-button";
import DisplayTags from "../../components/page-components/posts/new-post/display-tags";
import MaxDescChars from "../../components/page-components/posts/new-post/max-desc-chars";
import SuccessCreation from "../../components/page-components/posts/new-post/success-creation";
import Button from "../../components/ui-elements/button/button";
import ClassicInput from "../../components/ui-elements/input/classic-input";
import ClassicSelect from "../../components/ui-elements/input/classic-select";
import ClassicTextarea from "../../components/ui-elements/input/classic-textarea";
import RippleLoading from "../../components/ui-elements/loading/ripple-loading";
import { SUPPORTED_FORMATS } from "../../lib/data/supported-formats";
import { axiosClient } from "../../service/axios/axiosClient";
import { tagIsValid } from "../../utils/forms/new-post-handler";

const schema = yup
  .object({
    title: yup.string().required("שדה כותרת הוא שדה חובה").max(32),
    description: yup.string().max(256).required("שדה תיאור הוא שדה חובה"),
    topicId: yup.string().default(""),
    // file: yup
    //   .mixed()
    //   .required("נדרש לעלות קובץ עם הסיכום")
    //   .test(
    //     "fileType",
    //     `פורמט לא נתמך [${SUPPORTED_FORMATS.map((format) => format.suffix).join(
    //       ", "
    //     )}]`,
    //     (fileType: any) =>
    //       fileType &&
    //       fileType[0].type &&
    //       SUPPORTED_FORMATS.some(
    //         (supportedFormat) => supportedFormat.mime === fileType[0].type
    //       )
    //   ),
  })
  .required();

const NewPost = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [createdPost, setCreatedPost] = useState<ICreatedPost>({
    id: "",
    title: "",
    topic: { id: "", label: "" },
  });
  const [tagError, setTagError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [topics, setTopics] = useState<ITopic[]>([]);
  const tagInput = useRef<HTMLInputElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPostFields>({ resolver: yupResolver(schema) });

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
    if (!tagInput.current) return;
    const tag = tagInput.current.value.trim() ?? "";
    const { errorMessage } = tagIsValid(tag, tags);

    if (errorMessage) return setTagError(errorMessage);

    const newTags = [...tags, tag.toLowerCase()];
    setTags(newTags);
    tagInput.current.value = ""; // Resets the input value
  };

  const removeTag = (tagToRemove: string) => {
    const filteredTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(filteredTags);
  };

  const onsubmit = async (data: NewPostFields) => {
    setLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key: string) =>
      formData.append(key, key === "file" ? data[key][0] : data[key])
    );
    formData.append("tags", JSON.stringify(tags));

    try {
      const post = await axiosClient
        .post("/post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .finally(() => setLoading(false));

      const postData = post.data;
      const postTopic = topics.filter((topic) => topic.id === postData.topicId);

      setCreatedPost({
        id: postData.id,
        title: postData.title,
        topic: postTopic[0],
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(errors);
  if (loading) return <RippleLoading />;
  if (success)
    return (
      <SuccessCreation
        title={createdPost.title}
        id={createdPost.id}
        topic={createdPost.topic}
      />
    );
  else
    return (
      <section className="flex flex-col space-y-6">
        <GoBackButton />
        <h1 className="font-bold underline text-center text-xl">
          יצירת פוסט סיכום חדש
        </h1>

        <form
          noValidate
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col space-y-6 max-w-2xl mx-auto w-full"
        >
          <div className="input-control">
            <ClassicInput
              type="file"
              {...register("file")}
              className="file-input w-full bg-white"
            />
            {errors.file?.message ? (
              <FormFieldError>
                {errors.file.message as unknown as string}
              </FormFieldError>
            ) : (
              ""
            )}
          </div>
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
            {errors.topicId?.message ? (
              <FormFieldError>{errors.topicId.message}</FormFieldError>
            ) : (
              ""
            )}
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
              <Button onClick={addTag} type="button" className="shpitz-left">
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
          <Button type="submit" className="w-max mx-auto shpitz-left">
            יצירת פוסט
          </Button>
        </form>
      </section>
    );
};

type NewPostFields = {
  title: string;
  description: string;
  tags?: string[];
  file: any;
  topicId: string;
  [key: string]: any;
};

interface ITopic {
  id: string;
  label: string;
}

interface ICreatedPost {
  id: string;
  title: string;
  topic: {
    id: string;
    label: string;
  };
}

export default NewPost;
