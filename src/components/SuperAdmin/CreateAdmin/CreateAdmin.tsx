'use client';
import React, { useState } from 'react';
import { CheckboxChangeEvent, Col, Form, Row } from 'antd';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Checkbox, CheckboxProps } from 'antd';
import Loader from 'components/Loader/Loader';
import { Input } from 'components/ui/input';
import showToast from 'components/Toaster/Toaster';
import { useMutation } from '@apollo/client';
import { CREATE_ADMIN, UPDATE_ADMIN } from 'graphql/mutations';

type formDataTypes = {
  fullname: string;
  email: string;
  password: string;
  canAddProduct: boolean;
  canEditProduct: boolean;
  canDeleteProduct: boolean;
  canAddCategory: boolean;
  canDeleteCategory: boolean;
  canEditCategory: boolean;
  canCheckProfit: boolean;
  canCheckRevenue: boolean;
  canCheckVisitors: boolean;
  canViewUsers: boolean;
  canViewSales: boolean;
  canVeiwAdmins: boolean;
  canVeiwTotalproducts: boolean;
  canVeiwTotalCategories: boolean;
};

const intitalValues = {
  fullname: '',
  email: '',
  password: '',
  canAddProduct: false,
  canEditProduct: false,
  canDeleteProduct: false,
  canAddCategory: false,
  canDeleteCategory: false,
  canEditCategory: false,
  canCheckProfit: false,
  canCheckRevenue: false,
  canCheckVisitors: false,
  canViewUsers: false,
  canViewSales: false,
  canVeiwAdmins: false,
  canVeiwTotalproducts: false,
  canVeiwTotalCategories: false,
};

