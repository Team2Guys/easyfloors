'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import AllAdmin from 'components/SuperAdmin/AllAdmin/AllAdmin';
import CreateAdmin from 'components/SuperAdmin/CreateAdmin/CreateAdmin';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Admin } from 'types/type';
const SuperAdmin = () => {

  const [editAdmin, setEditAdmin] = useState<Admin | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string | null | undefined>(
    'AllAdmin',
  );
  const Navigate = useRouter();
  const superAdminToken = Cookies.get('superAdminToken');

  console.log('toke super admin' + superAdminToken);
  useEffect(() => {
    const superAdminToken = Cookies.get('superAdminToken');
    console.log('toke super admin' + superAdminToken);
  }, [Navigate]);

  const EditInitialValues: Admin = {
    fullname: editAdmin?.fullname,
    email: editAdmin?.email,
    password: editAdmin?.password,
    canAddCategory: editAdmin?.canAddCategory,
    canAddProduct: editAdmin?.canAddProduct,
    canCheckProfit: editAdmin?.canCheckProfit,
    canCheckRevenue: editAdmin?.canCheckRevenue,
    canCheckVisitors: editAdmin?.canCheckVisitors,
    canDeleteCategory: editAdmin?.canDeleteCategory,
    canDeleteProduct: editAdmin?.canDeleteProduct,
    canEditCategory: editAdmin?.canEditCategory,
    canEditProduct: editAdmin?.canEditProduct,
    canVeiwAdmins: editAdmin?.canVeiwAdmins,
    canViewSales: editAdmin?.canViewSales,
    canVeiwTotalCategories: editAdmin?.canVeiwTotalproducts,
    canVeiwTotalproducts: editAdmin?.canVeiwTotalproducts,
    canViewUsers: editAdmin?.canViewUsers,
  };

  return (
    <DefaultLayout>
        <Breadcrumb pageName="Super Admin" />
        <div className="mt-10">
          {selecteMenu == 'AllAdmin' ? (
            <AllAdmin
              setselecteMenu={setselecteMenu}
              setEditAdmin={setEditAdmin}
            />
          ) : (
            <CreateAdmin
              setselecteMenu={setselecteMenu}
              EditInitialValues={editAdmin}
              setEditProduct={setEditAdmin}
              EditAdminValue={
                EditInitialValues &&
                (EditInitialValues.fullname !== undefined ||
                  EditInitialValues.email !== undefined)
                  ? EditInitialValues
                  : undefined
              }
            />
          )}
        </div>
    </DefaultLayout>
  );
};

export default SuperAdmin;
