import axios, { AxiosResponse } from 'axios';

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => { //eslint-disable-line
  const formData = new FormData();

  if (files.length === 0) throw new Error('No files found');

  try {
    for (const file of files) {
      formData.append('image', file);
    }
    //eslint-disable-next-line
    const response: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // Handle the response from the backend
    return response.data?.productsImageUrl;
  } catch (error) {
    throw error;
  }
};

