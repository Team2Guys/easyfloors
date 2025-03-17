import { ImagesProps } from "components/ImageUploader/ImageUploader";
import { FILE_UPLOAD_MUTATION } from "graphql/mutations";

 export const uploadPhotosToBackend = async (files: File[]) => {
    if (files.length === 0) throw new Error('No files found');

    const Response_data: ImagesProps[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("operations", JSON.stringify({
          query: FILE_UPLOAD_MUTATION,
          variables: { file: null },

        })
        );
        formData.append("map", JSON.stringify({ file: ["variables.file"] }));
        formData.append("file", file);
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL || "", {
          method: "POST",
          body: formData,
          credentials:"include"
        });

        const result = await response.json();
        if (result.data) {
          Response_data.push(result.data.createFileUploading)
        }
      }

      return Response_data;

    } catch (error) {
      throw error;
    }
  };
