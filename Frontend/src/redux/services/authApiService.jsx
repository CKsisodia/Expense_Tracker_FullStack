import ApiHelper from "../../utils/apiHelperFunction";
import { toast } from "react-toastify";

class AuthApiServices {
  static getInstance() {
    return new AuthApiServices();
  }

  userSignup = async (signupData) => {
    try {
      const response = await ApiHelper.post("/user/signup", signupData);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  userLogin = async (loginData) => {
    try {
      const response = await ApiHelper.post("/user/login", loginData);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  userInfo = async () => {
    try {
      const response = await ApiHelper.get("/user/get-user-info");
      return response?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export const authApiServices = AuthApiServices.getInstance();
