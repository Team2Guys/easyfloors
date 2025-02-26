'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Formik, FieldArray, FormikErrors, Form } from 'formik';

import Imageupload from 'components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import Toaster from 'components/Toaster/Toaster';
import axios from 'axios';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Loader from 'components/Loader/Loader';
import { ADDPRODUCTFORMPROPS, FormValues } from 'types/type';
import {
  AddproductsinitialValues,
  AddProductvalidationSchema,
} from 'data/data';
import { Checkbox, Select } from 'antd';
import showToast from 'components/Toaster/Toaster';
import revalidateTag from 'components/ServerActons/ServerAction';
import { ICategory } from 'types/type';
import Cookies from 'js-cookie';

const FormElements: React.FC<ADDPRODUCTFORMPROPS> = ({ EditInitialValues, EditProductValue, setselecteMenu, setEditProduct, categoriesList }) => {

  const [imagesUrl, setImagesUrl] = useState<any[]>(EditInitialValues ? EditInitialValues.productImages : [],);
  const [posterimageUrl, setposterimageUrl] = useState<any[] | undefined | null>(
    EditInitialValues
      ? [
        {
          imageUrl: EditInitialValues.posterImageUrl,
          public_id: EditInitialValues.posterImagePublicId,
          altText: EditInitialValues.posterImageAltText,
          Index: EditInitialValues.posterImageIndex,
        },
      ]
      : [],
  );
  const [hoverImage, sethoverImage] = useState<any[] | null | undefined>(EditInitialValues ? [{ imageUrl: EditInitialValues.hoverImageUrl, public_id: EditInitialValues.hoverImagePublicId, altText: EditInitialValues.hoverImageAltText }] : [],
  );
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<any | null | undefined>(EditProductValue);
  const [imgError, setError] = useState<string | null | undefined>();
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);

  function handleSort() {
    if (dragImage.current === null || draggedOverImage.current === null) return;

    const imagesClone = [...imagesUrl];
    const temp = imagesClone[dragImage.current];
    imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
    imagesClone[draggedOverImage.current] = temp;

    setImagesUrl(imagesClone);
  }
  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        if (!EditInitialValues) return;
        const {
          posterImageUrl,
          imageUrl,
          _id,
          createdAt,
          updatedAt,
          __v,
          ...EditInitialProductValues
        } = EditInitialValues as any;
        console.log(EditInitialProductValues, 'dsfsdfds');
        console.log(
          posterImageUrl,
          imageUrl,
          _id,
          createdAt,
          updatedAt,
          __v,
          'EditInitialValues',
        );
        const categoryIds = EditInitialValues.categories?.map((category: any) => category.id) || [];
        setSelectedCategoryIds(categoryIds);

        const subcategoryIds = EditInitialValues.subcategories?.map((subcategory: any) => subcategory.id,) || [];
        setSelectedSubcategoryIds(subcategoryIds);

        setImagesUrl(EditInitialValues ? EditInitialValues.productImages : [])


        sethoverImage(EditInitialValues ? [{ imageUrl: EditInitialValues.hoverImageUrl, public_id: EditInitialValues.hoverImagePublicId, altText: EditInitialValues.hoverImageAltText }] : [],)
        setProductInitialValue(EditProductValue)

      } catch (err) {
        console.log(err, 'err');
      }
    };

    CategoryHandler();
  }, [EditInitialValues]);

  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  const finalToken = token ? token : superAdminToken;

  const onSubmit = async (values: any, { resetForm }: any) => {
    values.categories = selectedCategoryIds;
    values.subcategories = selectedSubcategoryIds;
    console.log(values, 'values')
    try {
      setError(null);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const hoverImageUrl = hoverImage && hoverImage[0];
      if (!posterImageUrl || !(imagesUrl.length > 0)) {
        return showToast('warn', 'Please select relevant Images');
      }
      let newValues = {
        ...values,
        posterImageUrl: posterImageUrl.imageUrl,
        posterImagePublicId: posterImageUrl.public_id,
        posterImageAltText: posterImageUrl.altText,
        posterImageIndex: posterImageUrl.Index,
        hoverImageUrl: hoverImageUrl.imageUrl,
        hoverImagePublicId: hoverImageUrl.public_id,
        hoverImageAltText: posterImageUrl.altText,
        productImages: imagesUrl,
        sale_counter:
          values.sale_counter === '' || EditInitialValues.sale_counter == null
            ? ''
            : values.sale_counter
              ? values.sale_counter
              : EditInitialValues.sale_counter,
      };
      setloading(true);

      const updateFlag = EditProductValue && EditInitialValues ? true : false;
      const addProductUrl = updateFlag ? `/api/product/update-product` : null;

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : '/api/product/add-product'}`;

      if (updateFlag && EditInitialValues?.id) {
        newValues = { id: EditInitialValues.id, ...newValues };
      }
      const response = await axios.post(url, newValues, {
        headers: {
          token: finalToken,
        },
      });


      revalidateTag('products');
      Toaster('success', updateFlag
        ? 'Product has been sucessufully Updated !'
        : response.data.message,
      );
      setProductInitialValue(AddproductsinitialValues);
      resetForm();
      setloading(false);
      sethoverImage(null);
      setposterimageUrl(undefined);
      setImagesUrl([]);
      setSelectedSubcategoryIds([]);
      setSelectedCategoryIds([]);
      setselecteMenu('Add All Products');
      updateFlag ? setEditProduct && setEditProduct(undefined) : null;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.message);
      } else {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    } finally {
      setloading(false);
    }
  };

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<any>([]);

  useEffect(() => {
    const selectedCategories = categoriesList?.filter((category) =>
      selectedCategoryIds.includes(category.id),
    );
    const subcategories = selectedCategories?.flatMap(
      (category: ICategory) => category.subcategories,
    );
    setFilteredSubcategories(subcategories || []);
  }, [selectedCategoryIds, categoriesList]);

  const handleSubcategoryChange = (subcategoryId: number, checked: boolean) => {
    setSelectedSubcategoryIds((prev) => {
      if (checked) {
        return [...prev, subcategoryId];
      } else {
        return prev.filter((id) => id !== subcategoryId);
      }
    });
  };

  const handleImageAltText = (
    index: number,
    newImageIndex: number | string,
    setImagesUrlhandler: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setImagesUrlhandler((prev: any) => {
      const updatedImagesUrl = prev.map((item: any, i: number) =>
        i === index ? { ...item, altText: newImageIndex } : item,
      );
      return updatedImagesUrl;
    });
  };
  const handleImageColor = (
    index: number,
    newImageIndex: number | string,
    setImagesUrlhandler: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setImagesUrlhandler((prev: any) => {
      const updatedImagesUrl = prev.map((item: any, i: number) =>
        i === index ? { ...item, color: newImageIndex } : item,
      );
      return updatedImagesUrl;
    });
  };
  const handleIndex = (
    index: string,
    newImageIndex: number | string,
    setImagesUrlhandler: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setImagesUrlhandler((prev: any) => {
      const updatedImagesUrl = prev.map((item: any) =>
        item.public_id === index ? { ...item, index: newImageIndex } : item,
      );
      return updatedImagesUrl;
    });
  };
  const handleImageSize = (
    index: number,
    newImageIndex: number | string,
    setImagesUrlhandler: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    setImagesUrlhandler((prev: any) => {
      const updatedImagesUrl = prev.map((item: any, i: number) =>
        i === index ? { ...item, size: newImageIndex } : item,
      );
      return updatedImagesUrl;
    });
  };

  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:bg-black dark:text-white"
        onClick={() => {
          setselecteMenu('Add All Products');
          setEditProduct(undefined);
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
                          Add Product Images
                        </h3>
                      </div>

                      {posterimageUrl && posterimageUrl?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                          {posterimageUrl.map((item: any, index) => {
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
                                    src={item?.imageUrl}
                                    alt={`productImage-${index}`}
                                  />
                                </div>
                                <input
                                  className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item.altText}
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
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col ">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4 ">
                          Product Title
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          placeholder="Title"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                            ? 'border-red-500'
                            : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 dark:text-red-700 text-sm">
                            {formik.errors.name as string}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white mt-4 ">
                          Custom Url
                        </label>
                        <input
                          type="text"
                          name="custom_url"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.custom_url}
                          placeholder="Title"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                            ? 'border-red-500'
                            : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.custom_url ? (
                          <div className="text-red-500 dark:text-red-700 text-sm">
                            {formik.errors.custom_url as string}
                          </div>
                        ) : null}
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
                      <div className="mt-4 md:w-1/2">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Sale Counter
                        </label>
                        <input
                          type="datetime-local"
                          name="sale_counter"
                          onChange={formik.handleChange}
                          value={formik.values.sale_counter}
                          min={new Date().toISOString().slice(0, 16)}
                          placeholder="Select Date and Time"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.sale_counter &&
                            formik.errors.sale_counter
                            ? 'border-red-500'
                            : ''
                            }`}
                        />
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

                        <div className="flex gap-4">
                          <div className="w-full">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                              Images Alt Text
                            </label>
                            <input
                              type="text"
                              name="Images_Alt_Text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.Images_Alt_Text}
                              placeholder="Images Alt Text"
                              className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                                ? 'border-red-500'
                                : ''
                                }`}
                            />
                            {formik.touched.Images_Alt_Text &&
                              formik.errors.Images_Alt_Text ? (
                              <div className="text-red text-sm">
                                {formik.errors.Images_Alt_Text as string}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-col">

                        <div className="w-full">
                          <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                            Select Parent Category (at least one)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {categoriesList?.map((category) => (
                              <div
                                key={category.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  checked={selectedCategoryIds.includes(
                                    category.id,
                                  )}
                                  className="custom-checkbox"
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setSelectedCategoryIds((prev) => {
                                      if (checked) {
                                        return [...prev, category.id];
                                      } else {
                                        return prev.filter(
                                          (id) => id !== category.id,
                                        );
                                      }
                                    });
                                  }}
                                  id={`category-${category.id}`}
                                />
                                <label
                                  htmlFor={`category-${category.id}`}
                                  className="ml-2 text-black dark:text-white"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <h2 className="text-lg font-medium mb-3">
                            Subcategories
                          </h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredSubcategories.map(
                              (subcategory: ICategory) => (
                                <div
                                  key={subcategory.id}
                                  className="flex items-center space-x-2 p-2 border rounded"
                                >
                                  <Checkbox
                                    checked={selectedSubcategoryIds.includes(
                                      subcategory.id,
                                    )}
                                    className="custom-checkbox"
                                    onChange={(e) =>
                                      handleSubcategoryChange(
                                        subcategory.id,
                                        e.target.checked,
                                      )
                                    }
                                    id={`subcategory-${subcategory.id}`}
                                  />
                                  <label
                                    htmlFor={`subcategory-${subcategory.id}`}
                                    className="ml-2 text-black dark:text-white"
                                  >
                                    {subcategory.name}
                                  </label>
                                </div>
                              ),
                            )}
                          </div>
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
                        Policy Information
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-6">
                      <FieldArray name="sections">
                        {({ push: pushSection, remove: removeSection }) => (
                          <>
                            {(formik.values.sections || []).map(
                              (section: any, sectionIndex: number) => (
                                <div
                                  key={sectionIndex}
                                  className="rounded-sm border border-stroke bg-white dark:bg-black mt-2"
                                >
                                  <div className="border-b border-stroke py-4 px-6 dark:border-strokedark flex items-center">
                                    <input
                                      type="text"
                                      name={`sections[${sectionIndex}].heading`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={section.heading || ''}
                                      placeholder="Section Heading"
                                      className="font-medium text-black dark:text-white w-full bg-transparent px-5 py-3 rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark dark:bg-form-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeSection(sectionIndex)
                                      }
                                      className="ml-4 text-red-500"
                                    >
                                      <RxCross2
                                        className="text-red-500 dark:text-white"
                                        size={25}
                                      />
                                    </button>
                                  </div>
                                  <div className="flex flex-col py-4 px-6">
                                    <FieldArray
                                      name={`sections[${sectionIndex}].additionalInformation`}
                                    >
                                      {({
                                        push: pushInfo,
                                        remove: removeInfo,
                                      }) => (
                                        <div className="flex flex-col gap-2">
                                          {(
                                            section.additionalInformation || []
                                          ).map(
                                            (
                                              model: any,
                                              modelIndex: number,
                                            ) => (
                                              <div
                                                key={modelIndex}
                                                className="flex items-center"
                                              >
                                                <input
                                                  type="text"
                                                  name={`sections[${sectionIndex}].additionalInformation[${modelIndex}].name`}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={model.name || ''}
                                                  placeholder="Model Name"
                                                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                                />

                                                <input
                                                  type="text"
                                                  name={`sections[${sectionIndex}].additionalInformation[${modelIndex}].detail`}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={model.detail || ''}
                                                  placeholder="Model Detail"
                                                  className="w-full rounded-lg ml-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                                />

                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeInfo(modelIndex)
                                                  }
                                                  className="ml-2 text-red-500"
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
                                            onClick={() =>
                                              pushInfo({ name: '', detail: '' })
                                            }
                                            className="px-4 py-2 bg-black text-white dark:bg-main rounded-md shadow-md w-fit"
                                          >
                                            Add Model
                                          </button>
                                        </div>
                                      )}
                                    </FieldArray>
                                  </div>
                                </div>
                              ),
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                pushSection({
                                  heading: '',
                                  additionalInformation: [],
                                })
                              }
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md w-fit mt-4"
                            >
                              Add Section
                            </button>
                          </>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Filts (Color, Height, Shape)
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-6">
                      <FieldArray name="filter">
                        {({ push: pushSection, remove: removeSection }) => (
                          <>
                            {(formik.values.filter || []).map(
                              (filter: any, sectionIndex: number) => (
                                <div
                                  key={sectionIndex}
                                  className="rounded-sm border border-stroke bg-white dark:bg-black mt-2"
                                >
                                  <div className="border-b border-stroke py-4 px-6 dark:border-strokedark flex items-center">
                                    <input
                                      type="text"
                                      name={`filter[${sectionIndex}].heading`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={filter.heading || ''}
                                      placeholder="Heading Name (Color, Height, Shape)"
                                      className="font-medium text-black dark:text-white w-full bg-transparent px-5 py-3 rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark dark:bg-form-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        removeSection(sectionIndex)
                                      }
                                      className="ml-4 text-red-500"
                                    >
                                      <RxCross2
                                        className="text-red-500 dark:text-white"
                                        size={25}
                                      />
                                    </button>
                                  </div>

                                  <div className="flex flex-col py-4 px-6">
                                    <FieldArray
                                      name={`filter[${sectionIndex}].additionalInformation`}
                                    >
                                      {({
                                        push: pushInfo,
                                        remove: removeInfo,
                                      }) => (
                                        <div className="flex flex-col gap-2">
                                          {(
                                            filter.additionalInformation || []
                                          ).map(
                                            (
                                              model: any,
                                              modelIndex: number,
                                            ) => (
                                              <div
                                                key={modelIndex}
                                                className="flex items-center"
                                              >
                                                <input
                                                  type="text"
                                                  name={`filter[${sectionIndex}].additionalInformation[${modelIndex}].name`}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={model.name || ''}
                                                  placeholder="Add details (Black, Reactangle, 11cm)"
                                                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                                />
                                                <input
                                                  type="number"
                                                  name={`filter[${sectionIndex}].additionalInformation[${modelIndex}].price`}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={model.price || ''}
                                                  placeholder="price"
                                                  className="w-full rounded-lg ml-1 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                                />
                                                <input
                                                  type="number"
                                                  name={`filter[${sectionIndex}].additionalInformation[${modelIndex}].discountPrice`}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={model.discountPrice || ''}
                                                  placeholder="Disc Price"
                                                  className="w-full rounded-lg ml-1 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                                />
                                                <input
                                                  type="number"
                                                  name={`filter[${sectionIndex}].additionalInformation[${modelIndex}].stock`}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={model.stock || ''}
                                                  placeholder="stock"
                                                  className="w-full rounded-lg ml-1 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                                                />

                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    removeInfo(modelIndex)
                                                  }
                                                  className="ml-2 text-red-500"
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
                                            onClick={() =>
                                              pushInfo({ name: '', price: '', discountPrice: '', stock: '' })
                                            }
                                            className="px-4 py-2 bg-black text-white dark:bg-main rounded-md shadow-md w-fit"
                                          >
                                            Add details (colors, Shapes, etc)
                                          </button>
                                        </div>
                                      )}
                                    </FieldArray>
                                  </div>
                                </div>
                              ),
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                pushSection({
                                  heading: '',
                                  additionalInformation: [],
                                })
                              }
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md w-fit mt-4"
                            >
                              Add Section
                            </button>
                          </>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Additional information
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-6">
                      <FieldArray name="additionalInformation">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.additionalInformation &&
                              formik.values.additionalInformation.map(
                                (model: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <input
                                      type="text"
                                      name={`additionalInformation[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.additionalInformation[
                                          index
                                        ].name
                                      }
                                      placeholder="Model Name"
                                      className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${model.name &&
                                        (
                                          formik.errors
                                            .additionalInformation as FormikErrors<
                                              FormValues['additionalInformation']
                                            >
                                        )?.[index]
                                        ? 'border-red-500 dark:border-white'
                                        : ''
                                        }`}
                                    />
                                    <input
                                      type="text"
                                      name={`additionalInformation[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.additionalInformation[
                                          index
                                        ].detail
                                      }
                                      placeholder="Model Detail"
                                      className={`w-full rounded-lg ml-2 border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${model.detail &&
                                        (
                                          formik.errors
                                            .additionalInformation as FormikErrors<
                                              FormValues['additionalInformation']
                                            >
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
                              className="px-4 py-2 bg-black text-white dark:bg-main dark:border-0  rounded-md shadow-md w-fit"
                            >
                              Add Model
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black ">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Specification
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-6">
                      <FieldArray name="spacification">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.spacification.map(
                              (spec: any, index: any) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="text"
                                    name={`spacification[${index}].specsDetails`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={
                                      formik.values.spacification[index]
                                        .specsDetails
                                    }
                                    placeholder="Specification Details"
                                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${spec.specsDetails &&
                                      (
                                        formik.errors
                                          .spacification as FormikErrors<
                                            FormValues['spacification']
                                          >
                                      )?.[index]?.specsDetails
                                      ? 'border-red-500'
                                      : ''
                                      }`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 text-red"
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
                              onClick={() => push({ specsDetails: '' })}
                              className="px-4 py-2 bg-black text-white dark:bg-main dark:border-0 rounded-md shadow-md w-fit"
                            >
                              Add Specification
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Sizes
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-6">
                      <FieldArray name="sizes">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.sizes.map(
                              (model: any, modelIndex: any) => {
                                console.log('model', model);
                                return (
                                  <div key={modelIndex} className="flex items-center">
                                    <input
                                      type="text"
                                      name={`sizes[${modelIndex}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.sizes[modelIndex].name}
                                      // value={model.name || ''}
                                      placeholder="Size Name (1 seater, 2 seater, etc)"
                                      className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary `}
                                    />
                                    <Select
                                    className="w-full ml-1 rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary custom-color-selector h-[50px]"
                                      onChange={(value) => {
                                        const updatedSizes = [...formik.values.sizes];
                                        if (updatedSizes[modelIndex]) {
                                          updatedSizes[modelIndex] = {
                                            ...updatedSizes[modelIndex],
                                            filterName: value,
                                          };
                                        } else {
                                          updatedSizes[modelIndex] = { filterName: value };
                                        }

                                        formik.setFieldValue("sizes", updatedSizes);
                                      }}
                                      defaultValue={formik.values.sizes[modelIndex].filterName || 'Select Option'}
                                    >
                                      <Select.Option value="">
                                        Select Option
                                      </Select.Option>

                                      {formik.values.filter?.[0].additionalInformation?.map((info: any, index: number) => (
                                        <Select.Option value={info.name} key={index}>
                                          {info.name}
                                        </Select.Option>
                                      ))}
                                    </Select>


                                    <input
                                      type="text"
                                      name={`sizes[${modelIndex}].price`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.sizes[modelIndex].price}
                                      // value={model.price || ''}
                                      placeholder="Size Price"
                                      className={`ml-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary `}
                                    />
                                    <input
                                      type="text"
                                      name={`sizes[${modelIndex}].discountPrice`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.sizes[modelIndex].discountPrice}
                                      // value={model.price || ''}
                                      placeholder="Disc Price"
                                      className={`ml-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary `}
                                    />
                                    <input
                                      type="text"
                                      name={`sizes[${modelIndex}].stock`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.sizes[modelIndex].stock}
                                      placeholder="Stock"
                                      className={`ml-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary `}
                                    />

                                    <button
                                      type="button"
                                      onClick={() => remove(modelIndex)}
                                      className="ml-2 text-red-500"
                                    >
                                      <RxCross2
                                        className="text-red-500 dark:text-white"
                                        size={25}
                                      />
                                    </button>
                                  </div>
                                )
                              }
                            )}
                            <button
                              type="button"
                              // onClick={() => push('')}
                              onClick={() =>
                                push({ name: '', price: '', discountPrice: '', stock: '' })
                              }
                              className="px-4 py-2 bg-black text-white dark:bg-gray-800  rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black w-fit"
                            >
                              Add Sizes (1 seater, 2 seater,etc)
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
                        {hoverImage.map((item: any, index) => {
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
                                value={item.altText}
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
                      <Imageupload sethoverImage={sethoverImage} />
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Product Images
                      </h3>
                    </div>

                    <Imageupload setImagesUrl={setImagesUrl} />

                    {imagesUrl && imagesUrl.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {imagesUrl.map((item: any, index) => {
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
                                  src={item.imageUrl}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="Add Image Color"
                                className=" rounded-b-md p-2 text-sm focus:outline-none w-full "
                                value={item.color}
                                onChange={(e) =>
                                  handleImageColor(
                                    index,
                                    e.target.value,
                                    setImagesUrl,
                                  )
                                }
                              />
                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                placeholder="altText"
                                type="text"
                                name="altText"
                                value={item.altText}
                                onChange={(e) =>
                                  handleImageAltText(
                                    index,
                                    String(e.target.value),
                                    setImagesUrl,
                                  )
                                }
                              />
                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                placeholder="Size"
                                type="text"
                                name="size"
                                value={item.size}
                                onChange={(e) =>
                                  handleImageSize(
                                    index,
                                    String(e.target.value),
                                    setImagesUrl,
                                  )
                                }
                              />

                              <input
                                className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                placeholder="index"
                                type="text"
                                name="index"
                                value={item.index}
                                onChange={(e) =>
                                  handleIndex(
                                    item.public_id,
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
                </div>
              </div>

              {imgError ? (
                <div className="flex justify-center">
                  <div className="text-red-500 pt-2 pb-2">{imgError}</div>
                </div>
              ) : null}

              <button
                type="submit"
                className="px-10 py-2 mt-2 bg-black text-white rounded-md shadow-md dark:bg-main dark:border-0"
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

export default FormElements;
