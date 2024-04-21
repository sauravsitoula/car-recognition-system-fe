import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();
  const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("getting refresh token", refreshToken);
    const response = await axios.post(
      "http://18.189.17.119:3001/auth/refresh",
      // "http://localhost:3001/auth/refresh",
      {
        refreshToken,
      }
    );
    setAuth((prev) => {
      return {
        ...prev,
        token: response.data.token,
        user: response.data.user,
      };
    });
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
