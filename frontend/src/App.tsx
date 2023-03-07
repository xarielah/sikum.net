import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import BlockLoggedAccess from "./components/layouts/block-logged-access";
import MainLayout from "./components/layouts/main-layout";
import ProtectedRoute from "./components/layouts/protected-route";
import NotFound from "./pages/404";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import VerifyUser from "./pages/auth/verifiy-user";
import ContactPage from "./pages/contact/contact-page";
import Home from "./pages/home";
import HandleMyPosts from "./pages/posts/my-posts/handle-my-posts";
import NewPost from "./pages/posts/new-post";
import SearchPosts from "./pages/posts/search/search-posts";
import HandleShowPage from "./pages/posts/show-post-page/handle-show-page";
import HandleTopicPage from "./pages/posts/topic/handle-topic-page";
import HandleUserPosts from "./pages/posts/user/handle-user-posts";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth">
            <Route
              path="login"
              element={
                <BlockLoggedAccess>
                  <LoginPage />
                </BlockLoggedAccess>
              }
            />
            <Route
              path="register"
              element={
                <BlockLoggedAccess>
                  <RegisterPage />
                </BlockLoggedAccess>
              }
            />

            <Route path="verify/:token" element={<VerifyUser />} />
          </Route>

          <Route path="/posts">
            <Route
              path="new-post"
              element={
                <ProtectedRoute>
                  <NewPost />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <HandleShowPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="topic/:topicId"
              element={
                <ProtectedRoute>
                  <HandleTopicPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-posts"
              element={
                <ProtectedRoute>
                  <HandleMyPosts />
                </ProtectedRoute>
              }
            />
            <Route path="user/:userId" element={<HandleUserPosts />} />
            <Route path="search" element={<SearchPosts />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;
