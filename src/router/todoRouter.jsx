import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="text-3xl text-center text-sky-500">Loading....</div>
const GocampingRead = lazy(() => import("../pages/todo/ReadPage"))

const todoRouter = () => {
    return [
     
        {
            // '/todo/' 이하의 경로가 지정되지 않았을 때 동작하는 빈 경로 설정
            path: "",  
            element: <Navigate replace to="list" />
        },
        {
            // React-Router는 경로에 필요한 데이터가 있을 때는 ':'을 활용
            // ':' 경로의 일부를 변수로 사용하기 위한 설정으로 브라우저에서
            // 특정한 번호를 조회하는 용도로 사용
            path: "read/:tno",
            element: <Suspense fallback={Loading}><GocampingRead /></Suspense>
        },
     
    ]
}
export default todoRouter; 