'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useState } from 'react';
import ViewSubcategries from 'components/cat_subcat/ViewSubcategries';
import {ISUBCATEGORY } from 'types/cat';
import dynamic from 'next/dynamic';
import { SubCategoryComponentProps_dashboard } from 'types/PagesProps';
const AddSubcategory= dynamic(() => import('components/cat_subcat/AddSubcategory'),);

const SubCategoryComponent = ({
  subCategories,
  cetagories,
}: SubCategoryComponentProps_dashboard) => {
  const [menuType, setMenuType] = useState<string>('Sub Categories');
  const [editCategory, seteditCategory] = useState<ISUBCATEGORY | undefined >();
  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Sub Categories' ? (
        <div className="flex flex-col gap-10">
          <ViewSubcategries
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
            subCategories={subCategories}
          />
        </div>
      ) : (
        <AddSubcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
          categoriesList={cetagories}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(SubCategoryComponent);
