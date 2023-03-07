type Format = {
  suffix: string;
  mime: string;
};

export const SUPPORTED_FORMATS: Format[] = [
  {
    mime: "application/msword",
    suffix: ".doc",
  },
  {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    suffix: ".docx",
  },
  {
    mime: "application/vnd.ms-excel",
    suffix: ".xls",
  },
  {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    suffix: ".xlsx",
  },
  {
    mime: "application/vnd.ms-powerpoint",
    suffix: ".ppt",
  },
  {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    suffix: ".ppt",
  },
];
