import './loding.css'

const Loading = () => {
    return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center text-center">
        <img className='w-[360px]' src="/image/logo.png" alt="logo"/>
        <div className="glitch" data-glitch="Loading">Loading</div>
    </div>  
    );
}
 
export default Loading;