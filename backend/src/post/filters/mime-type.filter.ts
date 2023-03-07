const SUPPORTED_FORMATS: string[] = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

export const mimeTypeFilter = (req: any, file: any, callback: any) => {
  console.log(file);
  if (!SUPPORTED_FORMATS.includes(file.mimetype)) {
    const fileError = 'File type is not allowed';
    req.fileError = fileError;
    // Error is handled on controller basically.
    return callback(null, false);
  }
  return callback(null, true);
};
