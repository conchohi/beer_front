import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";
const Signup = lazy(() => import("../pages/SignupPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const Logout = lazy(() => import("../pages/LogoutPage"));
const Info = lazy(() => import("../pages/InfoPage"));
const Game = lazy(() => import("../components/guide/Intro"));
const Main = lazy(()=> import("../pages/MainPage"))
const ChatList = lazy(() => import("../pages/ChatListPage"));
const MyPage =lazy(() => import("../pages/Mypage"));
const Video =lazy(() => import("../pages/VideoPage"));
const Board = lazy(( )=> import("../pages/BoardPage"))
const AccessToken = lazy(() => import("../pages/getAccessPage"));

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
  {
    path: "/logout",
    element: (
      <Suspense fallback={<Loading />}>
        <Logout/>
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
  path: "board",
  element: (
    <Suspense fallback={<Loading />}>
      <Board/>
    </Suspense>
  )
},
{
  path: "/getAccess",
  element: (
    <Suspense fallback={<Loading />}>
      <AccessToken />

    </Suspense>
  )
}

]);

export default root;
