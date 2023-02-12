enum ErrorCodes {
  CONFLICT = 409,
  UNAUTHORIZED = 401,
}

const conflictError = "שם משתמש או אימייל שהזנת קיימים כבר במערכת.";
const unauthorizedError = "שם משתמש או סיסמה אינם נכונים.";
const unknownError = "שגיאה לא ידועה בעת ביצוע הפעולה.";

function parseCodeToMessage(code: number): string {
  switch (code) {
    case ErrorCodes.CONFLICT:
      return conflictError;
    case ErrorCodes.UNAUTHORIZED:
      return unauthorizedError;
    default:
      return unknownError;
  }
}

export { parseCodeToMessage };
