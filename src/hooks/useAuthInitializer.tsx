"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "components/Others/HelperRedux";
import { loggedInAdminAction } from "../redux/slices/Admin/AdminsSlice";
import { get_Admin } from "config/fetch";

export const useAdminAuthInit = () => {
  const dispatch = useAppDispatch();
  const adminDataCookie =
    Cookies.get("admin_access_token") ||
    Cookies.get("super_admin_access_token");
 
  const getAdmin = async () => {
    // const adminData = await get_Admin(adminDataCookie);
    // console.log(adminData,"adminDataadminData")
    // dispatch(loggedInAdminAction(adminData));
    console.log(adminDataCookie,"adminDataCookieadminDataCookie")
  };
  useEffect(() => {
    if (adminDataCookie) {
      try {
        getAdmin();
      } catch (e) {
        console.error("Failed to parse admin_data cookie:", e);
      }
    }
  }, [dispatch]);
};
