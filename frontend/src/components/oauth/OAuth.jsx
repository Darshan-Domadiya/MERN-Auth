import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import { app } from "../../firebase";
import axios from "axios";
import { signInSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignInClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("result of google auth", result);

      const response = await axios.post("/api/user/v1/google", {
        name: result.user.displayName,
        email: result.user.email,
        picture: result.user.photoURL,
      });

      if (response.status === 200) {
        dispatch(signInSuccess(response.data.user));
        console.log("User logged In successfully with Google!!", response);
        navigate("/");
      }
    } catch (error) {
      console.log("Could not login with Google!!", error);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleSignInClick}
      className="mt-2 w-50  p-3"
      variant="danger"
    >
      CONTINUE WITH GOOGLE
    </Button>
  );
};

export default OAuth;
