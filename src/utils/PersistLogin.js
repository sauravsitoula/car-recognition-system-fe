import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../src/components/hooks/useRefreshToken";
import useAuth from "../../src/components/hooks/useAuth";
import Loader from "../components/commons/Loader/Loader";

const PersistLogin = () => {
  const [loader, setLoader] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    !auth?.token ? verifyRefreshToken() : setLoader(false);
  }, []);

  return <>{loader ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
