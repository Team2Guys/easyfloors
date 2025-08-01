"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Formik,
  FieldArray,
  FormikErrors,
  Form,
  FormikHelpers,
  Field,
  ErrorMessage,
  FieldProps,
  FieldInputProps,
  FormikProps,
} from "formik";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { ImageRemoveHandler } from "utils/helperFunctions";
import Toaster from "components/Toaster/Toaster";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "components/Loader/Loader";
import { FormValues } from "types/type";
import {
  AddproductsinitialValues,
  AddProductvalidationSchema,
  excludedKeys,
  IProductValues,
} from "data/data";
import revalidateTag from "components/ServerActons/ServerAction";
import { AdditionalInformation, ProductImage } from "types/prod";
import ImageUploader from "components/ImageUploader/ImageUploader";
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS } from "types/PagesProps";
import { useMutation } from "@apollo/client";
import {
  CREATE_ACCESSORIES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "graphql/mutations";
import Cookies from "js-cookie";
import { UPDATE_ACCESSORY_MUTATION } from "graphql/Accessories";
import showToast from "components/Toaster/Toaster";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { centerAspectCrop } from "types/product-crop";
import { uploadPhotosToBackend } from "lib/helperFunctions";
import { Modal } from "antd";
import { useRouter } from "next/navigation";


const initialErrors = {
  categoryError: "",
  subCategoryError: "",
  posterImageError: "",
  prodImages: "",
};

const AddProd: React.FC<DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS> = ({
  EditInitialValues,
  EditProductValue,
  setselecteMenu,
  setEditProduct,
  categoriesList,
  products,
  accessoryFlag,
}) => {
  const [imagesUrl, setImagesUrl] = useState<ProductImage[] | undefined>(
    EditInitialValues ? EditInitialValues?.productImages : []
  );
  const [posterimageUrl, setposterimageUrl] = useState<
    ProductImage[] | undefined
  >(EditInitialValues ? [EditInitialValues?.posterImageUrl] : []);
  const [hoverImage, sethoverImage] = useState<ProductImage[] | undefined>(
    EditInitialValues?.hoverImageUrl
      ? [{ ...EditInitialValues.hoverImageUrl }]
      : []
  );

  const router = useRouter()
  const [featureImagesimagesUrl, setfeatureImagesImagesUrl] = useState<
    ProductImage[] | undefined
  >(EditInitialValues ? EditInitialValues?.featureImages : []);
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<
    IProductValues | null | undefined
  >(EditProductValue);
  const [imgError, setError] = useState<string | null | undefined>();
  const [selectedCategory, setSelectedCategory] = useState(
    EditProductValue ? EditProductValue.category : ""
  );
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    EditProductValue ? EditProductValue?.subcategory : ""
  );
  const [categorySubCatError, setcategorySubCatError] = useState(initialErrors);
  const dragImage = useRef<number | null>(null);
  const dragFeatureImage = useRef<number | null>(null);

  const draggedOverImage = useRef<number | null>(null);
  const draggedOverfeatureImage = useRef<number | null>(null);


  const token = Cookies.get("2guysAdminToken");
  const superAdminToken = Cookies.get("superAdminToken");
  const finalToken = token ? token : superAdminToken;
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const formikRef = useRef<FormikProps<IProductValues>>(null);



  const onSubmit = async (
    changedValue: IProductValues,
    { resetForm }: FormikHelpers<IProductValues>
  ) => {
    try {
      const values = removedValuesHandler(changedValue);
      setcategorySubCatError(initialErrors);
      if (!selectedCategory) {
        setcategorySubCatError((prev) => ({
          ...prev,
          categoryError: "Category is Required",
        }));
        return;
      }

      if (subcategories.length > 0 && !selectedSubcategory && !accessoryFlag) {
        setcategorySubCatError((prev) => ({
          ...prev,
          subCategoryError: "Subcategory is Required",
        }));
        return;
      }

      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const hoverImageUrl = hoverImage && hoverImage[0];

      if (!posterImageUrl) {
        setcategorySubCatError((prev) => ({
          ...prev,
          posterImageError: "Poster Image is Required",
        }));
        return;
      }

      if (!imagesUrl || !(imagesUrl.length > 0)) {
        setcategorySubCatError((prev) => ({
          ...prev,
          prodImages: "Please upload at least 1 product-relevant image",
        }));
        return;
      }

      const images = {
        subcategory: +selectedSubcategory,
      };

      /* eslint-disable */

      const { products, lengthPrice, ...restValues } = values;
      /* eslint-enable */

      let newValues = {
        ...(accessoryFlag ? values : restValues),
        posterImageUrl,
        hoverImageUrl,
        productImages: imagesUrl,
        category: +selectedCategory,
        featureImages: featureImagesimagesUrl,
        colorCode: values.colorCode === '' ? undefined : values.colorCode
      };

      if (!accessoryFlag) {
        Object.assign(newValues, images);
      }

      setloading(true);

      const updateFlag = EditProductValue && EditInitialValues ? true : false;

      if (updateFlag && EditInitialValues?.id) {
        newValues = { id: +EditInitialValues?.id, ...newValues };
      }
      const { data } = updateFlag
        ? await updateProduct({ variables: { input: newValues } })
        : await createProduct({ variables: { input: newValues } });

      if (!data) {
        throw new Error("Mutation failed. No data returned.");
      }

      if (!data) {
        throw new Error("Mutation failed. No data returned.");
      }

      // ✅ Revalidate and show success message
      revalidateTag("products");
      Toaster(
        "success",
        updateFlag
          ? "Product has been successfully updated!"
          : "Product has been successfully added!"
      );

      resetForm();
      setloading(false);
      sethoverImage(undefined);
      setposterimageUrl(undefined);
      setImagesUrl([]);
      setfeatureImagesImagesUrl([]);
      setselecteMenu("Add All Products");
      if (updateFlag) {
        setEditProduct?.(undefined);
      }
      /* eslint-disable */
    } catch (err: any) {
      if (err?.graphQLErrors?.length > 0) {
        if (err?.graphQLErrors[0].message === "Authentication required") {
          router.push("/dashboard/Admin-login")
        }
        setError(err?.graphQLErrors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setloading(false);
    }
    /* eslint-enable */
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


  const [updateProduct] = useMutation(
    accessoryFlag ? UPDATE_ACCESSORY_MUTATION : UPDATE_PRODUCT,
    {
      context: {
        fetchOptions: {
          credentials: "include",
        },
      },
    }
  );


  const [createProduct] = useMutation(
    accessoryFlag ? CREATE_ACCESSORIES : CREATE_PRODUCT,
    {
      context: {
        fetchOptions: {
          credentials: "include",
        },
      },
    }
  );
  function handleSort() {
    if (dragImage.current === null || draggedOverImage.current === null) return;

    const imagesClone = imagesUrl && imagesUrl.length > 0 ? [...imagesUrl] : [];

    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;

    setImagesUrl(imagesClone);
  }

  function handleFeatreSort() {
    if (dragFeatureImage.current === null || draggedOverfeatureImage.current === null) return;

    const imagesClone = featureImagesimagesUrl && featureImagesimagesUrl.length > 0 ? [...featureImagesimagesUrl] : [];

    const temp = imagesClone[dragFeatureImage.current];
    imagesClone[dragFeatureImage.current] = imagesClone[draggedOverfeatureImage.current];
    imagesClone[draggedOverfeatureImage.current] = temp;

    setfeatureImagesImagesUrl(imagesClone);
  }

  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        if (!EditInitialValues) return;
        const selectedCat = categoriesList?.find(
          (cat) => cat.id === selectedCategory
        );
        setSubcategories(selectedCat?.subcategories || []);
        setImagesUrl(EditInitialValues ? EditProductValue?.productImages : []);
        sethoverImage(
          EditInitialValues?.hoverImageUrl
            ? [{ ...EditInitialValues.hoverImageUrl }]
            : []
        );
        setProductInitialValue?.(() => EditProductValue);
        setfeatureImagesImagesUrl(
          EditInitialValues ? EditProductValue?.featureImages : []
        );
      } catch (err) {
        throw err;
      }
    };

    CategoryHandler();
  }, [EditInitialValues]);



  const handleImageAltText = (
    index: number,
    newImageIndex: string,
    setImagesUrlhandler: React.Dispatch<
      React.SetStateAction<ProductImage[] | undefined>
    >,
    variantType: string
  ) => {
    setImagesUrlhandler((prev: ProductImage[] | undefined) => {
      if (!prev) return [];

      const updatedImagesUrl = prev?.map((item: ProductImage, i: number) =>
        i === index ? { ...item, [variantType]: newImageIndex } : item
      );
      return updatedImagesUrl;
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // Find the selected category and update subcategories
    const selectedCat = categoriesList?.find((cat) => cat.id === categoryId);
    setSubcategories(selectedCat?.subcategories || []);

    // Reset subcategory when category changes
    setSelectedSubcategory("");
  };

  const removedValuesHandler = (ChangedValue: IProductValues) => {
    const modifiedProductValues = Object.fromEntries(
      Object.entries(ChangedValue).filter(
        ([key]) => !excludedKeys.includes(key)
      )
    ) as IProductValues;
    return accessoryFlag
      ? { ...modifiedProductValues }
      : ChangedValue;
  };


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
          sethoverImage((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setImagesUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setfeatureImagesImagesUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );

        }, 0);
      } catch {
        showToast('error', 'Failed to upload cropped image');
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


    <Formik
      innerRef={formikRef}

      enableReinitialize
      initialValues={
        productInitialValue ? productInitialValue : AddproductsinitialValues
      }
      validationSchema={AddProductvalidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>

            <div className='flex flex-wrap mb-5 gap-2 justify-between items-center'>
              <p
                className="dashboard_primary_button"
                onClick={() => {
                  if (formik.dirty) {
                    const confirmLeave = window.confirm("You have unsaved changes. Do you want to leave without saving?");
                    if (!confirmLeave) return;
                  }
                  setselecteMenu("Add All Products");
                  setEditProduct?.(() => undefined);
                }}
              >
                <IoMdArrowRoundBack /> Back
              </p>
              <div className="flex justify-center gap-4">
                <Field name="status">
                  {({ field, form }: import('formik').FieldProps) => (
                    <div className="flex gap-4 items-center border-r-2 px-2">

                      {['DRAFT', 'PUBLISHED'].map((status) => {
                        const isActive = field.value === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => form.setFieldValue('status', status)}
                            disabled={isActive}
                            className={`px-4 py-2 rounded-md text-sm
                                  ${isActive
                                ?
                                ' border text-opacity-1 cursor-not-allowed bg-white dark:bg-black dark:text-white'
                                :
                                'dashboard_primary_button'
                              }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Field>
                <button
                  type="submit"
                  className="dashboard_primary_button cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "loading.." : 'Submit'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 bg-white dark:bg-black py-10 px-4 rounded-md shadow">
              <div className="flex flex-col gap-9 ">
                <div className="rounded-sm border  bg-white dark:bg-black py-4 px-6">
                  <div className="rounded-sm border  bg-white dark:bg-black">
                    <div className="border-b  py-4 px-4 ">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Poster Image
                      </h3>
                    </div>

                    {posterimageUrl && posterimageUrl?.length > 0 ? (
                      <div className="">
                        {posterimageUrl.map((item: ProductImage, index) => {
                          return (
                            <div key={index}>
                              <div className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-black transform transition-transform duration-300 hover:scale-105 w-fit">
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white dark:bg-black rounded-full">
                                  <RxCross2
                                    className="cursor-pointer border border-black  text-red-500 dark:text-red-700"
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
                                  className="object-cover cursor-crosshair w-44 h-44"
                                  width={300}
                                  height={400}
                                  loading="lazy"
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                              </div>

                              <input
                                className="dashboard_input "
                                placeholder="altText"
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
                  {categorySubCatError.posterImageError ? (
                    <p className="text-red-500">
                      {categorySubCatError.posterImageError}
                    </p>
                  ) : null}

                  <div className="flex flex-col ">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                        Product Title
                      </label>

                      <Field name="name">
                        {({ field, meta }: FieldProps) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Title"
                            className={`dashboard_input  ${meta.touched && meta.error
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                        )}
                      </Field>

                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 dark:text-red-700 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4 ">
                        Custom Url
                      </label>
                      <Field name="custom_url">
                        {({ field, meta }: FieldProps) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              placeholder="Title"
                              className={`dashboard_input ${meta.touched && meta.error
                                ? "border-red-500"
                                : ""
                                }`}
                            />
                            {meta.touched && meta.error ? (
                              <div className="text-red-500 dark:text-red-700 text-sm">
                                {meta.error}
                              </div>
                            ) : null}
                          </>
                        )}
                      </Field>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                        description{" "}
                      </label>
                      <textarea
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        placeholder="description"
                        className={`dashboard_input ${formik.touched.description &&
                          formik.errors.description
                          ? "border-red-500"
                          : ""
                          }`}
                      />
                      {formik.touched.description &&
                        formik.errors.description ? (
                        <div className="text-red-500 dark:text-red-700 text-sm">
                          {
                            formik.errors.description as FormikErrors<
                              FormValues["description"]
                            >
                          }
                        </div>
                      ) : null}
                    </div>

                    <div className="flex full items-center gap-4">
                      <div className="w-1/3 xs:w-1/3">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                          placeholder="Product Price"
                          min="0"
                          className={`dashboard_input ${formik.touched.price && formik.errors.price
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div className="text-red-500 dark:text-red-700 text-sm">
                            {" "}
                            {
                              formik.errors.price as FormikErrors<
                                FormValues["price"]
                              >
                            }
                          </div>
                        ) : null}
                      </div>

                      <div className="w-1/3 xs:w-1/3">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                          Discount Price
                        </label>

                        <Field
                          type="number"
                          name="discountPrice"
                          placeholder="How many items available"
                          min="0"
                          className={`dashboard_input ${formik.touched.discountPrice &&
                            formik.errors?.discountPrice
                            ? "border-red-500"
                            : ""
                            }`}
                        />

                        <ErrorMessage
                          name="discountPrice"
                          component="div"
                          className="text-red-500 dark:text-red-700 text-sm"
                        />
                      </div>

                      <div className="w-1/3 xs:w-1/3 ">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                          Stock
                        </label>

                        <Field
                          type="number"
                          name="stock"
                          placeholder="How many items available"
                          min="0"
                          className="dashboard_input"
                        />

                        <ErrorMessage
                          name="stock"
                          component="div"
                          className="text-red-500 dark:text-red-700 text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="flex gap-4">
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
                            className={`dashboard_input ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
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
                            className={`dashboard_input ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
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
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Meta Description
                        </label>
                        <textarea
                          name="Meta_Description"
                          onChange={formik.handleChange}
                          value={formik.values.Meta_Description}
                          placeholder="Meta Description"
                          className={`dashboard_input ${formik.touched.description &&
                            formik.errors.description
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.Meta_Description &&
                          formik.errors.Meta_Description ? (
                          <div className="text-red text-sm">
                            {formik.errors.Meta_Description as string}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-4 flex-col">
                      <div className="w-full">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Select Categories & Sub Categories
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <select
                            name="category"
                            value={selectedCategory ? selectedCategory : ''}
                            onChange={handleCategoryChange}
                            className="dashboard_input"
                          >
                            <option value="" disabled>
                              Select Category
                            </option>
                            {categoriesList?.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>

                          {categorySubCatError.categoryError ? (
                            <p className="text-red-500">
                              {categorySubCatError.categoryError}
                            </p>
                          ) : null}
                        </div>

                        {/* Subcategory Selection */}

                        {!accessoryFlag && subcategories.length > 0 && (
                          <div className="mt-4">
                            <h2 className="text-lg font-medium mb-3">
                              Subcategories
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <select
                                name="subcategory"
                                value={selectedSubcategory}
                                onChange={(e) =>
                                  setSelectedSubcategory(e.target.value)
                                }
                                className="dashboard_input"
                              >
                                <option value="" disabled>
                                  Select Subcategory
                                </option>
                                {subcategories.map(
                                  (subCat: { id: string; name: string }) => (
                                    <option key={subCat.id} value={subCat.id}>
                                      {subCat.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        )}

                        {categorySubCatError.subCategoryError ? (
                          <p className="text-red-500">
                            {categorySubCatError.subCategoryError}
                          </p>
                        ) : null}
                      </div>

                      {accessoryFlag ? (
                        <>
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Add Products
                          </label>
                          <FieldArray name="products">
                            {({ push, remove }) => (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-scroll">
                                {products?.map((product) => {
                                  const isChecked =
                                    formik.values.products?.includes(
                                      product.id.toString()
                                    );
                                  return (
                                    <label
                                      key={product.id}
                                      className="flex items-center space-x-2"
                                    >
                                      <Field
                                        type="checkbox"
                                        name="products"
                                        value={product.id.toString()}
                                        checked={isChecked}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          if (e.target.checked) {
                                            push(product.id.toString());
                                          } else {
                                            remove(
                                              formik.values.products.indexOf(
                                                product.id.toString()
                                              )
                                            );
                                          }
                                        }}
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                      />
                                      <span className="text-black dark:text-white">
                                        {product.name}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                          </FieldArray>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                <div className="rounded-sm border  bg-white  dark:bg-black mt-3">
                  <div className="border-b  py-4 px-6 ">
                    <h3 className="font-medium text-black dark:text-white">
                      FAQS Details
                    </h3>
                  </div>
                  <div className="flex flex-col py-4 px-6">
                    <FieldArray name="FAQS">
                      {({ push, remove }) => (
                        <div className="flex flex-col gap-2">
                          {formik.values.FAQS &&
                            formik.values.FAQS.map(
                              (
                                model: AdditionalInformation,
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <input
                                    type="text"
                                    name={`FAQS[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.FAQS[index].name}
                                    placeholder="Model Name"
                                    className={`dashboard_input ${model.name &&
                                      (
                                        formik.errors.FAQS as FormikErrors<
                                          FormValues["FAQS"]
                                        >
                                      )?.[index]
                                      ? "border-red-500 dark:border-white"
                                      : ""
                                      }`}
                                  />
                                  <input
                                    type="text"
                                    name={`FAQS[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.FAQS[index].detail}
                                    placeholder="Model Detail"
                                    className={`dashboard_input ${model.detail &&
                                      (
                                        formik.errors.FAQS as FormikErrors<
                                          FormValues["FAQS"]
                                        >
                                      )?.[index]
                                      ? "border-red-500 dark:border-white"
                                      : ""
                                      }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500 dark:text-white"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                            )}
                          <button
                            type="button"
                            onClick={() => push({ name: "", detail: "" })}
                            className="px-4 py-2 bg-black text-white dark:bg-primary dark:border-0  rounded-md shadow-md w-fit"
                          >
                            FAQ Details
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="rounded-sm border  bg-white  dark:bg-black mt-3">
                  <div className="border-b  py-4 px-6 ">
                    <h3 className="font-medium text-black dark:text-white">
                      Additional information
                    </h3>
                  </div>
                  <div className="flex flex-col py-4 px-6">
                    <FieldArray name="AdditionalInformation">
                      {({ push, remove }) => (
                        <div className="flex flex-col gap-2">
                          {formik.values.AdditionalInformation &&
                            formik.values.AdditionalInformation.map(
                              (
                                model: AdditionalInformation,
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  className="flex gap-2 items-center"
                                >
                                  <input
                                    type="text"
                                    name={`AdditionalInformation[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.AdditionalInformation[
                                        index
                                      ].name
                                    }
                                    placeholder="Model Name"
                                    className={`dashboard_input ${model.name &&
                                      (
                                        formik.errors
                                          .AdditionalInformation as FormikErrors<
                                            FormValues["AdditionalInformation"]
                                          >
                                      )?.[index]
                                      ? "border-red-500 dark:border-white"
                                      : ""
                                      }`}
                                  />
                                  <input
                                    type="text"
                                    name={`AdditionalInformation[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.AdditionalInformation[
                                        index
                                      ].detail
                                    }
                                    placeholder="Model Detail"
                                    className={`dashboard_input ${model.detail &&
                                      (
                                        formik.errors
                                          .AdditionalInformation as FormikErrors<
                                            FormValues["AdditionalInformation"]
                                          >
                                      )?.[index]
                                      ? "border-red-500 dark:border-white"
                                      : ""
                                      }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500 dark:text-white"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                            )}
                          <button
                            type="button"
                            onClick={() => push({ name: "", detail: "" })}
                            className="px-4 py-2 bg-black text-white dark:bg-primary dark:border-0  rounded-md shadow-md w-fit"
                          >
                            Add Model
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                </div>
                
              </div>

              <div className="flex flex-col gap-5">

                <div className="rounded-sm border  bg-white  dark:bg-black">
                  <div className="border-b  py-4 px-6 ">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Dimentions
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
                        className='dashboard_input'
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
                        className='dashboard_input'
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
                        className='dashboard_input'
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                    Waterproof
                  </label>

                  <div className="flex items-center gap-2">
                    <Field name="waterproof">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<boolean>;
                        form: FormikProps<{ waterproof: boolean }>;
                      }) => (
                        <input
                          type="checkbox"
                          name={field.name}
                          checked={Boolean(field.value)}
                          onChange={() =>
                            form.setFieldValue(field.name, !field.value)
                          }
                          className="h-5 w-5 rounded  bg-transparent text-primary focus:ring-primary  "
                        />
                      )}
                    </Field>
                    <span className="text-black dark:text-white">
                      Is this waterproof?
                    </span>
                  </div>

                  <ErrorMessage
                    name="waterproof"
                    component="div"
                    className="text-red-500 dark:text-red-700 text-sm"
                  />
                </div>

                <div className="py-4 px-6 rounded-sm border ">
                  <div className="rounded-sm border  bg-white mb-4 dark:bg-black">
                    <div className="border-b  py-4 px-6 ">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Colours
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-6">
                      <FieldArray name="colors">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.colors &&
                              formik.values.colors.map(
                                (
                                  model: AdditionalInformation,
                                  index: number
                                ) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      type="text"
                                      name={`colors[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.colors?.[index].name}
                                      placeholder="color Name"
                                      className="dashboard_input"
                                    />
                                    <input
                                      type="text"
                                      name={`colors[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.colors?.[index].detail}
                                      placeholder="add code"
                                      className="dashboard_input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="ml-2 text-red-500 "
                                    >
                                      <RxCross2
                                        className="text-red-500 dark:text-white"
                                        size={25}
                                      />
                                    </button>
                                  </div>
                                )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 bg-black text-white dark:bg-primary dark:border-0  rounded-md shadow-md w-fit"
                            >
                              Add color
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">

                  <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                      Add Color Code
                    </label>
                    <Field
                      type="number"
                      name="colorCode"
                      placeholder="enter color code"
                      min="0"
                      className="dashboard_input"
                    />

                    <ErrorMessage
                      name="colorCode"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />
                  </div>
                  <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                      Add Residential Warranty
                    </label>

                    <Field
                      type="text"
                      name="ResidentialWarranty"
                      placeholder="5 years"
                      min="0"
                      className="dashboard_input"
                    />

                    <ErrorMessage
                      name="ResidentialWarranty"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />
                  </div>

                  <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                      Add Commercial Warranty
                    </label>

                    <Field
                      type="text"
                      name="CommmericallWarranty"
                      placeholder="5 years"
                      min="0"
                      className="dashboard_input"
                    />

                    <ErrorMessage
                      name="CommmericallWarranty"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />
                  </div>

                  <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                      Add Plank Width
                    </label>

                    <Field
                      type="text"
                      name="plankWidth"
                      placeholder="183mm"
                      min="0"
                      className="dashboard_input"
                    />

                    <ErrorMessage
                      name="plankWidth"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />
                  </div>

                  <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                      Add Thickness
                    </label>

                    <Field
                      type="text"
                      name="thickness"
                      placeholder="5.5mm"
                      min="0"
                      className="dashboard_input"
                    />

                    <ErrorMessage
                      name="thickness"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />
                  </div>

                  <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                      Box Coverage
                    </label>

                    <Field
                      type="text"
                      name="boxCoverage"
                      placeholder="2.9"
                      min="0"
                      className="dashboard_input"
                    />

                    <ErrorMessage
                      name="boxCoverage"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />
                  </div>

                  {accessoryFlag &&
                    <div className="mb-4 bg-white dark:bg-black text-black dark:text-white">
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                        length Per Meter Price
                      </label>

                      <Field
                        type="text"
                        name="lengthPrice"
                        placeholder="2m"
                        min="0"
                        className="dashboard_input"
                      />

                      <ErrorMessage
                        name="lengthPrice"
                        component="div"
                        className="text-red-500 dark:text-red-700 text-sm"
                      />
                    </div>}

                  </div>
                </div>



    

                <div className="rounded-sm border  bg-white  dark:bg-black">
                  <div className="border-b  py-4 px-4 ">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Hover Image
                    </h3>
                  </div>

                  {hoverImage && hoverImage.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                      {hoverImage.map((item: ProductImage, index) => {
                        return (
                          <div key={index}>
                            <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full">
                                <RxCross2
                                  className="cursor-pointer text-red-500 dark:text-red-700"
                                  size={17}
                                  onClick={() => {
                                    ImageRemoveHandler(
                                      item.public_id,
                                      sethoverImage,
                                      finalToken
                                    );
                                  }}
                                />
                              </div>
                              <Image
                                onClick={() => handleCropClick(item.imageUrl)}
                                key={index}
                                className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg cursor-crosshair"
                                width={100}
                                height={100}
                                loading="lazy"
                                src={item?.imageUrl ? item?.imageUrl : ""}
                                alt={`productImage-${index}`}
                              />
                            </div>
                            <input
                              className="dashboard_input"
                              placeholder="altText"
                              type="text"
                              name="altText"
                              value={item?.altText || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  sethoverImage,
                                  "altText"
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ImageUploader sethoverImage={sethoverImage} />
                  )}
                </div>

                <div className="rounded-sm border  bg-white  dark:bg-black">
                  <div className="border-b  py-4 px-4 ">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Product Images
                    </h3>
                  </div>

                  <ImageUploader setImagesUrl={setImagesUrl} />

                  {imagesUrl && imagesUrl.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-h-[400px] overflow-y-scroll">
                      {imagesUrl.map((item: ProductImage, index) => {
                        return (
                          <div
                            key={index}
                            draggable
                            onDragStart={() => (dragImage.current = index)}
                            onDragEnter={() =>
                              (draggedOverImage.current = index)
                            }
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                          >
                            <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                              <div
                                className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full"
                                draggable
                              >
                                <RxCross2
                                  className="cursor-pointer text-red-500 dark:text-red-700"
                                  size={17}
                                  onClick={() => {
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setImagesUrl,
                                      finalToken
                                    );
                                  }}
                                />
                              </div>
                              <Image
                                onClick={() => handleCropClick(item.imageUrl)}
                                key={index}
                                className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg cursor-crosshair"
                                width={300}
                                height={200}
                                loading="lazy"
                                src={item?.imageUrl || ""}
                                alt={`productImage-${index}` || ""}
                              />
                            </div>

                            <input
                              className="dashboard_input"
                              placeholder="altText"
                              type="text"
                              name="altText"
                              value={item?.altText || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "altText"
                                )
                              }
                            />
                            <input
                              className="dashboard_input"
                              placeholder="Plank Width"
                              type="text"
                              name="plankWidth"
                              value={item?.plankWidth || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "plankWidth"
                                )
                              }
                            />
                            <input
                              className="dashboard_input"
                              placeholder="Plank Height"
                              type="text"
                              name="plankHeight"
                              value={item?.plankHeight || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "plankHeight",

                                )
                              }
                            />
                            <input
                              className="dashboard_input"
                              placeholder="colorCode"
                              type="text"
                              name="colorCode"
                              value={item?.colorCode || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "colorCode"
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                {categorySubCatError.prodImages ? (
                  <p className="text-red-500">
                    {categorySubCatError.prodImages}
                  </p>
                ) : null}

                <div className="rounded-sm border  bg-white  dark:bg-black">
                  <div className="border-b  py-4 px-4 ">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Feature Images
                    </h3>
                  </div>
                  <ImageUploader setImagesUrl={setfeatureImagesImagesUrl} />

                  {featureImagesimagesUrl &&
                    featureImagesimagesUrl.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-h-[400px] overflow-y-scroll">
                      {featureImagesimagesUrl.map(
                        (item: ProductImage, index) => {
                          return (
                            <div
                              key={index}
                              draggable
                              onDragStart={() => (dragFeatureImage.current = index)}
                              onDragEnter={() =>
                                (draggedOverfeatureImage.current = index)
                              }
                              onDragEnd={handleFeatreSort}
                              onDragOver={(e) => e.preventDefault()}
                            >
                              <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                                <div
                                  className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full"
                                  draggable
                                >
                                  <RxCross2
                                    className="cursor-pointer text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setfeatureImagesImagesUrl,
                                        finalToken
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg cursor-crosshair"
                                  width={300}
                                  height={200}
                                  loading="lazy"
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}` || ""}
                                />
                              </div>

                              <input
                                className="dashboard_input"
                                placeholder="altText"
                                type="text"
                                name="altText"
                                value={item?.altText || ""}
                                onChange={(e) =>
                                  handleImageAltText(
                                    index,
                                    String(e.target.value),
                                    setfeatureImagesImagesUrl,
                                    "altText"
                                  )
                                }
                              />

                              {accessoryFlag && (
                                <>
                                  <input
                                    className="dashboard_input"
                                    placeholder="color"
                                    type="text"
                                    name="color"
                                    value={item?.color || ""}
                                    onChange={(e) =>
                                      handleImageAltText(
                                        index,
                                        String(e.target.value),
                                        setfeatureImagesImagesUrl,
                                        "color"
                                      )
                                    }
                                  />
                                  <input
                                    className="dashboard_input"
                                    placeholder="colorName"
                                    type="text"
                                    name="colorName"
                                    value={item?.colorName}
                                    onChange={(e) =>
                                      handleImageAltText(
                                        index,
                                        String(e.target.value),
                                        setfeatureImagesImagesUrl,
                                        "colorName"
                                      )
                                    }
                                  />
                                </>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {imgError ? (
              <div className="flex justify-center">
                <div className="text-red-500 pt-2 pb-2">{imgError}</div>
              </div>
            ) : null}
                <Field name="status">
                  {({ field, form }: import('formik').FieldProps) => (
                    <div className="flex gap-4 items-center mt-5">
                    <label className="font-semibold text-black dark:text-white"> {accessoryFlag ? "Accessory" :"Product"} Status:</label>
                      {['DRAFT', 'PUBLISHED'].map((status) => {
                        const isActive = field.value === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => form.setFieldValue('status', status)}
                            disabled={isActive}
                            className={`px-4 py-2 rounded-md text-sm
                                  ${isActive
                                ?
                                ' border text-opacity-1 cursor-not-allowed'
                                :
                                'dashboard_primary_button'
                              }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Field>
            <button
              type="submit"
              className="dashboard_primary_button mt-2 mx-auto"
              disabled={loading}
            >
              {loading ? <Loader color="white" /> : "Submit"}
            </button>
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

  );
};

export default AddProd;
