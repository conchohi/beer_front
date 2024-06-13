import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";
const TestGame = lazy(() => import("../social/TestGame"));
const FindPwdForm = lazy(() => import("../components/find/FindPwdForm"));
const FindIdForm = lazy(() => import("../components/find/FindIdForm"));
const Signup = lazy(() => import("../pages/SignupPage"));
const Login = lazy(() => import("../pages/LoginPage"));
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
},
{
  path: "/find/id",
  element: (
    <Suspense fallback={<Loading />}>
      <FindIdForm />

    </Suspense>
  )
},
{
  path: "/find/pwd",
  element: (
    <Suspense fallback={<Loading />}>
      <FindPwdForm />

    </Suspense>
  )
},
{
  path: "/test",
  element: (
    <Suspense fallback={<Loading />}>
      <TestGame />

    </Suspense>
  )
}

]);

export default root;
