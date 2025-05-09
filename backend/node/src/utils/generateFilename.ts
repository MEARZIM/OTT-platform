import path from "path";

export const generateTimestampedFilename = (originalName: string) => {
    const ext = path.extname(originalName);
    const timestamp = new Date().toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "")
      .replace("T", "_");
  
    return `${timestamp}${ext}`;
  };
  