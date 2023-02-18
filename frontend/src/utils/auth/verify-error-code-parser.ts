enum ErrorCodes {
  NOTFOUND = 404,
}

const notfoundError =
  "הקישור ככל הנראה אינו תקין או שהמשתמש שלך הופעל כבר בעבר ואינו נדרש להפעלה נוספת.";
const unknownError = "שגיאה לא ידועה בעת ביצוע הפעולה.";

function parseVerifyCodeToMessage(code: number): string {
  switch (code) {
    case ErrorCodes.NOTFOUND:
      return notfoundError;
    default:
      return unknownError;
  }
}

export { parseVerifyCodeToMessage };
