'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import { Formik, Form, FormikHelpers, Field, ErrorMessage, FieldArray, FormikErrors, FormikProps } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { subcategoryInitialValues, subcategoryValidationSchema, } from 'data/data';
import Loader from 'components/Loader/Loader';
import showToast from 'components/Toaster/Toaster';
import Cookies from 'js-cookie';
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS } from 'types/PagesProps';
import { AdditionalInformation, ProductImage } from 'types/prod';
import { Category, ISUBCATEGORY, ISUBCATEGORY_EDIT } from 'types/cat';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { useMutation } from '@apollo/client';
import { CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY } from 'graphql/mutations';
import { FETCH_ALL_SUB_CATEGORIES } from 'graphql/queries';
import revalidateTag from 'components/ServerActons/ServerAction';
import { uploadPhotosToBackend } from 'lib/helperFunctions';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from 'antd';
import { centerAspectCrop } from 'types/product-crop';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
  categoriesList,
}: DASHBOARD_ADD_SUBCATEGORIES_PROPS) => {
  const CategoryName = editCategory && editCategory.name
    ? {
      name: editCategory.name,
      description: editCategory.description || '',
      category: editCategory?.category.id || 0,
      Meta_Title: editCategory.Meta_Title || '',
      short_description: editCategory.short_description || '',
      Meta_Description: editCategory.Meta_Description || '',
      Canonical_Tag: editCategory.Canonical_Tag || '',
      custom_url: editCategory.custom_url || "",
      whatamIdetails: editCategory?.whatamIdetails || [],
      whatAmiTopHeading: editCategory?.whatAmiTopHeading || "",
      Heading: editCategory?.Heading || "",
      recalledByCategories: editCategory?.recalledByCategories?.map((value: Category) => value.id) || [],
      price: editCategory.price || "",
      sizes: editCategory.sizes || [],
      whatIamEndpoint: editCategory.whatIamEndpoint || "",
      whatAmiCanonical_Tag: editCategory.whatAmiCanonical_Tag || "",
      whatAmiMeta_Description: editCategory.whatAmiMeta_Description || "",
      whatAmiMeta_Title: editCategory.whatAmiMeta_Title || "",

    } as ISUBCATEGORY_EDIT
    : undefined;

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editCategory && editCategory?.posterImageUrl) ? [editCategory?.posterImageUrl] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.whatAmiImageBanner ? [editCategory?.whatAmiImageBanner] : undefined);
  const [WhatamIImageUrl, setWhatamIImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.whatAmiImage ? editCategory?.whatAmiImage : undefined);
  const [homePagemageUrl, sethomePagemageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.homePageImage ? [editCategory?.homePageImage] : undefined);
  const [bannerImage, setBannerImage] = useState<ProductImage[] | undefined>(editCategory && editCategory?.BannerImage ? [editCategory?.BannerImage] : undefined);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [loading, setloading] = useState<boolean>(false);

  const [editCategoryName, setEditCategoryName] = useState<ISUBCATEGORY_EDIT | undefined>(CategoryName);
  const token = Cookies.get('admin_access_token');
  const superAdminToken = Cookies.get('super_admin_access_token');
  const finalToken = token ? token : superAdminToken;

  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY);
  const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY);
    const formikRef = useRef<FormikProps<ISUBCATEGORY_EDIT>>(null);
  

  const onSubmit = async (values: ISUBCATEGORY_EDIT, { resetForm }: FormikHelpers<ISUBCATEGORY_EDIT>) => {
    if (!values.category) {
      return showToast('warn', 'Select parent category!!');
    } try {
      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];
      const whatIamIImage = WhatamIImageUrl && WhatamIImageUrl;
      const homePageImage = homePagemageUrl && homePagemageUrl[0];
      const NewbannerImage = bannerImage && bannerImage[0];
      const newValue = { ...values, posterImageUrl, BannerImage: NewbannerImage, whatAmiImageBanner: Banner, whatAmiImage: whatIamIImage, homePageImage };
      const updateFlag = editCategoryName ? true : false;

      if (updateFlag) {
        // Update Existing SubCategory
        await updateSubCategory({
          variables: {
            input: {
              id: Number(editCategory?.id),
              ...newValue,
            },
          },
          refetchQueries: [{ query: FETCH_ALL_SUB_CATEGORIES }],
          context: {
            headers: {
              Authorization: `Bearer ${finalToken}`,
            },
          },
        })
        showToast('success', 'Sub Category has been successfully updated!');
      } else {
        // Create New SubCategory
        await createSubCategory({
          variables: {
            input: newValue,
          },
          refetchQueries: [{ query: FETCH_ALL_SUB_CATEGORIES }],
        });
        showToast('success', 'Sub Category has been successfully created!');
      }

      revalidateTag('subcategories');

      setloading(false);
      seteditCategory?.(undefined);
      setposterimageUrl(undefined);
      setBannerImageUrl(undefined)
      setWhatamIImageUrl([])
      sethomePagemageUrl(undefined)
      setBannerImage(undefined)
      resetForm();
      setMenuType('Sub Categories');
    } catch (err) {
      setloading(false);

      showToast('error', 'Something went wrong!');
      throw err
    }
  }
  useEffect(() => {
    setposterimageUrl((editCategory && editCategory?.posterImageUrl) ? [editCategory?.posterImageUrl] : undefined);
    setBannerImageUrl(editCategory && editCategory?.whatAmiImageBanner ? [editCategory?.whatAmiImageBanner] : undefined)
    setWhatamIImageUrl(editCategory && editCategory?.whatAmiImage ? editCategory?.whatAmiImage : [])
    sethomePagemageUrl(editCategory && editCategory?.homePageImage ? [editCategory?.homePageImage] : undefined)
    setBannerImage(editCategory && editCategory?.BannerImage ? [editCategory?.BannerImage] : undefined)

    setEditCategoryName(CategoryName)
  }, [editCategory])


  const handleCropClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    setIsCropModalVisible(true);
  };


  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formikRef.current?.dirty) {
        e.preventDefault();
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerAspectCrop(width, height, 16 / 9);
    setCrop(newCrop);
  };
  const onCropComplete = (crop: Crop) => {
    const image = imgRef.current;
    if (!image || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width;
    canvas.height = crop.height;

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
  };


  const handleCropModalOk = async () => {
    if (croppedImage && imageSrc) {
      try {
        // Convert the cropped image (base64) to a File
        const file = base64ToFile(croppedImage, `cropped_${Date.now()}.jpg`);

        // Upload the cropped image to your backend or Cloudinary
        const response = await uploadPhotosToBackend([file]);

        // Use the base URL from your environment variables
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const uploadedImageUrl = response[0].imageUrl;
        // Append the base URL if needed
        const newImageUrl = uploadedImageUrl.startsWith('http')
          ? uploadedImageUrl
          : `${baseUrl}${uploadedImageUrl}`;

        const newImage = { imageUrl: newImageUrl, public_id: response[0].public_id };

        // First close the modal and reset croppedImage
        setIsCropModalVisible(false);
        setCroppedImage(null);

        // Use a timeout to update states after the modal has closed
        setTimeout(() => {
          setposterimageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setBannerImageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setWhatamIImageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setBannerImage((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          sethomePagemageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
        }, 0);
      } catch (error) {
        showToast('error', 'Failed to upload cropped image');
        return error
      }
    }
  };

  // Helper function to convert a base64 string to a File object
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };


  const handleCropModalCancel = () => {
    setIsCropModalVisible(false);
    setCroppedImage(null);
  };


  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white"
        onClick={() => {
          setMenuType('Sub Categories');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
      innerRef={formikRef}
        initialValues={
          editCategoryName ? editCategoryName : subcategoryInitialValues
        }
        validationSchema={subcategoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                <div className="flex flex-col gap-5 md:gap-9 w-full lg:w-4/5 xl:w-2/5 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                  <div className="rounded-sm border border-stroke bg-white  dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white p-3">


                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Sub Category Images
                        </h3>
                      </div>
                      {posterimageUrl?.[0] && posterimageUrl.length > 0 ? (
                        <div className="p-4 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                          {posterimageUrl.map((item: ProductImage, index: number) => {
                            return (
                              <div
                                className="relative group rounded-lg w-fit  overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setposterimageUrl,
                                        finalToken
                                      );
                                    }}
                                  />

                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"

                                  width={200}
                                  height={500}
                                  loading='lazy'

                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                                <input
                                  className="border text-black mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="Alt Text"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setposterimageUrl,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <ImageUploader setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Banner Image (What Am I )
                        </h3>
                      </div>
                      {BannerImageUrl?.[0] && BannerImageUrl?.length > 0 ? (
                        <div className=" p-4 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                          {BannerImageUrl.map((item: ProductImage, index: number) => {
                            return (
                              <div
                                className="relative group rounded-lg w-fit  overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setBannerImageUrl,
                                        finalToken
                                      );
                                    }}
                                  />

                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="w-full h-full dark:bg-black dark:shadow-lg"

                                  width={200}
                                  height={500}
                                  loading='lazy'
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                                <input
                                  className="border text-black mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="Alt Text"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setBannerImageUrl,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <ImageUploader setposterimageUrl={setBannerImageUrl} />
                      )}
                    </div>


                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          what Am I Image
                        </h3>
                        <ImageUploader setImagesUrl={setWhatamIImageUrl} />
                      </div>
                      {WhatamIImageUrl && WhatamIImageUrl?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 h-auto relative">
                          {WhatamIImageUrl.map((item: ProductImage, index: number) => {
                            return (
                              <div
                                className="relative group rounded-lg shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setWhatamIImageUrl,
                                        finalToken
                                      );
                                    }}
                                  />

                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="w-full h-[180px] lg:h-[110px] dark:bg-black dark:shadow-lg"

                                  width={200}
                                  height={500}
                                  loading='lazy'
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                                <input
                                  className="border text-black mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="Alt Text"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setWhatamIImageUrl,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>


                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark mt-5">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Banner Image
                        </h3>
                      </div>
                      {bannerImage?.[0] && bannerImage?.length > 0 ? (
                        <div className=" p-4 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                          {bannerImage.map((item: ProductImage, index: number) => {
                            return (
                              <div
                                className="relative group rounded-lg w-fit  overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setBannerImage,
                                        finalToken
                                      );
                                    }}
                                  />

                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="w-full h-full dark:bg-black dark:shadow-lg"

                                  width={200}
                                  height={500}
                                  loading='lazy'
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                                <input
                                  className="border text-black mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="Alt Text"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setBannerImage,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <ImageUploader setposterimageUrl={setBannerImage} />
                      )}
                    </div>

                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          What am I (home Page)
                        </h3>
                      </div>
                      {homePagemageUrl?.[0] && homePagemageUrl?.length > 0 ? (
                        <div className=" p-4 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                          {homePagemageUrl.map((item: ProductImage, index: number) => {
                            return (
                              <div
                                className="relative group rounded-lg w-fit  overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        sethomePagemageUrl,
                                        finalToken
                                      );
                                    }}
                                  />

                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="w-full h-full dark:bg-black dark:shadow-lg"

                                  width={200}
                                  height={500}
                                  loading='lazy'
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                                <input
                                  className="border text-black mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="Alt Text"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      sethomePagemageUrl,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <ImageUploader setposterimageUrl={sethomePagemageUrl} />
                      )}
                    </div>






                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Sub Category Name
                        </label>

                        <Field
                          type="text"
                          name="name"
                          placeholder="Title"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          What am I Endpoint
                        </label>

                        <Field
                          type="text"
                          name="whatIamEndpoint"
                          placeholder="What Am I Endpoint"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage name="whatIamEndpoint" component="div" className="text-red-500 text-sm" />
                      </div>


                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Custom Url
                        </label>

                        <Field
                          type="text"
                          name="custom_url"
                          placeholder="Custom Url"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Add Starting price
                        </label>

                        <Field
                          type="text"
                          name="price"
                          placeholder="Add starting price"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Heading
                        </label>

                        <Field
                          type="text"
                          name="Heading"
                          placeholder="Top Heading"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage name="Heading" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Category Description
                        </label>
                        <TinyMCEEditor name="description" />
                        {formik.touched.description && formik.errors.description && (
                          <div className="text-red-500 text-sm">{formik.errors.description}</div>
                        )}
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          What Am I heading
                        </label>
                        <Field
                          as="textarea"
                          name="whatAmiTopHeading"
                          placeholder="What Am I Heading"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik?.touched?.whatAmiTopHeading && formik.errors.whatAmiTopHeading ? "border-red-500" : ""
                            }`}
                        />
                        <ErrorMessage name="whatAmiTopHeading" component="div" className="text-red-500 text-sm" />
                      </div>

                      <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                            What AM I Details
                          </h3>
                        </div>
                        <div className="flex flex-col py-4 px-6">
                          <FieldArray name="whatamIdetails">
                            {({ push, remove }) => (
                              <div className="flex flex-col gap-2">
                                {formik.values.whatamIdetails &&
                                  formik.values.whatamIdetails.map(
                                    (model: AdditionalInformation, index: number) => (
                                      <div
                                        key={index}
                                        className="w-full flex flex-col gap-4"
                                      >
                                        <input
                                          type="text"
                                          name={`whatamIdetails[${index}].name`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={
                                            formik.values.whatamIdetails[
                                              index
                                            ].name
                                          }
                                          placeholder="Model Name"
                                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${model.name &&
                                            (
                                              formik.errors
                                                .whatamIdetails as FormikErrors<
                                                  ISUBCATEGORY['whatamIdetails']
                                                >
                                            )?.[index]
                                            ? 'border-red-500 dark:border-white'
                                            : ''
                                            }`}
                                        />


                                        <div className='flex w-full gap-2'>
                                          <textarea
                                            name={`whatamIdetails[${index}].detail`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={
                                              formik.values.whatamIdetails[
                                                index
                                              ].detail
                                            }
                                            placeholder="Model Detail"
                                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${model.detail &&
                                              (
                                                formik.errors
                                                  .whatamIdetails as FormikErrors<ISUBCATEGORY['whatamIdetails']>
                                              )?.[index]
                                              ? 'border-red-500 dark:border-white'
                                              : ''
                                              }`}
                                          />

                                          <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="ml-2 text-red-500 "
                                          >
                                            <RxCross2
                                              className="text-red-500 dark:text-white"
                                              size={40}
                                            />
                                          </button>

                                        </div>

                                      </div>
                                    ),
                                  )}
                                <button
                                  type="button"
                                  onClick={() => push({ name: '', detail: '' })}
                                  className="px-4 py-2 bg-black text-white dark:bg-primary dark:border-0  rounded-md shadow-md w-fit"
                                >
                                  Add Model
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>


                      </div>

                      <div className="rounded-sm border border-stroke bg-white  dark:bg-black mt-2">
                        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                          <h3 className="font-medium text-black dark:text-white">
                            Add Sizes
                          </h3>
                        </div>
                        <div className="py-4 px-6 space-y-2">
                          <div className="flex items-center gap-4">
                            <label className="block text-sm font-medium text-black dark:text-white w-24">
                              Width:
                            </label>
                            <input
                              type="text"
                              name="sizes[0].width"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.sizes?.at(0)?.width}
                              placeholder="Add Width"
                              className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="block text-sm font-medium text-black dark:text-white w-24">
                              Height:
                            </label>
                            <input
                              type="text"
                              name="sizes[0].height"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.sizes?.at(0)?.height}
                              placeholder="Add Height"
                              className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <label className="block text-sm font-medium text-black dark:text-white w-24">
                              Thickness:
                            </label>
                            <input
                              type="text"
                              name="sizes[0].thickness"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.sizes?.at(0)?.thickness}
                              placeholder="Add Thickness"
                              className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Meta Title
                          </label>
                          <Field
                            type="text"
                            name="Meta_Title"
                            placeholder="Meta Title"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Meta_Title && formik.errors.Meta_Title ? "border-red-500" : ""
                              }`}
                          />
                          {formik.touched.Meta_Title && formik.errors.Meta_Title && (
                            <div className="text-red text-sm">{formik.errors.Meta_Title as string}</div>
                          )}
                        </div>
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Canonical Tag
                          </label>
                          <Field
                            type="text"
                            name="Canonical_Tag"
                            placeholder="Canonical Tag"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Canonical_Tag && formik.errors.Canonical_Tag ? "border-red-500" : ""
                              }`}
                          />
                          {formik.touched.Canonical_Tag && formik.errors.Canonical_Tag && (
                            <div className="text-red text-sm">{formik.errors.Canonical_Tag as string}</div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Meta Description
                        </label>
                        <Field
                          as="textarea"
                          name="Meta_Description"
                          placeholder="Meta Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Meta_Description && formik.errors.Meta_Description ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.Meta_Description && formik.errors.Meta_Description && (
                          <div className="text-red text-sm">{formik.errors.Meta_Description as string}</div>
                        )}



                      </div>




                      <div className="flex gap-4 mt-4">
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                       whatAmiMeta_Title
                          </label>
                          <Field
                            type="text"
                            name="whatAmiMeta_Title"
                            placeholder="whatAmiMeta_Title"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Meta_Title && formik.errors.Meta_Title ? "border-red-500" : ""
                              }`}
                          />
                          {formik.touched.whatAmiMeta_Title && formik.errors.whatAmiMeta_Title && (
                            <div className="text-red text-sm">{formik.errors.whatAmiMeta_Title as string}</div>
                          )}
                        </div>
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        whatAmiCanonical_Tag
                          </label>
                          <Field
                            type="text"
                            name="whatAmiCanonical_Tag"
                            placeholder="Canonical Tag"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Canonical_Tag && formik.errors.Canonical_Tag ? "border-red-500" : ""
                              }`}
                          />
                          {formik.touched.whatAmiCanonical_Tag && formik.errors.whatAmiCanonical_Tag && (
                            <div className="text-red text-sm">{formik.errors.whatAmiCanonical_Tag as string}</div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                whatAmiMeta_Description
                        </label>
                        <Field
                          as="textarea"
                          name="whatAmiMeta_Description"
                          placeholder="Meta Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Meta_Description && formik.errors.Meta_Description ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.whatAmiMeta_Description && formik.errors.whatAmiMeta_Description && (
                          <div className="text-red text-sm">{formik.errors.whatAmiMeta_Description as string}</div>
                        )}



                      </div>








                      <div className="flex gap-4 mt-2">
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Short Description
                          </label>
                          <Field
                            type="text"
                            name="short_description"
                            placeholder="Short Description"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.short_description && formik.errors.short_description ? "border-red-500" : ""
                              }`}
                          />
                          {formik.touched.short_description && formik.errors.short_description && (
                            <div className="text-red text-sm">{formik.errors.short_description as string}</div>
                          )}
                        </div>
                      </div>



                      <div>

                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Select Parent Category (atleat one)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                          <Field
                            as="select"
                            name="category"

                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          >
                            <option value="" disabled>
                              Select Category
                            </option>

                            {categoriesList.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </Field>

                        </div>
                        <ErrorMessage name="category" component="div" className="text-red-500 " />
                      </div>

                    </div>



                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Add Re Category
                    </label>
                    <FieldArray name="recalledByCategories">
                      {({ push, remove }) => (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {categoriesList?.map((cat: Category) => {

                            const isChecked = formik.values.recalledByCategories?.includes(cat.id.toString());

                            return (
                              <label
                                key={cat.id}
                                className="flex items-center space-x-2"
                              >
                                <Field
                                  type="checkbox"
                                  name="recalledByCategories"
                                  value={cat.id.toString()}
                                  checked={isChecked}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    if (e.target.checked) {
                                      push(cat.id.toString());
                                    } else {
                                      remove(
                                        formik?.values?.recalledByCategories?.indexOf(
                                          cat.id.toString()
                                        )
                                      );
                                    }
                                  }}
                                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-black dark:text-white">
                                  {cat.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>



                  </div>

                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-8 py-2 bg-primary dark:bg-primary dark:border-0 text-white rounded"
                  disabled={loading}
                >
                  {loading ? <Loader color="#fff" /> : 'Submit'}
                </button>
              </div>
              <Modal
                title="Crop Image"
                open={isCropModalVisible}
                onOk={handleCropModalOk}
                onCancel={handleCropModalCancel}
                width={500}
                height={400}
              >
                {imageSrc && (
                  <ReactCrop
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                    onComplete={onCropComplete}
                  >
                    <Image
                      width={500}
                      height={300}
                      ref={imgRef}
                      src={imageSrc}
                      alt="Crop me"
                      style={{ maxWidth: '100%' }}
                      onLoad={onImageLoad}
                      crossOrigin="anonymous"
                    />
                  </ReactCrop>
                )}
              </Modal>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormLayout