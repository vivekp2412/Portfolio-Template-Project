import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { loginUser } from "../../../slices/authSlice";
import { Input, Button, Form } from "antd";
const Password = Input.Password;
import loginImage from "../../../assets/Login/user-interface.png";
import style from "../Login-Page/style.module.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function onFinish(values) {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) => {
        dispatch(loginUser(userCredentials));
        navigate("/admin/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long")
      );
    }
    return Promise.resolve();
  };
  return (
    <div className={style.formContainer}>
      <Form
        name="basic"
        layout={"vertical"}
        className={style.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className={style.loginPhoto}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="style=bulk">
                {" "}
                <g id="profile">
                  {" "}
                  <path
                    id="vector (Stroke)"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    id="rec (Stroke)"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
                    fill="#BFBFBF"
                  ></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
        <div className={style.formTitle}>Welcome Back!</div>

        <Form.Item
          className={style.field}
          style={{ maxHeight: "60px" }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please Enter your Email!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          className={style.field}
          style={{ maxHeight: "60px" }}
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please Enter your password!" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password className={style.password} />

          {/* <Input type="password" /> */}
        </Form.Item>

        <div className={style.btnContainer}>
          <button className={style.submitBtn} type="submit">
            Submit
          </button>
        </div>
        <div className={style.formFooter}>
          Dont Have Account ?
          <br />
          <Link to="/admin/signup" className={style.link}>
            Sign Up
          </Link>
        </div>
        {/* <div className={style.btnContainer}> */}
        {/* </div> */}
      </Form>
    </div>
  );
}

export default Login;
