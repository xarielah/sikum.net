export const tagIsValid = (tag: string, tags: string[]) => {
  let errorMessage = "";
  const regex = new RegExp(/^[a-zA-Z0-9\u0590-\u05FF']+$/);

  if (!tag) {
    errorMessage = "לא ניתן להוסיף תגית ריקה";
  }

  if (!regex.test(tag)) {
    errorMessage = "תגית צריכה להכיל רק אנגלית, עברית ומספרים";
  }

  if (tags.includes(tag.toLowerCase())) {
    errorMessage = "תגית זו כבר קיימת בתגיות שהזנת";
  }

  if (tag.length < 3 || tag.length > 32) {
    errorMessage = "תגית צריכה להכיל מינימום 3 אותיות מקסימום 32 אותיות";
  }

  if (tags.length === 10 || tags.length >= 10) {
    errorMessage = "ניתן להוסיף עד עשרה תגיות פר סיכום";
  }

  return { errorMessage };
};
