import '../../styles/login/css/bootstrap.css'
import '../../styles/login/css/styles.css'
import bannerImage from '../../assets/images/banner.png' 

function Banner() {
  return (
    <div>
      <div className="container">
        <div id="page-header">
          <header>
            <div className="container">
              <img src={bannerImage} className="img-responsive" style={{width: '100%'}} />
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Banner;