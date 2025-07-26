'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import Toaster from 'components/Toaster/Toaster';
import { Formik, Form, FormikHelpers, ErrorMessage, Field, FormikProps } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { categoryInitialValues, categoryValidationSchema } from 'data/data';
import Loader from 'components/Loader/Loader';
import revalidateTag from '../ServerActons/ServerAction';
// import Cookies from 'js-cookie';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { ProductImage } from 'types/prod';
import { Category, EDIT_CATEGORY } from 'types/cat';
import client from 'config/apolloClient';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from 'graphql/mutations';
import { FETCH_ALL_CATEGORIES } from 'graphql/queries';
import Cookies from 'js-cookie';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from 'antd';
import { uploadPhotosToBackend } from 'lib/helperFunctions';
import showToast from 'components/Toaster/Toaster';
import { centerAspectCrop } from 'types/product-crop';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';

interface editCategoryProps {
  seteditCategory: React.Dispatch<SetStateAction<Category | undefined | null>>;
  editCategory: Category | undefined | null;
  setMenuType: React.Dispatch<SetStateAction<string>>;

}

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
}: editCategoryProps) => {
  const CategoryName: EDIT_CATEGORY | null = editCategory && editCategory.name
    ? {
      name: editCategory.name || "",
      description: editCategory.description || '',
      Meta_Title: editCategory.Meta_Title || '',
      short_description: editCategory.short_description || '',
      Meta_Description: editCategory.Meta_Description || '',
      Canonical_Tag: editCategory.Canonical_Tag || '',
      custom_url: editCategory.custom_url || "",
      topHeading: editCategory.topHeading || "",
      RecallUrl: editCategory.RecallUrl || "",
      price: editCategory.price || "",
      status: editCategory?.status || 'DRAFT',
    }
    : null;
  const token = Cookies.get('admin_access_token');
  const superAdminToken = Cookies.get('super_admin_access_token');
  const finalToken = token ? token : superAdminToken;

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editCategory && editCategory.posterImageUrl) ? [editCategory.posterImageUrl] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.whatAmiImageBanner ? [editCategory?.whatAmiImageBanner] : undefined);

  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<EDIT_CATEGORY | null | undefined>(CategoryName);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const formikRef = useRef<FormikProps<EDIT_CATEGORY>>(null);

  const onSubmit = async (values: EDIT_CATEGORY, { resetForm }: FormikHelpers<EDIT_CATEGORY>) => {
    try {
      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];

      if (!posterImageUrl) throw new Error('Please select relevant Images');
      const newValue = { ...values, posterImageUrl, whatAmiImageBanner: Banner };

      const updateFlag = editCategoryName ? true : false;

      if (updateFlag) {
        await client.mutate({
          mutation: UPDATE_CATEGORY,
          variables: { input: { id: Number(editCategory?.id), posterImageUrl, whatAmiImageBanner: Banner, ...values } },
          refetchQueries: [{ query: FETCH_ALL_CATEGORIES }],
        });
      } else {
        await client.mutate({
          mutation: CREATE_CATEGORY,
          variables: { input: newValue },
          refetchQueries: [{ query: FETCH_ALL_CATEGORIES }],
        });
      }

      revalidateTag('categories');
      setloading(false);
      Toaster(
        'success',
        updateFlag ? 'Category has been successfully updated!' : 'Category has been successfully created!',
      );

      seteditCategory?.(undefined);
      setposterimageUrl(undefined);
      setMenuType('Categories');
      resetForm();
    } catch (err) {
      setloading(false);
      setposterimageUrl(undefined);
      throw err;
    }
  };
  useEffect(() => {
    setEditCategoryName(CategoryName)

  }, [editCategory])

  const handleCropClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    setIsCropModalVisible(true);
  };

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
    const ctx = canvas?.getContext('2d');

    canvas.width = crop?.width;
    canvas.height = crop?.height;

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

    const base64Image = canvas?.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
  };


  const handleCropModalOk = async () => {
    if (croppedImage && imageSrc) {
      try {
        const file = base64ToFile(croppedImage, `cropped_${Date.now()}.jpg`);
        const response = await uploadPhotosToBackend([file]);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const uploadedImageUrl = response[0].imageUrl;
        const newImageUrl = uploadedImageUrl.startsWith('http')
          ? uploadedImageUrl
          : `${baseUrl}${uploadedImageUrl}`;

        const newImage = { imageUrl: newImageUrl, public_id: response[0].public_id };
        setIsCropModalVisible(false);
        setCroppedImage(null);
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
        }, 0);
      } catch (error) {
        showToast('error', 'Failed to upload cropped image');
        return error
      }
    }
  };
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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formikRef.current?.dirty) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (

    <Formik
      innerRef={formikRef}
      initialValues={
        editCategoryName ? editCategoryName : categoryInitialValues
      }
      validationSchema={categoryValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>
            <div className='flex justify-between items-center'>
              <p
                className="dashboard_primary_button"
                onClick={() => {
                  if (formik.dirty) {
                    const confirmLeave = window.confirm("You have unsaved changes. Do you want to leave without saving?");
                    if (!confirmLeave) return;
                  }
                  setMenuType('Categories');
                  seteditCategory?.(() => undefined);
                }}
              >
                <IoMdArrowRoundBack /> Back
              </p>
              <div className='flex gap-6 items-center'>
                <Field name="status">
                  {({ field, form }: import('formik').FieldProps) => (
                    <div className="flex gap-4 items-center my-4">
                      <label className="font-semibold">Sub Category Status:</label>

                      {['DRAFT', 'PUBLISHED'].map((status) => {
                        const isActive = field.value === status;

                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => form.setFieldValue('status', status)}
                            disabled={isActive}
                            className={`px-4 py-2 rounded-md text-sm border
                        ${isActive
                                ? 'bg-black text-white border-black cursor-not-allowed border dark:border-white'
                                : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer border dark:border-white'
                              }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Field>
                <button type="submit" className="dashboard_primary_button" disabled={loading}>
                  {loading ? <Loader color="#fff" /> : 'Submit'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                <div className='space-y-4'>
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark dark:bg-black">
                    <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Category Images
                      </h3>
                    </div>
                    {posterimageUrl && posterimageUrl.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:border-white dark:bg-black">
                        {posterimageUrl.map((item: ProductImage, index: number) => {

                          return (
                            <div
                              className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                <RxCross2
                                  className="cursor-pointer text-red-500 dark:text-red-700"
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
                                className="object-cover w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"
                                width={300}
                                height={200}
                                src={item.imageUrl}
                                loading='lazy'
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
                  <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark dark:bg-black">
                    <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Banner Image
                      </h3>
                    </div>
                    {BannerImageUrl?.[0] && BannerImageUrl?.length > 0 ? (
                      <div className=" p-4 dark:bg-boxdark dark:bg-black dark:text-white  dark:border-white">
                        {BannerImageUrl.map((item: ProductImage, index: number) => {
                          return (
                            <div
                              className="relative group rounded-lg w-fit  overflow-hidden shadow-md bg-white dark:border-white dark:bg-black"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white dark:bg-black rounded-full ">
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
                                className="w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"

                                width={200}
                                height={500}
                                loading='lazy'
                                src={item?.imageUrl || ""}
                                alt={`productImage-${index}`}
                              />
                              <input
                                className="border text-black mt-2 w-full dark:bg-black dark:text-white rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
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
                     <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <label className=" block mb-3 text-sm font-medium text-black dark:text-white">
                        Category Title
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Title"
                        className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name ? "border-red-500" : ""
                          }`}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                        Custom URL
                      </label>
                      <Field
                        type="text"
                        name="custom_url"
                        placeholder="Custom URL"
                        className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.custom_url && formik.errors.custom_url ? "border-red-500" : ""
                          }`}
                      />
                      <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                        starting Price
                      </label>
                      <Field
                        type="text"
                        name="price"
                        placeholder="Add Starting Price"
                        className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.custom_url && formik.errors.custom_url ? "border-red-500" : ""
                          }`}
                      />
                      <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                    </div>
                     </div>


                    <div>
                      <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                        RecallUrl(products & Categories)
                      </label>
                      <Field
                        type="text"
                        name="RecallUrl"
                        placeholder="Custom Url"
                        className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.RecallUrl && formik.errors.RecallUrl ? "border-red-500" : ""
                          }`}
                      />
                      <ErrorMessage name="RecallUrl" component="div" className="text-red-500 text-sm" />
                    </div>
                      <div >
                      <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                        Category Top Heading
                      </label>
                      <Field
                        type="text"
                        name="topHeading"
                        placeholder="Top Heading"
                        className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.topHeading && formik.errors.topHeading ? "border-red-500" : ""
                          }`}
                      />
                      <ErrorMessage name="topHeading" component="div" className="text-red-500 text-sm" />
                      </div>
                        <div>
                      <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                        Short Description
                      </label>
                      <textarea
                        name="short_description"
                        onChange={formik.handleChange}
                        value={formik.values.short_description}
                        placeholder="Short Description"
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                          ? 'border-red-500'
                          : ''
                          }`}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm">
                          {formik.errors.name}
                        </div>
                      ) : null}
                        </div>
                </div>

                  <div className='space-y-4'>

                    

                    <div>
                      <label className="block mb-3 text-sm font-medium text-black dark:text-white">
                        Category Description
                      </label>
                      <TinyMCEEditor name="description" />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>

                
                    <div className="flex gap-4 mt-4">
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          name="Meta_Title"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.Meta_Title}
                          placeholder="Meta Title"
                          className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Meta_Title &&
                            formik.errors.Meta_Title
                            ? 'border-red-500'
                            : ''
                            }`}
                        />
                        {formik.touched.Meta_Title &&
                          formik.errors.Meta_Title ? (
                          <div className="text-red text-sm">
                            {formik.errors.Meta_Title as string}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Canonical Tag
                        </label>
                        <input
                          onBlur={formik.handleBlur}
                          type="text"
                          name="Canonical_Tag"
                          onChange={formik.handleChange}
                          value={formik.values.Canonical_Tag}
                          placeholder="Canonical Tag"
                          className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Canonical_Tag &&
                            formik.errors.Canonical_Tag
                            ? 'border-red-500'
                            : ''
                            }`}
                        />

                        {formik.touched.Canonical_Tag &&
                          formik.errors.Canonical_Tag ? (
                          <div className="text-red text-sm">
                            {formik.errors.Canonical_Tag as string}
                          </div>
                        ) : null}
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
                        className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.Meta_Description && formik.errors.Meta_Description
                          ? "border-red-500"
                          : ""
                          }`}
                      />
                      <ErrorMessage name="Meta_Description" component="div" className="text-red text-sm" />
                    </div>
                    <Field name="status">
                      {({ field, form }: import('formik').FieldProps) => (
                        <div className="flex gap-4 items-center my-4">
                          <label className="font-semibold">Category Status:</label>

                          {['DRAFT', 'PUBLISHED'].map((status) => {
                            const isActive = field.value === status;

                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => form.setFieldValue('status', status)}
                                disabled={isActive}
                                className={`px-4 py-2 rounded-md text-sm border
                                        ${isActive
                                    ? 'bg-black text-white border-black cursor-not-allowed border dark:border-white'
                                    : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer rder dark:border-white'
                                  }`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </Field>
                  </div>


            </div>
            <div className="flex justify-center">
              <button
                type="submit"
            className="dashboard_primary_button mt-2" 
            disabled={loading}
        
              >
                {loading ? <Loader color="#fff" /> : 'Submit'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormLayout
