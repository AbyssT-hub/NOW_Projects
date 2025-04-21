import "../../styles/home/bootstrap.css";
import "../../styles/home/breakingNews.css";
import "../../styles/home/color-default.css";
import "../../styles/home/dataTables.responsive.css";
import "../../styles/home/style.css";
import "../../styles/home/hightcharts.css";
import "../../styles/home/jquery.dataTables.min.css";
import "../../styles/home/menu.css";
import { useNavigate } from "react-router-dom";
import path from "../../routes/Path.js";
import { useUser } from '../../contexts/UserContext.js';

function InforUser() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div id="sec_thongtin">
      <div className="info-account clearfix border-box">
        <ol className="breadcrumb hidden" id="showw-hid">
          <li> Xin chào: <a href="#">{user.hoTen}</a></li>
          <li className="active">MSSV: <b>{user.mssv}</b></li>
        </ol>
        <div className="row" id="showw">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-7">
                <div className="info">
                  <p>Xin chào!</p>
                  <h4><b>{user.hoTen}</b></h4>
                  <p>
                    <span>Giới tính:</span>
                    <span className="info-account-span">{user.gioiTinh}</span>
                  </p>
                  <p>
                    <span>MSSV:</span>
                    <span className="info-account-span">{user.mssv}</span>
                  </p>
                  <p>
                    <span>Trạng thái:</span>
                    <span className="info-account-span">{user.maLoaiSinhVien}</span>
                  </p>
                  <br />
                  <a onClick={() => {
                    localStorage.removeItem("token");
                    navigate(`${path.LOGIN}`);
                  }} className="btn-custom-1" style={{ display: 'inline-block', width: '100%', textAlign: 'center', textDecoration: 'none' }} id="btnDangXuat">Đăng xuất</a>
                </div>
              </div>
              <div className="col-md-5">
                <div className="avatar">
                  <img src={user.anhDaiDien} alt="avatar" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <p>
                    <a onClick={() => {
                      navigate(`${path.Dashboard}`)
                    }}
                      style={{ color: '#337ab7' }} >
                      <span className="glyphicon glyphicon-menu-right" aria-hidden="true" />Thông tin sinh viên
                    </a>
                  </p>
                  <p>
                    <a onClick={() => {
                      navigate(`${path.Register}`);
                    }} style={{ color: '#337ab7' }}>
                      <span className="glyphicon glyphicon-menu-right" aria-hidden="true" />Đăng ký học phần
                    </a>
                  </p>
                  <p>
                    <a style={{ color: '#337ab7' }} onClick={() => {
                      navigate(`${path.CHUONGTRINHKHUNG}`);
                    }}  >
                      <span className="glyphicon glyphicon-menu-right" aria-hidden="true" />Chương trình khung
                    </a>
                  </p>
                </div>
                <div className="col-md-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforUser;