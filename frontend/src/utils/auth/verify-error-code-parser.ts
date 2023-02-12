enum ErrorCodes {
  NOTFOUND = 404,
}

const notfoundError = "הקישור אינו תקין או חלק מהקוד המוצפן חסר.";
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
