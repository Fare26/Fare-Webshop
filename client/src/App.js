import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";
import Cart from "./pages/Cart";
/* import Favourite from "./pages/Favourite"; */
import Profile from "./pages/Profile";
import PageNotFind from "./pages/PageNotFind";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
/* import Footer from "./components/Footer"; */
import UserOrders from "./components/UserOrders";
import ProfileSettings from "./components/ProfileSettings";
import UserSettings from "./components/UserSettings";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./helpers/AuthContext";
import CartProvider from "./helpers/CartProvider";
import Modal from "./components/Modal";
import ProductProfile from "./pages/ProductProfile";
import ProductsProvider from "./helpers/ProductsProvider";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import Sidenav from "./components/Sidenav";

const defaultRegisterStates = {
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  phone: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const defaultAuthState = {
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  phone: "",
  username: "",
  email: "",
  status: false,
  id: "",
  role: "",
};

const defaultEditProp = {
  id: "",
  title: "",
  description: "",
  price: "",
  quantity: "",
  action: "",
  image: "",
  genderName: "",
  productName: "",
  brendName: "",
};

function App() {
  const [registerData, setRegisterData] = useState(defaultRegisterStates);
  const [editData, setEditData] = useState(defaultRegisterStates);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState(defaultAuthState);
  const [modal, setModal] = useState(false);
  const [sidenav, setSidenav] = useState(false);
  const [filter, setFilter] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [editProduct, setEditProduct] = useState(defaultEditProp);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      authUser();
    }
  }, []);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  function showSidenav() {
    setSidenav(true);
  }

  function hideSidenav() {
    setSidenav(false);
  }

  function showFilter() {
    setFilter(true);
  }

  function hideFilter() {
    setFilter(false);
  }

  function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  function authUser() {
    axios
      .get("http://localhost:3500/auth/user", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setEditData({
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            address: response.data.address,
            country: response.data.country,
            phone: response.data.phone,
          });
          authStateHandler(response.data, true);
        }
      });
  }

  function registerDataHandler(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }

  function editDataHandler(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://localhost:3500/auth", registerData).then((response) => {
      if (response.data.error) {
        tost("error", response.data.error);
      } else {
        tost("success", "You have SUCCESSFULLY created an account!");
        setRegisterData(defaultRegisterStates);
        navigate("/login", { replace: true });
      }
    });
  }

  function login() {
    const data = { username, password };
    axios.post("http://localhost:3500/auth/login", data).then((response) => {
      if (response.data.error) {
        tost("error", response.data.error);
      } else {
        tost("success", `Welcome, ${response.data.user.username}!`);
        localStorage.setItem("accessToken", response.data.token);
        setEditData(response.data.user);
        authStateHandler(response.data.user, true);
        navigate("/", { replace: true });
      }
    });
  }

  function logout() {
    tost("success", `Goodbye, ${authState.username}`);
    setPassword("");
    setUsername("");
    localStorage.removeItem("accessToken");
    setAuthState(defaultAuthState);
    navigate("/login", { replace: true });
  }

  async function submitUserSettings(e, pass) {
    e.preventDefault();
    if (pass.oldPassword && pass.newPassword) {
      await axios
        .put(
          "http://localhost:3500/auth/changeUserSettings",
          {
            username: editData.username,
            email: editData.email,
            oldPassword: pass.oldPassword,
            newPassword: pass.newPassword,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            tost("error", response.data.error);
          } else {
            console.log(response.data);
            logout();
            tost("success", "Your account settings have been updated!");
          }
        });
    } else {
      await axios
        .put(
          "http://localhost:3500/auth/changeUserSettings",
          {
            username: editData.username,
            email: editData.email,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            tost("error", response.data.error);
          } else {
            tost("success", "Your account settings have been updated!");
            logout();
          }
        });
    }
  }

  function submitProfileSettings(e) {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3500/auth/changeProfileSettings",
        {
          firstName: editData.firstName,
          lastName: editData.lastName,
          address: editData.address,
          country: editData.country,
          phone: editData.phone,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          tost("error", response.data.error);
        } else {
          console.log(response.data);
          tost("success", "Your account settings have been updated!");
          logout();
        }
      });
  }

  function authStateHandler(val, stat) {
    setAuthState({
      username: val.username,
      email: val.email,
      role: val.role,
      id: val.id,
      firstName: val.firstName,
      lastName: val.lastName,
      address: val.address,
      country: val.country,
      phone: val.phone,
      status: stat,
    });
  }

  function tost(val, mess) {
    if (val === "success") {
      return toast.success(mess, {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (val === "error") {
      return toast.error(mess, {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (val === "warn") {
      return toast.warn(mess, {
        theme: "colored",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <ProductsProvider>
          <CartProvider>
            {modal && <Modal onHideModal={hideModal} />}
            {sidenav && (
              <Sidenav
                logout={logout}
                onHiheSidenav={hideSidenav}
                sidenav={sidenav}
                dimensions={dimensions}
                    handleResize={handleResize}
              />
            )}
            <Header />
            <Navbar logout={logout} onShowSidenav={showSidenav} />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/products"
                element={
                  <Products
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                    filter={filter}
                    hideFilter={hideFilter}
                    showFilter={showFilter}
                    dimensions={dimensions}
                    handleResize={handleResize}
                  />
                }
              ></Route>
              <Route
                path="/products/editProduct"
                element={
                  <EditProduct
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                  />
                }
              />
              <Route path="/products/addProduct" element={<AddProduct />} />
              <Route path="/products/:productId" element={<ProductProfile />} />
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/login"
                element={
                  <Login
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    login={login}
                  />
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <RegisterForm
                    registerData={registerData}
                    setRegisterData={setRegisterData}
                    registerDataHandler={registerDataHandler}
                    submitForm={submitForm}
                  />
                }
              />
              <Route
                path="/cart"
                element={<Cart tost={tost} onShowModal={showModal} />}
              />
              {/* <Route path="/favourite" element={<Favourite />} /> */}
              {authState.status && (
                <Route
                  path="/profile"
                  element={
                    <Profile
                      authUser={authUser}
                      editData={editData}
                      setUserCart={setUserCart}
                    />
                  }
                >
                  <Route
                    index
                    element={
                      <h1 className="welcome-profile">
                        Welcome To Your Profile!
                      </h1>
                    }
                  />
                  <Route
                    path="/profile/user-orders"
                    element={<UserOrders userCart={userCart} />}
                  />
                  <Route
                    path="/profile/profile-settings"
                    element={
                      <ProfileSettings
                        editData={editData}
                        setEditData={setEditData}
                        editDataHandler={editDataHandler}
                        submitProfileSettings={submitProfileSettings}
                      />
                    }
                  />
                  <Route
                    path="/profile/user-settings"
                    element={
                      <UserSettings
                        editData={editData}
                        editDataHandler={editDataHandler}
                        submitUserSettings={submitUserSettings}
                      />
                    }
                  />
                </Route>
              )}
              <Route path="*" element={<PageNotFind />}></Route>
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </AuthContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