const CreateAdmin = ({
  setselecteMenu,
  EditAdminValue,
  EditInitialValues,
  setEditProduct,
}: any) => { //eslint-disable-line
  const updateFlag = EditAdminValue && EditAdminValue ? true : false;

  const [formData, setFormData] = useState<formDataTypes>(!updateFlag ? intitalValues : EditAdminValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined | null>();

  const [createAdmin] = useMutation(CREATE_ADMIN);
  const [updateAdmin] = useMutation(UPDATE_ADMIN);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange: CheckboxProps['onChange'] = (e: CheckboxChangeEvent) => { 
    const { name, checked } = e.target;
    const  nename  = name ? name : ""
    setFormData({
      ...formData,
      [nename]: checked,
    });
  };
  const handleSubmit = async () => {
    try {
      if (!formData.fullname || !formData.email || !formData.password) {
        return showToast("warn", "Name, email, and password are required");
      }

      setLoading(true);

      const input = updateFlag ? { id: EditInitialValues.id, ...formData } : formData;
      const { data } = updateFlag ? await updateAdmin({ variables: { input } })
        : await createAdmin({ variables: { input } });

      console.log(data, "Mutation Response"); //eslint-disable-line

      setFormData(intitalValues);
      showToast("success", `Admin ${updateFlag ? "updated" : "created"} successfully`);
    } catch (err:any) {//eslint-disable-line

      setError(err?.message || "An unexpected error occurred.");
      showToast("error", err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }}

  const handleAddAllPermissions = () => {
    setFormData({
      ...formData,
      canAddProduct: true,
      canEditProduct: true,
      canDeleteProduct: true,
      canAddCategory: true,
      canDeleteCategory: true,
      canEditCategory: true,
      canCheckProfit: true,
      canCheckRevenue: true,
      canCheckVisitors: true,
      canViewUsers: true,
      canViewSales: true,
      canVeiwAdmins: true,
      canVeiwTotalproducts: true,
      canVeiwTotalCategories: true,
    });
  };

  const checkboxData = [
    { name: 'canAddProduct', label: 'Can Add Product' },
    { name: 'canEditProduct', label: 'Can Edit Product' },
    { name: 'canDeleteProduct', label: 'Can Delete Product' },
    { name: 'canAddCategory', label: 'Can Add Category' },
    { name: 'canDeleteCategory', label: 'Can Delete Category' },
    { name: 'canEditCategory', label: 'Can Edit Category' },
    { name: 'canCheckProfit', label: 'Can Check Profit' },
    { name: 'canCheckRevenue', label: 'Can Check Revenue' },
    { name: 'canCheckVisitors', label: 'Can Check Visitors' },
    { name: 'canViewUsers', label: 'Can View Users' },
    { name: 'canViewSales', label: 'Can View Sales' },
    { name: 'canVeiwAdmins', label: 'Can View Admins' },
    { name: 'canVeiwTotalCategories', label: 'Can View Categories' },
    { name: 'canVeiwTotalproducts', label: 'Can View Products' },
  ];

  const handleClearAllPermissions = () => {
    setFormData({
      ...formData,
      canAddProduct: false,
      canEditProduct: false,
      canDeleteProduct: false,
      canAddCategory: false,
      canDeleteCategory: false,
      canEditCategory: false,
      canCheckProfit: false,
      canCheckRevenue: false,
      canCheckVisitors: false,
      canViewUsers: false,
      canViewSales: false,
      canVeiwAdmins: false,
      canVeiwTotalproducts: false,
      canVeiwTotalCategories: false,
    });
  };

  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer"
        onClick={() => {
          setselecteMenu('AllAdmin');
          setEditProduct(undefined)
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Form
        className="max-w-screen-md mx-auto rounded-md shadow-xl mt-1 mb-5"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Row gutter={[10, 10]} className="lg:p-6 p-4">
          <Col
            xl={{ order: 1, span: 24 }}
            lg={{ order: 1, span: 24 }}
            md={{ order: 1, span: 24 }}
            sm={{ order: 1, span: 24 }}
            xs={{ order: 1, span: 24 }}
          >
            <p className="text-2xl">Create New Admin</p>
          </Col>
          <Col
            xl={{ order: 1, span: 12 }}
            lg={{ order: 1, span: 12 }}
            md={{ order: 1, span: 12 }}
            sm={{ order: 1, span: 12 }}
            xs={{ order: 1, span: 24 }}
          >
            <Form.Item label='Full Name'>
              <Input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>

          <Col
            xl={{ order: 1, span: 12 }}
            lg={{ order: 1, span: 12 }}
            md={{ order: 1, span: 12 }}
            sm={{ order: 1, span: 12 }}
            xs={{ order: 1, span: 24 }}
          >
            <Form.Item label="Email">
              <Input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ order: 1, span: 24 }}
            lg={{ order: 1, span: 24 }}
            md={{ order: 1, span: 24 }}
            sm={{ order: 1, span: 24 }}
            xs={{ order: 1, span: 24 }}
          >
            <Form.Item label="Password">
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          {checkboxData.map((checkbox, index) => (
            <Col
              key={index}
              xl={{ order: 1, span: 6 }}
              lg={{ order: 1, span: 6 }}
              md={{ order: 1, span: 6 }}
              sm={{ order: 1, span: 12 }}
              xs={{ order: 1, span: 12 }}
            >
              <Checkbox
                name={checkbox.name}
                checked={
                  formData[checkbox.name as keyof typeof formData] as boolean
                }
                onChange={handleCheckboxChange}
              >
                {checkbox.label}
              </Checkbox>
            </Col>
          ))}

          <Col
            className="text-center mt-2 flex justify-between w-full items-center"
            xl={{ order: 1, span: 24 }}
            lg={{ order: 1, span: 24 }}
            md={{ order: 1, span: 24 }}
            sm={{ order: 1, span: 24 }}
            xs={{ order: 1, span: 24 }}
          >
            <button
              type="button"
              onClick={handleClearAllPermissions}
            >
              Clear All{' '}
            </button>
            <button
              type="button"
              onClick={handleAddAllPermissions}
            >
              Mark All permissions
            </button>
          </Col>

          <Col
            className="text-center mt-2 flex justify-between w-full items-center"
            xl={{ order: 1, span: 24 }}
            lg={{ order: 1, span: 24 }}
            md={{ order: 1, span: 24 }}
            sm={{ order: 1, span: 24 }}
            xs={{ order: 1, span: 24 }}
          >
          </Col>

          <Col
            className="text-center mt-2"
            xl={{ order: 1, span: 24 }}
            lg={{ order: 1, span: 24 }}
            md={{ order: 1, span: 24 }}
            sm={{ order: 1, span: 24 }}
            xs={{ order: 1, span: 24 }}
          >
            <button
              disabled={loading}
              className="h-14 w-full"
              onClick={handleSubmit}
            >
              {loading ? <Loader color="White" /> : 'Add Admin'}
            </button>
          </Col>

          {error &&  <p>{error}</p>}
        </Row>
      </Form>
    </>
  );
};

export default CreateAdmin;
