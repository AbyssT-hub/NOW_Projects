import '../../styles/login/css/bootstrap.css'
import '../../styles/login/css/styles.css'
import '../../styles/login/css/bootstrap.css.map'
import '../../styles/login/css/color-default.css'

function Footer() {
  return (
    <div id="bottom">
      {/* Footer */}
      <div className="container">
        <footer>
          <div id="bottom">
            <div
              className="info-site-top clearfix"
              style={{ backgroundColor: "#0069d9" }}
            >
              <div className="col-sm-6">
                <div style={{color:'white'}} className="txt-ft">
                  TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH
                  <br />
                  Địa chỉ : Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ
                  Chí Minh
                  <br />
                  Điện thoại: 0283 8940 390 <br />
                  Fax: 0283 9940 954 <br />
                  Email: dhcn@iuh.edu.vn
                </div>
              </div>
              <div className="col-sm-6">
                <div style={{color:'white'}} className="thongke">
                  Thống kê truy cập
                  <br />
                  <ul>Lượt truy cập: 0</ul>
                  <ul>Đang online: 0</ul>
                </div>
              </div>
            </div>
            <div className="info-site-bot clearfix">
              <div className="col-xs-12">
                <div className="txt-ft">
                  Bản quyền 2018 - Trường Đại học Công nghiệp TP. Hồ Chí Minh
                </div>
              </div>
            </div>
            <div className="copy-r">
              <p>© 2024 ASCVN. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      {/* End Footer */}
    </div>
  );
}

export default Footer;
