import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loding from "../component/load/Loading";
const Index = lazy(()=>import("../pages/IndexPage"));
const ChatList = lazy(()=>import("../pages/ChatListPage"));

const root = createBrowserRouter([
    {
        path: "",
        element: (
            <Suspense fallback={<Loding/>}>
                <Index/>
            </Suspense>
        )
    },
    {
        path: "/chat/list",
        element: (
            <Suspense fallback={<Loding/>}>
                <ChatList/>
            </Suspense>
        )
    },


])

export default root;