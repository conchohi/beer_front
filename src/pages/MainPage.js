
import './Mainlayout.css'; 

import BasicLayout from "../layouts/BasicLayout";
import MainImage from '../components/main/MainImage';
import Introduction from '../components/main/Introduction';



function MainPage() {
  
  
    return (
      <BasicLayout>

        <div className="inner"><MainImage /></div>
        <div className="divider"></div>
        <div className="inner"><Introduction /></div>

      </BasicLayout>
    );
  }
  
  export default MainPage;
  