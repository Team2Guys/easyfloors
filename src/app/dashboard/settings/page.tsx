'use client';
import React, { useState, useEffect } from 'react';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import Image from 'next/image';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useAppSelector } from 'components/Others/HelperRedux';
import { uploadPhotosToBackend } from 'utils/helperFunctions';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInAdminAction } from '../../../redux/slices/Admin/AdminsSlice';
import { ImageRemoveHandler } from 'utils/helperFunctions';
import { LabelInput } from 'components/ui/label-input';
import { AiOutlineUpload } from 'react-icons/ai';
interface ImageType {
  posterImagePublicId: string ;
  posterImageUrl: string;
}

const Settings = () => {
  const loggedInUser = useAppSelector((state) => state.usersSlice.loggedInUser);
  const token = Cookies.get('2guysAdminToken');
  const dispatch = useAppDispatch();
  const AdminType = loggedInUser && loggedInUser.role == 'super-Admin';

  const initialFormData = {
    fullname: loggedInUser ? `${loggedInUser.fullname}` : '',
  };
  const initialValue = {
    name: loggedInUser ? `${loggedInUser.email}` : '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [profilePhoto, setProfilePhoto] = useState<ImageType>();

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log('function trigerd');
    const file = event.target.files?.[0];

    if (file) {
      const [imageUrl]: { imageUrl: string; public_id: string }[] = await uploadPhotosToBackend([file]);
      console.log(imageUrl, 'imageUrl');
      const Images: ImageType = {
        posterImageUrl: imageUrl.imageUrl,
        posterImagePublicId: imageUrl.public_id,
      };
      if (imageUrl) {
        setProfilePhoto(Images);
      }
    }
  };

  const adminUpdateHandler = async () => {
    try {
      let initialFormData = {
        email: loggedInUser.email,
        name: formData.fullname,
        posterImageUrl: loggedInUser.posterImageUrl,
        posterImagePublicId: loggedInUser.posterImagePublicId,
      };
      /* eslint-disable */
      if (loggedInUser) {
        let { name, posterImageUrl, posterImagePublicId, ...extractedData } =
          loggedInUser;
        console.log(extractedData, 'extractedData');
        /* eslint-enable */
        if (profilePhoto) {
          initialFormData = {
            ...initialFormData,
            posterImageUrl: profilePhoto.posterImageUrl,
            posterImagePublicId: profilePhoto.posterImagePublicId,
          };
        }

        const combinedData = {
          ...initialFormData,
          ...extractedData,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/edit-admin`,
          combinedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          console.log('Admin updated successfully:', response.data);
        } else {
          console.error('Failed to update admin');
        }
      }
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, [loggedInUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await adminUpdateHandler();
      await AddminProfileTriggerHandler();
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const AddminProfileTriggerHandler = async () => {
    try {
      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getAdminHandler`,
        {
          headers: {
            token: token,
          },
        },
      );
      dispatch(loggedInAdminAction(user.data.user));
    } catch (err) {
      console.log(err, 'err');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const Images: ImageType = {
      posterImageUrl: '',
      posterImagePublicId: '',
    };
    if (loggedInUser) {
      Images.posterImageUrl = loggedInUser.posterImageUrl;
      Images.posterImagePublicId = loggedInUser.posterImagePublicId;
      setProfilePhoto(Images);
    }
  }, [loggedInUser]);
  console.log(profilePhoto, 'profilePhoto');

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <div className="flex flex-col gap-8">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:bg-black dark:text-white dark:bg-boxdark dark:border-blue-50 dark:border-strokedark dark:bg-boxdark ">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-14 sm:text-15 text-primary dark:text-white">
                  Profile Photo
                </h3>
              </div>
              <div className="px-7 py-5">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                        <Image
                          src={
                            profilePhoto && profilePhoto.posterImageUrl
                              ? profilePhoto.posterImageUrl
                              : '/images/dummy-avatar.jpg'
                          }
                          loading='lazy'
                          width={55}
                          height={55}
                          alt={loggedInUser.name}
                        />
                    </div>

                      <div>
                        <span className="mb-1.5 text-primary text-15 dark:text-black">
                          Edit your photo
                        </span>
                        <span className="flex gap-2.5">
                          <button
                            className="text-sm hover:text-primary text-primary dark:text-black"
                            type="button"
                            onClick={() =>
                              ImageRemoveHandler(
                                profilePhoto?.posterImagePublicId
                                  ? profilePhoto?.posterImagePublicId
                                  : '',
                                setProfilePhoto,
                              )
                            }
                          >
                            Delete
                          </button>
                          <button
                            className="text-sm hover:text-primary text-primary dark:text-black"
                            type="button"
                          >
                            Update
                          </button>
                        </span>
                      </div>
                  </div>
                  <div className="relative mb-4 rounded-md border-dashed bg-primary py-4 text-white dark:bg-black">
                    <input
                      disabled={AdminType}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <span className="my-2 inline-block rounded-full bg-white border-primary border p-2">
                        <AiOutlineUpload className="w-8 h-8 text-primary dark:text-black" />
                      </span>
                      <p className="text-white dark:text-white text-xs sm:text-sm ">
                        <span className="text-white dark:text-white">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="mt-1.5 text-white dark:text-white text-xs sm:text-sm">
                        SVG, PNG, JPG or GIF
                      </p>
                      <p className="text-white dark:text-white text-xs sm:text-sm">
                        (max, 800 X 800px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-3 dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white ">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium  text-14 sm:text-15 text-primary dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-4 sm:p-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-5.5 flex flex-col justify-center items-center gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      {/* Add additional form fields if needed */}
                    </div>
                  </div>

                  <LabelInput
                    label="Full Name"
                    disabled={AdminType}
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  <LabelInput
                    label="Email Address"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder="Email Address"
                    value={initialValue.name}
                    disabled
                  />

                  <div className="flex justify-center sm:justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary dark:bg-gray-900 px-6 py-2 font-medium text-white hover:bg-opacity-90 text-14 "
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProtectedRoute(Settings);
