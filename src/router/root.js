import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loding from "../component/load/Loading";
const Index = lazy(()=>import("../pages/IndexPage"));

const root = createBrowserRouter([
    {
        path: "",
        element: (
            <Suspense fallback={<Loding/>}>
                <Index/>
            </Suspense>
        )
    },


])

export default root;