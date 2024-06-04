import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/load/Loading";
const Signup = lazy(() => import("../pages/signup/Signup"));
const Login = lazy(() => import("../pages/login/Login"));
const LivePage = lazy(() => import("../components/mypage/MyPageMain"));
const Info = lazy(() => import("../pages/InfoPage"));
const Game = lazy(() => import("../components/intro/Intro"));
const Main = lazy(()=> import("../pages/MainPage"))
// const Main = lazy(() => import("../components/VideoPage")); // 추가
// const Index = lazy(()=>import("../pages/IndexPage"));
const ChatList = lazy(() => import("../pages/ChatListPage"));
const MyPage =lazy(() => import("../pages/Mypage"));
const Video =lazy(() => import("../pages/VideoPage"));

const root = createBrowserRouter([
  {
    path: "/info",
    element: (
      <Suspense fallback={<Loading />}>
        <Info />
      </Suspense>
    ),
  },
  {
    path: "", // 추가
    element: (
      <Suspense fallback={<Loading />}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/game", // 추가
    element: (
      <Suspense fallback={<Loading />}>
        <Game />
      </Suspense>
    ),
  },
  {
    path: "/chat/list",
    element: (
      <Suspense fallback={<Loading />}>
        <ChatList />
      </Suspense>
    )
  },
  {
    path: "/mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <MyPage/>
      </Suspense>
    )
  },
  {
    path: "/chat/:roomNo",
    element: (
      <Suspense fallback={<Loading />}>
        <Video/>
      </Suspense>
    )
  },
  {
    path: "/livepage",
    element: (
      <Suspense fallback={<Loading />}>
        <LivePage/>
      </Suspense>
    )
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login/>
      </Suspense>
    )
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup/>
      </Suspense>
    )
  },
]);

export default root;
