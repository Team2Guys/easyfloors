'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useState } from 'react';
import Addcategory from 'components/cat_subcat/Addcategory';
;
import { Category } from 'types/cat';
import DashboardCat from 'components/cat_subcat/dashboard_cat';

const CATEGORY = ({ cetagories }: { cetagories: Category[] }) => {
  const [menuType, setMenuType] = useState<string>('Categories');
  const [editCategory, seteditCategory] = useState<Category | undefined | null>();
  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Categories' ? (
        <div className="flex flex-col gap-10">
          <DashboardCat 
                      setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            // editCategory={editCategory}
            cetagories={cetagories}
          />
        </div>
      ) : (
        <Addcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(CATEGORY);
