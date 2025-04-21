import "../../styles/home/bootstrap.css";
import "../../styles/home/breakingNews.css";
import "../../styles/home/color-default.css";
import "../../styles/home/dataTables.responsive.css";
import "../../styles/home/style.css";
import "../../styles/home/hightcharts.css";
import "../../styles/home/jquery.dataTables.min.css";
import "../../styles/home/menu.css";
import Banner from "../../layouts/dangKiHP/Banner.jsx";
import Footer from "../../layouts/dangKiHP/Footer.jsx";
import InforUser from "../../layouts/dangKiHP/InforUser.jsx";
import { useUser } from "../../contexts/UserContext.js";
function Home() {
  const { user } = useUser();
  // console.log("usersssss", user); 
  // console.log("msss", user.mssv); 
  return (
    <div>
      <Banner />
      <div id="contain">
    <div className="bg-fff">
      <section className="content">
        <div className="container">
          <InforUser />
          <div id="sec_hososv">
            <div className="info-account clearfix border-box info-sv">
              <h2 style={{fontSize:'22px',fontWeight:'bold',margin:'17px'}} className="title-table">Thông tin sinh viên</h2>
              <div className="rowhssv" id="showw">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <p> Khóa: <b>2020 - 2021</b></p>
                      <p> Bậc đào tạo: <b>{user.mssv}</b></p>
                      <p> Bậc đào tạo: <b>{user.bacDaoTao}</b></p>
                      <p> Ngành: <b>{user.tenNganhHoc} </b></p>
                      <p> Khoa: <b>{user.tenKhoa}</b></p>
                    </div>
                    <div className="col-md-6">
                      <p> Lớp: <b>{user.tenLopHocDanhNghia}</b></p>
                      <p> Loại hình đào tạo: <b>{user.loaiHinhDaoTao}</b></p>
                      <p> Chuyên ngành: <b>{user.tenNganhHoc}</b></p>
                      <p> Cơ sở: <b>Cơ sở 1 (Thành phố Hồ Chí Minh)</b></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
      <Footer />
    
    </div>
  );
}

export default Home;
