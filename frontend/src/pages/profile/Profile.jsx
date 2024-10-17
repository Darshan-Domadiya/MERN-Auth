import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import SpinnerCom from "../../components/Spinner";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Profile = () => {
  const { currentUser, isLoading, isError } = useSelector(
    (state) => state.user
  );

  const [updateUserData, setUpdateUserData] = useState(false);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [profileImageData, setProfileImageData] = useState({});
  const [imageError, setImageError] = useState(false);
  console.log(profileImageData);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Sign Out user
  const signOutuser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/user/v1/signout");

      if (response.status === 200) {
        console.log("User signed out successfully!", response);
        dispatch(signOut());
      }
    } catch (error) {
      console.log("Error while sign out user!", error);
    }
  };

  // Delete user
  const deleteUserAccount = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const response = await axios.post(
        `/api/user/v1/delete/${currentUser._id}`
      );

      if (response.status === 200) {
        console.log("User deleted successfully!", response);
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
      console.log("Error while deleting the user!", error);
    }
  };

  // Update user profile details.
  const handleUpdateChange = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const response = await axios.post(
        `/api/user/v1/update/${currentUser._id}`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          profileImage:
            profileImageData.profileImage || currentUser.profileImage,
        }
      );

      if (response.status === 200) {
        console.log("User details updated successfully!", response);
        dispatch(updateUserSuccess(response.data.user));
        setUpdateUserData(true);
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.log("Error while updating user details!", error);
    }
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;

      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercentage(Math.round(progress));
        },
        (error) => {
          setImageError(true);
          console.log("ERROR in uploading image!", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            setProfileImageData({
              ...profileImageData,
              profileImage: downloadUrl,
            })
          );
        }
      );
    } catch (error) {
      console.log("ERROR while uploading image to the firebase!", error);
    }
  };

  return (
    <Container className="mt-5 d-flex align-items-center flex-column justify-content-center">
      <h2>Profile</h2>
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <Form
        onSubmit={handleUpdateChange}
        className="w-100 d-flex flex-column align-items-center justify-content-center"
      >
        <Image
          src={profileImageData.profileImage || currentUser.profileImage}
          className="rounded-5 object-fit-cover mt-3"
          onClick={() => fileRef.current.click()}
          height="100px"
          width="100px"
        />

        {imageError ? (
          <span className="text-danger fw-medium">
            Error uploading image (file size must be less than 2 MB)
          </span>
        ) : imagePercentage > 0 && imagePercentage < 100 ? (
          <span>{`Uploading : ${imagePercentage} %`}</span>
        ) : imagePercentage === 100 ? (
          <span className="text-success fw-medium">
            Image uploaded successfully!
          </span>
        ) : (
          ""
        )}

        <Form.Group className="mt-3 w-50 ">
          <Form.Control
            className="p-3 user-input  bg-body-secondary"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mt-3 w-50 ">
          <Form.Control
            className="p-3 user-input  bg-body-secondary"
            type="email"
            placeholder=" Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mt-3 w-50">
          <Form.Control
            className="p-3 user-input bg-body-secondary"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button className="w-50 mt-3 p-3" variant="dark" type="submit">
          {isLoading ? <SpinnerCom /> : "UPDATE"}
        </Button>

        <div className="w-50 mt-2 d-flex align-items-center justify-content-between">
          <span
            className="text-danger fw-bold pointer"
            onClick={deleteUserAccount}
          >
            Delete Account
          </span>
          <span className="text-danger fw-bold pointer" onClick={signOutuser}>
            Sign Out
          </span>
        </div>
      </Form>
      <p className="text-danger fw-bolder">
        {isError && "Something went Wrong!"}
      </p>

      <p className="text-success fw-bolder">
        {updateUserData && "User updated suceessfully!"}
      </p>
    </Container>
  );
};

export default Profile;
