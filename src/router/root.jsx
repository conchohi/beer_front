import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/load/Loading";
const LivePage = lazy(() => import("../components/mypage/MyPageMain"));
const Info = lazy(() => import("../pages/InfoPage"));
const Game = lazy(() => import("../components/intro/Intro"));
const Main = lazy(()=> import("../pages/MainPage"))
// const Main = lazy(() => import("../components/VideoPage")); // 추가
// const Index = lazy(()=>import("../pages/IndexPage"));
const ChatList = lazy(() => import("../pages/ChatListPage"));
const MyPage =lazy(() => import("../pages/Mypage"));
const Video =lazy(() => import("../pages/VideoPage"));
const BoardDetail =lazy(() => import("../modal/BoardDetail"));

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
    path: "/board/detail",
    element: (
      <Suspense fallback={<Loading />}>
        <BoardDetail/>
      </Suspense>
    )
  },
]);

export default root;
