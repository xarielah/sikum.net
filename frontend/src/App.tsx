import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import BlockLoggedAccess from "./components/layouts/block-logged-access";
import MainLayout from "./components/layouts/main-layout";
import ProtectedRoute from "./components/layouts/protected-route";
import NotFound from "./pages/404";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import VerifyUser from "./pages/auth/verifiy-user";
import ContactPage from "./pages/contact/contact-page";
import Home from "./pages/home";
import AllPosts from "./pages/posts/all-posts";
import NewPost from "./pages/posts/new-post";
import SearchPosts from "./pages/posts/search/search-posts";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/login"
            element={
              <BlockLoggedAccess>
                <LoginPage />
              </BlockLoggedAccess>
            }
          />
          <Route
            path="/auth/register"
            element={
              <BlockLoggedAccess>
                <RegisterPage />
              </BlockLoggedAccess>
            }
          />

          <Route path="/auth/verify/:token" element={<VerifyUser />} />

          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <AllPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/new-post"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route path="/posts/search" element={<SearchPosts />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;
