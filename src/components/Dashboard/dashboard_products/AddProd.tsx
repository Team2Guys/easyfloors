'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Formik, FieldArray, FormikErrors, Form, FormikHelpers, Field, ErrorMessage, FieldProps } from 'formik';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import Toaster from 'components/Toaster/Toaster';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Loader from 'components/Loader/Loader';
import { FormValues } from 'types/type';
import {
  AddproductsinitialValues,
  AddProductvalidationSchema,
} from 'data/data';
import revalidateTag from 'components/ServerActons/ServerAction';
import Cookies from 'js-cookie';
import { AdditionalInformation, EDIT_PRODUCT_PROPS, ProductImage } from 'types/prod';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS } from 'types/PagesProps';

const initialErrors = { categoryError: "", subCategoryError: "", posterImageError: "", prodImages: "" }

const AddProd: React.FC<DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS> = ({ EditInitialValues, EditProductValue, setselecteMenu, setEditProduct, categoriesList }) => {

  const [imagesUrl, setImagesUrl] = useState<ProductImage[] | undefined>(EditInitialValues ? EditInitialValues?.productImages : [],);
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(EditInitialValues ? [EditInitialValues?.posterImageUrl] : [],);
  const [hoverImage, sethoverImage] = useState<ProductImage[] | undefined>(
    EditInitialValues?.hoverImageUrl ? [{ ...EditInitialValues.hoverImageUrl }] : []
  );

  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<EDIT_PRODUCT_PROPS | null | undefined>(EditProductValue);
  const [imgError, setError] = useState<string | null | undefined>();
  const [selectedCategory, setSelectedCategory] = useState(EditInitialValues ? EditInitialValues.category : "");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(EditInitialValues ? EditInitialValues.subcategory : "");
  const [categorySubCatError, setcategorySubCatError] = useState(initialErrors);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);

  function handleSort() {
    if (dragImage.current === null || draggedOverImage.current === null) return;

    const imagesClone = imagesUrl && imagesUrl.length > 0 ? [...imagesUrl] : [];

    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;

    setImagesUrl(imagesClone);
  }

  useEffect(() => {


    const CategoryHandler = async () => {
      try {
        if (!EditInitialValues) return;
        setImagesUrl(EditInitialValues ? EditProductValue?.productImages : [])
        sethoverImage(EditInitialValues?.hoverImageUrl ? [{ ...EditInitialValues.hoverImageUrl }] : [])
        setProductInitialValue?.(() => EditProductValue)

      } catch (err) {
        throw err;
      }
    };

    CategoryHandler();
  }, [EditInitialValues]);

  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  const finalToken = token ? token : superAdminToken;


  const onSubmit = async (values: EDIT_PRODUCT_PROPS, { resetForm }: FormikHelpers<EDIT_PRODUCT_PROPS>) => {
    try {
      setcategorySubCatError(initialErrors);

      if (!selectedCategory) {

        setcategorySubCatError((prev) => ({
          ...prev,
          categoryError: "Category is Required",
        }));
        return
      }

      if (subcategories.length > 0 && !selectedSubcategory) {
        setcategorySubCatError((prev) => ({
          ...prev,
          subCategoryError: "Subcategory is Required",
        }));
        return
      }

      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const hoverImageUrl = hoverImage && hoverImage[0];

      if (!posterImageUrl) {
        setcategorySubCatError((prev) => ({
          ...prev,
          posterImageError: "Poster Images is Required",
        }));
        return
      };
      if (!imagesUrl || !(imagesUrl.length > 0)) {
        setcategorySubCatError((prev) => ({
          ...prev,
          prodImages: "Please upload Atleast 1 product relevant Images",
        }));
        return
      };

      let newValues = {
        ...values,
        posterImageUrl: posterImageUrl,
        hoverImageUrl: hoverImageUrl,
        productImages: imagesUrl,
        category: +selectedCategory,
        subcategory: +selectedSubcategory,
      };

      setloading(true);

      const updateFlag = EditProductValue && EditInitialValues ? true : false;

      if (updateFlag && EditInitialValues?.id) {
        newValues = { id: +EditInitialValues?.id, ...newValues };
      }

      // ✅ Define GraphQL Mutation
      const mutation = updateFlag
        ? `mutation UpdateProduct($input: UpdateProductInput!) {
          updateProduct(updateProductInput: $input) {
            id
            name
            price
            discountPrice
            description
            stock
            posterImageUrl
            hoverImageUrl
            productImages
            colors
            createdAt
            updatedAt
            Canonical_Tag
            Meta_Description
            Meta_Title
            last_editedBy
            custom_url
            waterproof
            AdditionalInformation
            plankWidth
            ResidentialWarranty
            CommmericallWarranty
            categoryId
          }
        }`
        : `mutation CreateProduct($input: CreateProductInput!) {
          createProduct(createProductInput: $input) {
            id
            name
            price
            discountPrice
            description
            stock
            posterImageUrl
            hoverImageUrl
            productImages
            colors
            createdAt
            updatedAt
            Canonical_Tag
            Meta_Description
            Meta_Title
            last_editedBy
            custom_url
            waterproof
            AdditionalInformation
            plankWidth
            ResidentialWarranty
            CommmericallWarranty
            categoryId
          }
        }`;


      // ✅ GraphQL Variables
      const variables = updateFlag ? { id: EditInitialValues?.id, input: newValues } : { input: newValues };

      // ✅ API Request with GraphQL
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`,
        {
          query: mutation,
          variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: finalToken, // Pass token if required
          },
        }
      );
      // ✅ Handle Response
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
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
      setselecteMenu("Add All Products");
      if (updateFlag) {
        setEditProduct?.(undefined);
      }


      //eslint-disable-next-line
    } catch (err: any) {

      if (err?.response && err?.response?.data && err?.response?.data.error) {
        setError(err?.response?.data.message);
      } else {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } finally {
      setloading(false);
    }
  };


  const handleImageAltText = (
    index: number,
    newImageIndex: string,
    setImagesUrlhandler: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  ) => {
    setImagesUrlhandler((prev: ProductImage[] | undefined) => {
      if (!prev) return [];

      const updatedImagesUrl = prev?.map((item: ProductImage, i: number) => i === index ? { ...item, altText: newImageIndex } : item);
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
  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:bg-black dark:text-white"
        onClick={() => {
          setselecteMenu('Add All Products');
          setEditProduct?.(() => undefined);
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
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
              <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9 ">
                  <div className="rounded-sm border border-stroke bg-white dark:bg-black py-4 px-6">
                    <div className="rounded-sm border border-stroke bg-white dark:bg-black">
                      <div className="border-b border-stroke py-4 px-4 ">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Poster Image
                        </h3>
                      </div>

                      {posterimageUrl && posterimageUrl?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                          {posterimageUrl.map((item: ProductImage, index) => {
                            return (
                              <div key={index}>
                                <div className="relative group rounded-lg overflow-hidden shadow-md bg-white dark:bg-black transform transition-transform duration-300 hover:scale-105">
                                  <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white dark:bg-black rounded-full">
                                    <RxCross2
                                      className="cursor-pointer text-red-500 dark:text-red-700"
                                      size={17}
                                      onClick={() => {
                                        ImageRemoveHandler(
                                          item.public_id,
                                          setposterimageUrl,
                                        );
                                      }}
                                    />
                                  </div>
                                  <Image
                                    key={index}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={400}
                                    loading='lazy'

                                    src={item?.imageUrl || ""}
                                    alt={`productImage-${index}`}
                                  />
                                </div>
                                <input
                                  className="border text-black mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setposterimageUrl,
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
                    {categorySubCatError.posterImageError ? <p className='text-red-500'>{categorySubCatError.posterImageError}</p> : null}

                    <div className="flex flex-col ">
                      <div className='w-full'>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                          Product Title
                        </label>

                        <Field name="name">
                          {({ field, meta }: FieldProps) => (
                            <input
                              {...field}
                              type="text"
                              placeholder="Title"
                              className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${meta.touched && meta.error ? "border-red-500" : ""
                                }`}
                            />
                          )}
                        </Field>

                        <ErrorMessage name="name" component="div" className="text-red-500 dark:text-red-700 text-sm" />
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
                                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${meta.touched && meta.error ? "border-red-500" : ""
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
                          description{' '}
                        </label>
                        <textarea
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.description &&
                            formik.errors.description
                            ? 'border-red-500'
                            : ''
                            }`}
                        />
                        {formik.touched.description &&
                          formik.errors.description ? (
                          <div className="text-red-500 dark:text-red-700 text-sm">
                            {
                              formik.errors.description as FormikErrors<
                                FormValues['description']
                              >
                            }
                          </div>
                        ) : null}
                      </div>

                      <div className="flex full gap-4">
                        <div className="w-1/2 xs:w-1/3">
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.price && formik.errors.price
                              ? 'border-red-500'
                              : ''
                              }`}
                          />
                          {formik.touched.price && formik.errors.price ? (
                            <div className="text-red-500 dark:text-red-700 text-sm">
                              {' '}
                              {
                                formik.errors.price as FormikErrors<
                                  FormValues['price']
                                >
                              }
                            </div>
                          ) : null}
                        </div>

                        <div className="w-1/2 xs:w-1/3">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            name="discountPrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.discountPrice}
                            placeholder="Discount Price"
                            min="0"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.discountPrice &&
                              formik.errors.discountPrice
                              ? 'border-red-500'
                              : ''
                              }`}
                          />
                          {formik.touched.discountPrice &&
                            formik.errors.discountPrice ? (
                            <div className="text-red-500 dark:text-red-700 text-sm">
                              {formik.errors.discountPrice as string}
                            </div>
                          ) : null}
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
                              className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
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
                              className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
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
                        <div>
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Meta Description
                          </label>
                          <textarea
                            name="Meta_Description"
                            onChange={formik.handleChange}
                            value={formik.values.Meta_Description}
                            placeholder="Meta Description"
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.description &&
                              formik.errors.description
                              ? 'border-red-500'
                              : ''
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
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

                            {categorySubCatError.categoryError ? <p className='text-red-500'>{categorySubCatError.categoryError}</p> : null}
                          </div>

                          {/* Subcategory Selection */}
                          {subcategories.length > 0 && (
                            <div className="mt-4">
                              <h2 className="text-lg font-medium mb-3">Subcategories</h2>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <select
                                  name="subcategory"
                                  value={selectedSubcategory}
                                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                  <option value="" disabled>
                                    Select Subcategory
                                  </option>
                                  {subcategories.map((subCat: { id: string, name: string }) => (
                                    <option key={subCat.id} value={subCat.id}>
                                      {subCat.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )}

                          {categorySubCatError.subCategoryError ? <p className='text-red-500'>{categorySubCatError.subCategoryError}</p> : null}

                        </div>


                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="py-4 px-6 rounded-sm border border-stroke">
                    <div className="mb-4  bg-white  dark:bg-black  text-black dark:text-white">
                      <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                        Add Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.stock}
                        placeholder="How many items available"
                        min="0"
                        className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.stock && formik.errors.stock
                          ? 'border-red-500'
                          : ''
                          }`}
                      />
                      {formik.touched.stock && formik.errors.stock ? (
                        <div className="text-red-500 dark:text-red-700 text-sm">
                          {formik.errors.stock as string}
                        </div>
                      ) : null}
                    </div>
                  </div>



                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
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
                                (model: AdditionalInformation, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
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
                                      className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${model.name &&
                                        (
                                          formik.errors
                                            .AdditionalInformation as FormikErrors<
                                              FormValues['AdditionalInformation']
                                            >
                                        )?.[index]
                                        ? 'border-red-500 dark:border-white'
                                        : ''
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
                                      className={`w-full rounded-lg ml-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${model.detail &&
                                        (
                                          formik.errors
                                            .AdditionalInformation as FormikErrors<FormValues['AdditionalInformation']>
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
                                        size={25}
                                      />
                                    </button>
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

                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Hover Image
                      </h3>
                    </div>

                    {hoverImage && hoverImage.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {hoverImage.map((item: ProductImage, index) => {
                          console.log(hoverImage, "item")
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
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg"
                                  width={100}
                                  height={100}
                                  loading='lazy'
                                  src={item?.imageUrl ? item?.imageUrl : ''}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                placeholder="altText"
                                type="text"
                                name="altText"
                                value={item?.altText || ""}
                                onChange={(e) =>
                                  handleImageAltText(
                                    index,
                                    String(e.target.value),
                                    sethoverImage,
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

                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Product Images
                      </h3>
                    </div>

                    <ImageUploader setImagesUrl={setImagesUrl} />

                    {imagesUrl && imagesUrl.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {imagesUrl.map((item: ProductImage, index) => {
                          return (
                            <div key={index}
                              draggable
                              onDragStart={() => (dragImage.current = index)}
                              onDragEnter={() => (draggedOverImage.current = index)}
                              onDragEnd={handleSort}
                              onDragOver={(e) => e.preventDefault()}
                            >
                              <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full" draggable>
                                  <RxCross2
                                    className="cursor-pointer text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setImagesUrl,
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg"
                                  width={300}
                                  height={200}
                                  loading='lazy'
                                  src={item?.imageUrl || ""}

                                  alt={`productImage-${index}` || ""}
                                />
                              </div>

                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                placeholder="altText"
                                type="text"
                                name="altText"
                                value={item?.altText || ""}
                                onChange={(e) =>
                                  handleImageAltText(
                                    index,
                                    String(e.target.value),
                                    setImagesUrl,
                                  )
                                }
                              />

                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  {categorySubCatError.prodImages ? <p className='text-red-500'>{categorySubCatError.prodImages}</p> : null}

                </div>
              </div>

              {imgError ? (
                <div className="flex justify-center">
                  <div className="text-red-500 pt-2 pb-2">{imgError}</div>
                </div>
              ) : null}

              <button
                type="submit"
                className="px-10 py-2 mt-2 bg-black text-white rounded-md shadow-md dark:bg-primary dark:border-0"
                disabled={loading}
              >
                {loading ? <Loader color="white" /> : 'Submit'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddProd;
