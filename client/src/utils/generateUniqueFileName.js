const generateUniqueFileName = (originalFileName) => {
  const timestamp = Date.now(); // Get the current timestamp
  const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
  const fileExtension = originalFileName.split(".").pop(); // Get the file extension
  const baseFileName = originalFileName.replace(`.${fileExtension}`, ""); // Get the base file name without extension

  return `${baseFileName}_${timestamp}_${randomString}.${fileExtension}`;
};

export { generateUniqueFileName };
