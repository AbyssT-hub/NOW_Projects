import '../../styles/inforUser/components.min.css'
import '../../styles/inforUser/base.css'
import '../../styles/inforUser/kendo.cms.min.css'
import '../../styles/inforUser/kendo.common.min.css'
import '../../styles/inforUser/perfect-scrollbar.css'
import '../../styles/inforUser/profile.min.css'
import '../../styles/inforUser/responsive.css'
import '../../styles/inforUser/style.css'
import '../../styles/inforUser/toastr.min.css'
import '../../styles/inforUser/main.css'
import '../../styles/inforUser/css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import path from '../../routes/Path'
function Header() {
    const navigate = useNavigate();
    const [isDropDowName, setisDropDowName] = useState(false);

    function DangXuat(){
        navigate(`${path.LOGIN}`);
          localStorage.removeItem("token");
         
      }
      function DoiMatKhau(){
    
      }
  return (
    <div>
          <header className="header">
            <div className="container" style={{width:'1300px'}}>
              <div className="header-content">
                <div className="logo">
                  <a href="" title>
                    <img src="https://media.iuh.edu.vn/Media/2_sviuh/Images/iuh7313e0f8-4-e.png" style={{width:'70px',height: '90'}} />
                  </a>
                </div>
                <div className="search-bar">
                  <form action="/sinh-vien-tin-tuc-thong-bao-search.html">
                    <input type="text" id="k" name="k" langid="header-search-placeholder" placeholder="Tìm kiếm..." required />
                    <button ><i className="fa fa-search" aria-hidden="true" /></button>
                  </form>
                </div>
                <div className="menu-btn">
                  <a href="#" title><i className="fa fa-bars" /></a>
                </div>
                <div className="user-account dropdown">
                  <div className="user-info" data-toggle="dropdown">
                   
                    <a className="user-account-name"  onClick={()=>{
                      setisDropDowName(!isDropDowName)
                    }}  title>Võ Thị Minh Tiến </a>
                    <i className="fa fa-caret-down user-account-name-caret-down" aria-hidden="true" />
                  </div>
                  <div className={`user-account-info dropdown-menu pull-right ${isDropDowName ? 'show' : ''}`}>
                    <ul className="us-links">
                      <li><a  title>Thông tin cá nhân</a></li>
                      <li><a title onclick={DoiMatKhau}>Đổi mật khẩu</a></li>
                      <li><a onClick={DangXuat} title>Đăng xuất</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="menu-top">
                  <ul>
                    <li>
                      <a  title>
                        <span><i className="fa fa-home" aria-hidden="true" /></span>
                        Trang chủ
                      </a>
                    </li>
                    <li>
                      <a id="spanBell"  title>
                        <div id="tinTuc" lang="tin-tuc">
                          <i className="fa fa-bell-o" aria-hidden="true" />&nbsp;&nbsp;Tin tức
                        </div>
                      </a>
                    </li>
                  </ul>
                 
                </div>
              </div>
            </div>
          </header>
        </div>
  );
}

export default Header;
