import '../../styles/login/css/bootstrap.css'
import '../../styles/login/css/styles.css'
import Banner from '../../layouts/dangKiHP/Banner.jsx';
import Footer from '../../layouts/dangKiHP/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import path from '../../routes/Path.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext.js'
import refetch from '../../assets/images/refresh.png'
function Login() {
  const { setUser } = useUser();
  const [tk, setTk] = useState('');
  const [mk, setMk] = useState('');
  const [mbv, setMBV] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  async function onLogin() {
    if(mbv !== capchar) {
      setError("Mã bảo vệ không đúng");
      return;
    }
  
    // Dữ liệu người dùng cố định
    const dummyUser = {
      mssv: "12345678",
      matKhau: "123456",
      hoTen: "Nguyễn Văn A",
      lop: "KTPM2024",
    };
  
    if (tk === dummyUser.mssv && mk === dummyUser.matKhau) {
      console.log("Đăng nhập thành công", dummyUser);
      setUser(dummyUser);
      localStorage.setItem('token', JSON.stringify(dummyUser));
      navigate(`${path.ROOT}`);
    } else {
      console.log("Lỗi login");
      setError("Sai tài khoản hoặc mật khẩu");
    }
  }
  

  // hàm random mã bảo vệ
  
  useEffect(() => {
    randomCapChar(4)
  }, [])
  const [capchar, setCapchar] = useState('');
  const [capcharColor, setCapcharColor] = useState('#000');
  const [backgroupSVG, setbackgroupSVG] = useState('');
  function randomSVG() {
    const colors = ['#ff6347', '#4682b4', '#3cb371', '#ffa500', '#ff69b4'];
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f0f0f0"/>';
  
    for (let i = 0; i < 200; i++) {
      const cx = Math.floor(Math.random() * 80) + 25; // ngẫu nhiên từ 10 đến 90
      const cy = Math.floor(Math.random() * 80) + 10;
      const r = Math.floor(Math.random() * 3) ; // bán kính từ 10 đến 25
      const color = colors[Math.floor(Math.random() * colors.length)];
      svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color.replace('#', '%23')}"/>`;
    }
    svg += '</svg>';
    setbackgroupSVG(`url('data:image/svg+xml;charset=UTF-8,${svg}')`)
  }
  
  function randomCapChar(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    setCapchar(text);
    // Cập nhật màu ngẫu nhiên
    setCapcharColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    randomSVG();
  }
  return (
    <div>
      <Banner />
      <div className="container">
        <div className="row vh-100">
          <div className="center-login">

            <div className='form-login' style={{ width: '380px' }}>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text w154"><i className="fa fa-user" />&nbsp;Mã sinh viên</div>
                  </div>
                  <input value={tk} onChange={(e) => setTk(e.target.value)} autoComplete="new-password" className="form-control" data-val="true" data-val-length="The field UserName must be a string with a maximum length of 50." data-val-length-max={50} data-val-required="The UserName field is required." id="UserName" name="UserName" placeholder="Nhập mã sinh viên" type="number" />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text w154"><i className="fa fa-unlock-alt" />&nbsp;Mật khẩu</div>
                  </div>
                  <input value={mk} onChange={(e) => setMk(e.target.value)} autoComplete="new-password" className="form-control" data-val="true" data-val-required="The Password field is required." id="Password" name="Password" placeholder="Nhập mật khẩu" type="password" />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text w154"><i className="fa fa-unlock-alt" />&nbsp;Mã bảo vệ</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <input
                      style={{ width: '170px', marginRight: '8px' }}
                      value={mbv}
                      onChange={(e) => setMBV(e.target.value)}
                      className="form-control"
                      data-val-required="The capchar field is required."
                      id="capChar"
                      name="capChar"
                      placeholder="Nhập mã bảo vệ"
                      type="text"
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <img
                        src={refetch}
                        onClick={() => randomCapChar(4)}
                        style={{ width: '30px', height: '30px', cursor: 'pointer', marginRight: '54px' }}
                      />
                      <div style={{ width: '40px', height: '40px', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h4 className="capchar-style" style={{background:backgroupSVG, color: capcharColor,textDecorationLine: 'line-through', margin: 0 }}>
                          {capchar}
                        </h4>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ color: 'red' }} />
              {error && <div className="text-danger">
                {error
                }
              </div>
              }
              <button onClick={onLogin} className="btn btn-primary btn-100">ĐĂNG NHẬP</button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
