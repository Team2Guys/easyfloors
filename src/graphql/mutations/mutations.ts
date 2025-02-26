export const FILE_UPLOAD_MUTATION = `
  mutation UploadFile($file: Upload!) {
    createFileUploading(file: $file) {
      id
      filename
      fileUrl
    }
  }
`;