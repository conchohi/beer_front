import Beer1 from '../animation/Beer1';
import './loding.css'

const Loading = () => {
    return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center text-center">
        <Beer1/>
        <div className="glitch" data-glitch="Loading">Loading</div>
    </div>  
    );
}
 
export default Loading;