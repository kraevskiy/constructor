import { lazy, Suspense, useEffect } from "react";
import Layout from "./HOC/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { ActionType } from "./redux/redux.types";
import {
  getOrders,
  showLoader,
  hideLoader,
  getLayouts,
  autoLogin,
  getAllLayouts,
  getAllOrders,
  getAllUsers,
  getPageBySlug,
  getAllImages,
} from "./redux/actions";
import Loader from "./components/Loader/Loader";

const Routes = lazy(() => import("./routes/Routes"));

const App = (): JSX.Element => {
  const {
    app,
    user: { isLoggedIn, initAutologin, _id, role },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<ThunkDispatch<RootState, null, ActionType>>();

  useEffect(() => {
    dispatch(getPageBySlug("home"));
  }, []);

  useEffect(() => {
    if (initAutologin) return;
    dispatch(showLoader());
    dispatch(autoLogin());
    dispatch(hideLoader());
  }, [isLoggedIn, initAutologin]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (role === "admin") {
      dispatch(getAllOrders({ limit: 100 }));
      dispatch(getAllUsers());
    }
    dispatch(showLoader());
    dispatch(getLayouts(_id));
    dispatch(getOrders(_id));
    dispatch(hideLoader());
    dispatch(getAllImages({ limit: 100 }));
    dispatch(getAllLayouts({ limit: 100, public: role != "admin" }));
  }, [isLoggedIn, initAutologin]);

  return (
    <Layout>
      {app.loading && <Loader />}
      {initAutologin && (
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>
      )}
    </Layout>
  );
};

export default App;
