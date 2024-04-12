import { toast } from "react-toastify";
import { setLoading, setToken } from "../../slices/authSlice";
// import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endPoints } from "../api";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endPoints;


export function sendOtp(email, navigate) {
  return async (dispatch) => {
     toast("loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("otp response", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("otp send succesfylly");
      navigate("/verify-email");
      toast.success("navigate succesfilly")


    } catch (error) {
      console.log("SENDING API ERROR", error);
      toast.error("could not send otp");
    }
    dispatch(setLoading(false));
  };
}

// sign up

export function signUp(
  
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast("loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp
      });

      console.log("SIGN UP API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("signup succesfully");
      navigate("/login");
    } catch (error) {
      
      console.log("SIGN UP API EROR", error);
      toast.error("sign up failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.error(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const tostId = toast("loading");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("api response is", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("login succesfull");

      dispatch(setToken(response.data.token));

      const userImage = response.data?.isUserExist?.image
        ? response.data.isUserExist.image
        : `https://api.dicebear.com/5.x/initials/svg?seed= ${response.data.isUserExist.firstName} ${response.data.isUserExist.lastName}`;

      dispatch(setUser({ ...response.data.isUserExist, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.isUserExist));
// localStorage.setItem("userImage", JSON.stringify(userImage));


      
      
      // navigate("/dashboard/my-profile");
      navigate("/")
    } catch (error) {
      console.log("error in login api", error);
      toast.error("Login failed");
    }
    
    dispatch(setLoading(false));
    toast.success(tostId)
  };
}


// LOGOUT

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("logout succesfully");
    navigate("/");
};
}


// reset pass token worked

export function getPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API,{email})

console.log("reset password response",response)

if(!response.data.success){
  throw new Error(response.data.message)
}
toast.success("Reset email sent")
setEmailSent(true)

    } catch (error) {
      console.log("reset password token error")
      console.log(error)

    }
    dispatch(setLoading(false))
  };
}



// resetPassword -> worked
export function resetPassword(password,confirmPassword,token){

  return async(dispatch)=>{
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API,{
        password,confirmPassword,token
        
      })
      console.log("RESET PASS RESPONSE",response)

      if(!response.data.success){
        throw new Error(response.data.message)

      }
toast.success("password is reset sucesfully")

} catch (error) {
  console.log("unable to reset password", error)
}

dispatch(setLoading(false))
  }
}


