import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "./shared/UIElements/LoadingSpinner/LoadingSpinner";
import { authActions } from "./shared/store/authSlice";
import { userDataActions } from "./shared/store/userDataSlice";

const Auth = lazy(() => import("./user/pages/Auth"));
const Form = lazy(() => import("./user/pages/Form"));
const Lou = lazy(() => import("./user/pages/Lou"));
const ServerVerification = lazy(() =>
  import("./user/pages/ServerVerification")
);
const ServiceAgreement = lazy(() => import("./user/pages/ServiceAgreement"));
const Admin = lazy(() => import("./admin/pages/Admin"));
const UserAgreements = lazy(() => import("./admin/pages/UserAgreements"));
const UpdateUser = lazy(() => import("./admin/components/UpdateUser"));
const UpdateServerPassword = lazy(() =>
  import("./admin/components/UpdateServerPassword")
);
const ValidateForms = lazy(() => import("./admin/pages/ValidateForms"));
const AllForms = lazy(() => import("./admin/pages/AllForms"));
const UpdateForm = lazy(() => import("./admin/components/UpdateForm"));

const App = () => {
  const { isLoggedIn, isAdmin } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const adminData = sessionStorage.getItem("adminData");
  if (adminData) {
    dispatch(authActions.login("admin"));
    const { uid, token } = JSON.parse(adminData);
    dispatch(userDataActions.setData({ uid, token, role: "admin" }));
  }
  return (
    <Suspense
      fallback={
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Auth inValidAccess={false} />} />
        {isLoggedIn && !isAdmin ? (
          <>
            <Route path="/lou" element={<Lou />} />
            <Route path="/service-agreement" element={<ServiceAgreement />} />
            <Route
              path="/server-verification"
              element={<ServerVerification />}
            />
            <Route path="/form" element={<Form />} />
          </>
        ) : (
          <Route path="*" element={<Auth inValidAccess />} />
        )}
        {isAdmin ? (
          <>
            <Route path="/t0SHFA0pHFKayedfQaqy/admin" element={<Admin />} />
            <Route
              path="/t0SHFA0pHFKayedfQaqy/user-agreements/:uid"
              element={<UserAgreements />}
            />
            <Route
              path="/t0SHFA0pHFKayedfQaqy/admin_update_user/:uid"
              element={<UpdateUser />}
            />
            <Route
              path="/t0SHFA0pHFKayedfQaqy/update_serverPass"
              element={<UpdateServerPassword />}
            />
            <Route
              path="/t0SHFA0pHFKayedfQaqy/validate_forms"
              element={<ValidateForms />}
            />
            <Route
              path="/t0SHFA0pHFKayedfQaqy/all_forms"
              element={<AllForms />}
            />
            <Route
              path="/t0SHFA0pHFKayedfQaqy/update-form/:fid"
              element={<UpdateForm />}
            />
          </>
        ) : (
          <Route path="*" element={<Auth inValidAccess />} />
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
