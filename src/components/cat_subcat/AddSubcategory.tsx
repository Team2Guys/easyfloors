'use client';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import { Formik, Form, FormikHelpers, Field, ErrorMessage, FieldArray, FormikErrors } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { subcategoryInitialValues, subcategoryValidationSchema, } from 'data/data';
import Loader from 'components/Loader/Loader';
import showToast from 'components/Toaster/Toaster';
import Cookies from 'js-cookie';
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS } from 'types/PagesProps';
import { AdditionalInformation, ProductImage } from 'types/prod';
import { ISUBCATEGORY, ISUBCATEGORY_EDIT } from 'types/cat';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { useMutation } from '@apollo/client';
import { CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY } from 'graphql/mutations';
import { FETCH_ALL_SUB_CATEGORIES } from 'graphql/queries';
import revalidateTag from 'components/ServerActons/ServerAction';


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
      whatamIdetails: editCategory?.whatamIdetails || []
    }
    : undefined;
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(editCategory ? [editCategory.posterImageUrl] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory ? [editCategory.posterImageUrl] : undefined);
  const [loading, setloading] = useState<boolean>(false);

  const [editCategoryName, setEditCategoryName] = useState<ISUBCATEGORY_EDIT | undefined>(CategoryName);
  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  const finalToken = token ? token : superAdminToken;

  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY);
  const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY);

  const onSubmit = async (values: ISUBCATEGORY_EDIT, { resetForm }: FormikHelpers<ISUBCATEGORY_EDIT>) => {
    if (!values.category) {
      return showToast('warn', 'Select parent category!!');
    }
    try {
      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];

      const newValue = { ...values, posterImageUrl };
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
      resetForm();
      setMenuType('Sub Categories');
    } catch (err) {
      setloading(false);

      showToast('error', 'Something went wrong!');
      throw err
    }
  }

  useEffect(() => {

    setEditCategoryName(CategoryName)

  }, [editCategory])

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

                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Banner Image
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
                                        setposterimageUrl,
                                        finalToken
                                      );
                                    }}
                                  />

                                </div>
                                <Image
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
                          Category Description
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          placeholder="Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.description && formik.errors.description ? "border-red-500" : ""
                            }`}
                        />
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
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.whatAmiTopHeading && formik.errors.whatAmiTopHeading ? "border-red-500" : ""
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
                            {/* Default option */}
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
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormLayout
