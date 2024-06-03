import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Info = lazy(() => import("../pages/InfoPage"));
const Game = lazy(() => import("../pages/GameInfo"));
const Main = lazy(() => import("../components/VideoPage")); // 추가
// const Index = lazy(()=>import("../pages/IndexPage"));
const ChatList = lazy(() => import("../pages/ChatListPage"));

const root = createBrowserRouter([
  {
    path: "/info",
    element: (
      <Suspense fallback={Loading}>
        <Info />
      </Suspense>
    ),
  },
  {
    path: "", // 추가
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/game", // 추가
    element: (
      <Suspense fallback={Loading}>
        <Game />
      </Suspense>
    ),
  },
  {
    path: "/chat/list",
    element: (
      <Suspense fallback={<Loding />}>
        <ChatList />
      </Suspense>
    )
  },
]);

export default root;
