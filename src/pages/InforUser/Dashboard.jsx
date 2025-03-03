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
import { useNavigate } from 'react-router-dom'
import path from '../../routes/Path'
import Header from '../../layouts/thongTinSV/Header'
import { useUser } from '../../contexts/UserContext'
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  // console.log("user", user);
  return (
    <div>

      <input data-val="true" data-val-number="The field Uid must be a number." id="UID" name="UID" type="hidden" defaultValue={88} />
      <input id="CurrentLanguage" name="CurrentLanguage" type="hidden" defaultValue />
      <div id="focus-overlay" />
      <div className="wrapper">
        <Header />
        <input id="WarningKSMode" name="WarningKSMode" type="hidden" defaultValue={0} />
        <link rel="stylesheet" />
        <div className="main-content main-dashboard">
          <input id="phao-hoa-danh-hieu-sinh-vien" name="phao-hoa-danh-hieu-sinh-vien" type="hidden" defaultValue={0} />
          <div className="container" style={{ width: '1300px' }}>
            <div className="main-section-content" id="contnet">
              <div className="row" >
                <div className="col-md-7" >
                  <div className="box-df profile-ds-info" style={{ height: '293px' }}>
                    <div className="portlet" >
                      <div className="portlet-title">
                        <div className="caption">
                          <span className="ChuTieuDeNho bold ChuTieuDeNho" lang="db-thongtinsinhvien">Thông tin sinh viên</span>
                        </div>
                      </div>
                      <div className="portlet-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <div className="profile-userpic">
                              <img src={user.anhDaiDien} class="img-responsive" style={{objectFit:'cover'}} />
                            </div>
                            <div className="text-center">
                              <a className="color-active" lang="db-chitiet-button">Xem chi tiết</a>
                            </div>
                          </div>
                          <div className="col-sm-9">
                            <form className="form-horizontal">
                              <div className="form-body">
                                <div className="form-group" style={{}}>
                                  <label className="col-xs-6"><span className='ThongTinUser' >MSSV</span>: <span className="DataTTUser">{user.mssv}</span></label>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-lophoc">Lớp học</span>: <span className="DataTTUser">{user.tenLopHocDanhNghia}</span></label>
                                </div>
                                <div className="form-group" style={{}}>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-hoten">Họ tên</span>: <span className="DataTTUser">{user.hoTen}</span></label>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-khoahoc">Khóa học</span>: <span className="DataTTUser">2020 - 2021</span></label>
                                </div>
                                <div className="form-group" style={{}}>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-gioitinh">Giới tính</span>: <span className="DataTTUser">{user.gioiTinh}</span></label>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-hedaotao">Bậc đào tạo</span>: <span className="DataTTUser">{user.bacDaoTao}</span></label>
                                </div>
                                <div className="form-group" style={{}}>
                                  <label className="col-xs-6">
                                    <span className='ThongTinUser' lang="sv-ngaysinh">Ngày sinh</span>: <span className="DataTTUser">{user.ngaySinh}</span>
                                  </label>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-loaihinhdt">Loại hình đào tạo</span>: <span className="DataTTUser">{user.loaiHinhDaoTao}</span></label>
                                </div>
                                <div className="form-group" style={{}}>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-noisinh">Nơi sinh</span>: <span className="DataTTUser">{user.diaChi}</span></label>
                                  <label className="col-xs-6"><span className='ThongTinUser' lang="sv-nganh">Ngành</span>: <span className="DataTTUser">{user.tenNganhHoc} </span></label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5" >
                  <div className="portlet" >
                    <div className="portlet-body" >
                      <div className="box-menu row"  >
                        <div className="col-xs-12" >
                          <div className="item-box-menu box-df nhacnho-border" style={{ height: '143px' }}>
                            <h3 style={{ color: '#667580', fontSize: 14, fontWeight: 400 }} className=" name nhacnho-custom" lang="db-nhacnho">Nhắc nhở mới, chưa xem</h3>
                            <div className="desc clearfix">
                              <div className="number nhacnho-custom" style={{ color: '#667580', fontSize: 34, fontWeight: 500, width: '110px !important' }}>0</div>
                              <div className="text-runing" style={{ width: '100%', height: '51px' }}>
                              </div>
                              <div className="icon-menu text-right">
                                <i className="icon fa fa-bell-o" aria-hidden="true" />
                              </div>
                            </div>
                            <div className="text-left">
                              <a className="color-active" lang="db-chitiet-button">Xem chi tiết</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-xs-6"  >
                          <a onClick={() => {
                            navigate(`${path.LICHHOC}`);
                          }} className="color-active" title>
                            <div className="item-box-menu box-df" style={{ height: '135px' }}>
                              <h3 style={{ fontSize: 14, fontWeight: 400 }} className=" name" lang="db-lichhoctuan">Lịch học trong tuần</h3>
                              <div className="desc clearfix">
                                <div className="number">0</div>
                                <div className="icon-menu text-right">
                                  <i className="icon fa fa-calendar" aria-hidden="true" />
                                </div>
                              </div>
                              <div className="text-left" lang="db-chitiet-button">
                                Xem chi tiết
                              </div>
                            </div>
                          </a>
                        </div>
                        <div className="col-xs-6">
                          <a className="color-active" title>
                            <div className="item-box-menu box-df" style={{ height: '135px' }}>
                              <h3 style={{ fontSize: 14, fontWeight: 400 }} className=" name" lang="db-lichthituan">Lịch thi trong tuần</h3>
                              <div className="desc clearfix">
                                <div className="number">0</div>
                                <div className="icon-menu text-right">
                                  <i className="icon fa fa-calendar-check-o" aria-hidden="true" />
                                </div>
                              </div>
                              <div className="text-left" lang="db-chitiet-button">
                                Xem chi tiết
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="featured">
                <div className="featured-item">
                  <a title="Lịch theo tuần" langid="menusinhvien-8-title">
                    <div className=" titleButton box-df auto-height">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAACWUlEQVRIiaXWS6hNYRgG4Geds3NPqHOOMKPcSso9nYwwITOFDPYhSScDZSAGDAyZmBhZGBgxEEUpJZESCrmLk5Brromjswz+f2fb1lr7XN7Junzv/t71/f+33+9PHMkU4CCmYG0RAbJquCapo/iSVW3P41VKcszHtDKRBizB26JgTWgiUsxBgk5ciT9sw83I/a/8JNWHRZH/PklNwvUYfoCurKqnEkVe4z4O4Cs+oAPt+I598QOSBp2a8OfIbcEX7MUYbMTzJDUtcSS7heGY1ZDkqrB07UXLwT979BTvsqrFDRVfQ1sFc7E0J8cOjC4TaUAXenPeb8adCn7jXg7h2gBEZFWXCkIP8LmCXziMlwNJXEOSNqW0I6mgDwsw0/+bPVRkGFUTGoYVeDqoTNXyeJLqwMOWqNo2GJF+op3Q99BaQhyP6UXBJNWapKXd2VovVIRuwR1u4obwJ6zHFPRgQ5M8pUKrcAibsBCTcLEuPgsvMFk/mqjMVLfgLo7H5048jkkznMOpKDR5KEJbBc+roRsf/fW31bgdP2bkUIReYTbOYgLGYkZd/Ha8jhfcpRTNmuERThCGGlbmcJqKUF7RemGpdsfnCzgj2NWv/iSvR1lFG4QNr2FEAa8X75oJlVXUhSe4LLj7Fuz3t5ptwryaiu1xsp7Mqvmu3yK0a95SvBEc4Ycwqruxpy4+D8txGs/ifV6b99YqGiZ/YBE6b0VBbBPNTRU/MaoFn7CrKX3w2Im+CtbgknDAOIpvBjCXCgZfbQ6tE/Z2dRIPkMtwDOPkHKmGgO/YnFWd/wNTFIxht3/xrgAAAABJRU5ErkJggg==" alt="" />
                      </div>
                      <span lang="menusinhvien-8-vt">Lịch theo tuần</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a title="Kết quả học tập" langid="menusinhvien-7-title">
                    <div className="box-df auto-height  titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACdElEQVRIib3WSahOYRwG8N+RoUghs40hazJ0S6YbSuKKpCzIEYVYKDYWhlKElGsoC06mWFGmkmlPGUpZWAklESHcDMfifT+Oe+/3Odz7eep03nP+b+/z/p//8w6JY7mOIE/b/59keuIqJuMuGvPUuy4dYquNKxiDpRiCm1BPwgbsy1OnsAPjoWsdCW9ja5KZiDk4RPkMh2I5RpTpnGR2YSoOYzh25Kl1lMtwOm7ha+w/WzBDNbLd2IT5eepC63iZDM8JBuiGE7QdJMn0iu89kaypPbKyhF/wMbYfojue4CAak8wtfEgyT7AR8/LUxWqD/YlwBQZiEd5jN9biIuYLVh+KZUhwJ09dqjVgrRoejYRrcA0LcAP3YnwdcpzOUyeTTG/RiZBkVmExBuMVzuep5iLhDCyJg6/EzPjciPG97UxqJ7YnmQYF60c044NguAbsR3NF0mW4jiacxRQMKpBVw+b4jFKwfkQLtuSpxdgQv39KehxHsBpbsB4v/0AG8tTOmGlrtAhywrDWhM8xLgYmaVvbvvHfV7wpM5FqqEg6C6PxDNPQWOhzRij6S7ymuuX/hvCRYP9Z6I/7hT5NuIy5OB3f/4yidF8E47RGi2Cey+iNhYXYqiRra/1ahGV3mn6xPUCoYwXNGCsoNFKwfk109Dxs1/q1UJG0n2CanviMx4JEZQjbWL8M4Xnh/PouZH1PWCadjoqkE3BAmOU24S5SF1QIPwmL/wWe+nUc1Y3wm1A/6CVIW1fC/4Zihm9j+7XfM+zUWFfhvjhEuCE/EM7FPsLlSZlYkv2KJVnN2ITEsfyBsEt0jxP4JqzFSk0/okcnxFrw9AcL/rqKbZW/OQAAAABJRU5ErkJggg==" alt="" />
                      </div>
                      <span lang="menusinhvien-7-vt">Kết quả học tập</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a target="_blank" onClick={() => {
                    navigate(`${path.ROOT}`);
                  }} title="Đăng ký học phần" langid="menusinhvien-15-title">
                    <div className="box-df auto-height titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAADU0lEQVRIia3WbYhWRRQH8N88rlEaBS4lViYWtZDmhzIq6AVJC0wUpFxCyiaK2gRfSkrcKMosrKygFzXIa4EUfjDNisoy2FqhsEhdIi1IV0uxIAV7Mavpw9yN62Ou+1QH7ofLnDn/OXP+538mWJY0aDdjKfqjLUVLG9lca8C3Fd+iwHN4DEtC4ftQuPH/BLwaX+FVbMRQ3IW5GIL1eDkUukNhwn8BvBxdeAffoAWTsKvisydFrRiOz7E2FLaFwthGAC9AJzpwAKPLLLcdLUiKtqdoIkZhN9aFwiehcGlvgOfgPXyKE8sMLyn/+2Qp2pKiK3ExAjaEQkcojOzxCZal4Wgrv12YgzcbADmqhcJVeKpMZgkWB8vSAQzEQ3igr0B9AawAz8aTSDVMxirciddwdqOgvQANDYWVmIe1mNCEd8uvBW/ha7wiU3/PvwRqxhOySOzC2BRt4nDSnC5ndwPGymx7ESc3ADQgFJ7HD3ILxRQNRXMo9OsBvAfbyxP1lxv8VJlE12MfFuH4XoCaQmEBfiqzmp2iQSlaXroswM5QuK+GGRiGD3GoEmcJTpJZOwO/YP4/gLWX++ahPUUDUvR0ndv7sirNruEM3CJr5SFHMnVRmfl8tONX3IppsjA8jIVoStEjdYe5NxQOyoS8PUXNoW5aPIj7cVDWyvqTNuFxzCr/F2NOin6uA2or/QZiYYrm/r1WAl6D23AdTsCjmIn9co1fqAM+Df2ws9qHoTCtBDpFLsncFO0vW2NFitbU8DHelqWIXKtZGITX5dm3RyZQj32HnRWgSaHQjeX4AINT1Jai/ZWYq0NhUw1f4HcMxsRK0B9xk9wuHViJHbi24jMuFLZhtTwthqWoNUV7K4cZX8b4E101RHnG7cUabC2vuJrNFFkYvsQbMqPXy4KxGyNTNDFF3RWgMaGwWdbl38rDTK0nTQuelRt/C+7ABofbKKzAcZiaoo3VxVAYLdfvQnwkP0O6etab6oJtxThcJDO0s9w0E5+VPptxft0+oTACz2CMPNIuS1HnEX7HeERdIVP/PPn6pstaW7Uz5TfOBPkpMj1F644W8Fhvmg6MwHicVQZcJdd8iCzyO+SMJ6fo3N7AOHaG9TZFvrZ9+EPW3LtT9FJfA/wFQAIJ7FVYOrIAAAAASUVORK5CYII=" alt="" />
                      </div>
                      <span lang="menusinhvien-15-vt">Đăng ký học phần</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a title="Tra cứu công nợ" langid="menusinhvien-20-title">
                    <div className="box-df auto-height titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAB0UlEQVQ4jZ3VTYjNURgG8N9cN8Og8f0RkZ3FZKhBiYWFWbExZWJBYoWyk2ywoGRhIhbyUSMbZKOUxsaERAlLxCxkJcQdRt0xFu/5c437/WzOR+/7nHOe9znntLg8pgouYBq2VQrIV8vGMsysFlCOYAp2YgM6MQG3cB/9+FwanBuXfA4FnMHS1C9gEU7hE65UIniNvdiPVnThAV5iNSZiD3bgQxr/IXicVpyUdjGa5tsxtWSRS+lIrXiRadCNNZiDn2U0KYeF+IHeHA7jFT7WmQwj+ILTecwS4jSKY5ibx400aBR9hIgn0sTFJkjkUcRGDGAydoszwphQvSKyMt7DOvQIda+jI/WriltqpIfCB4dEWZ9jE2YLU9UkyHASS4T7nmAlnuItDtRDkOEZhjCIFWlHfeJurK+HAOahTdh2i7D1nUTaXQ/B6LjxMLbiPO6irRZBJexL7ZEcjuJgEyQD2JwT9/t4EwTTMZwTpcn7997Xg1U4m8NtofL7BpKH8A79mYhdwv9FbC8J/CrqnqEH38QT0MnfMhYxH1dxDd/xCGuxXLyNBdwUPmhPRP/5YBcWCFELmCHEGhGv8mL04leW0FLjZxoUH0tHpYBaP9MbNarzG3VVYP2cWKHIAAAAAElFTkSuQmCC" alt="" />
                      </div>
                      <span lang="menusinhvien-20-vt">Tra cứu công nợ</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a title="Thanh toán trực tuyến" langid="menusinhvien-21-title">
                    <div className="box-df auto-height titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAABpUlEQVQ4jZ3UO2hUURAG4G/NgkoUxSD4AmG1E0vRxhQ+CzsRwTYRRG3sVLCw8YGdjWmMtYIKNhau4KOxsrKUYKUYNERJ1KAmsThzzHLZPat34DLnzsz57//fmXMarduL2/EQO/W3aczhBF7AxGhKNPEMW3AHn7GARsfmZViDw9gasec4hHYuagbIGM70YXMZl7AxgJ7gIJ7mrwkmsNjjybkBfMIOfEB727gDmZGgLr442LG5gR+xXlVhuBlvAmw4A60Of6UgbSj8JnzBd+zHBNpZ2uQ/SHsd/j2+RXwymA5kRivD3wiZndJmYz0ezHPnSB0eRqsq7XxB2hyud4lfxcUsbb4A0M+GWGp/yU7rP2N/21+yWxXf1UqM1uNlx/sMdtVhdB97MYIN0tmaqQPUCn9PGr5rhdqitOP4aWn4agO9wnLp7nmMC9JQ/jcQrMNdHJEmfKQO0B5MScM6K52pc3WA3mI0agZxDDd7Feeu/e6Sm5Ku31MB9qAHxnwn0EKB2e5CDn5loI84ixXBrFEp/Cq1f20lnq/ek5huYh8eSf+jjr3D0T+DjmL+E9i22QAAAABJRU5ErkJggg==" alt="" />
                      </div>
                      <span lang="menusinhvien-21-vt">Thanh toán trực tuyến</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a title="Phiếu thu tổng hợp" langid="menusinhvien-23-title">
                    <div className="box-df auto-height titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAABaElEQVQ4jaXUv0ocURTH8c9mNxKFrZLGRDConQi+gEJiNg+QznqtjC8gWFiJtRjSaB5BSJsNJFY2KdOKCBsRQtgmoMF1N8XehetkrjtDfs059993zu/OnKnMHPTncIQFo9XBNVZxDKfNwUINXzCFD+jiQQ6gh9d4HsZfw7g13FALkPdYH1HNNrYwGUCf0MBn0dP7BWw9QRU/MY8LtGYPvYpBDwuAKpnxM3wPsKW8+0hpLMSnmAj5Cn6jVSsBaof4I2etWwa0hz+YjuZ6WMZMGVAHuznzO9gsc0cpPSb/48tqHRujNhWx9i7E/f8FtRWovIi1vkEPco/NVEXjIV6FeBNi0mYKdBLiYoAM2+NcwkUKNBvlPXebO7fBU6BfUZ5t1lylQGOZvBLlpazVo8P16HDd4J+UBHUz8y8iUCPKX/rX6m0M6mUWvxXIh7oZgi7xFo9CZYUu1+DtVbGGTi2U+xHNgoCszvDmL10iQd6WN1YNAAAAAElFTkSuQmCC" alt="" />
                      </div>
                      <span lang="menusinhvien-23-vt">Phiếu thu tổng hợp</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a title="Lịch theo tiến độ" langid="menusinhvien-9-title">
                    <div className="box-df auto-height titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABrklEQVRIic3Wv2sUQRjG8c/GVYPRlEYFUVTE0sLCwsoijYKViJ3b2Po/qJ2FtRZ3jWAKISBEsLC4Io2NgqCNjUiCP2KhSaPe3VjMLsixd7v3I8c9zbLPLO93Z9535p1EI0ATt+yuVkLmZooV3MA1bGEBX3ASH3Es90ZVwBE8TpoW0xx2GQn+4hXu4CHu4gG2+0bL6lGTpu9YncvfX+MnfqCLz7n/CTvDTGeA1iHRCH/wFKvYj4PYwBl8wHEcGhMWcBa3E42wjRS/xWXdDQXsQzsVZ3QFL0aKVD+Hl9AqctgeBTakOkgK4PwUgPMIc5WfTVhpiXca91DrZ5Jm36Eu7ofM+yrgAVzsMzaMOljsNcuCvsOpulHrVmmhqedwJormPNawVzwhBqpP0STi3r4esniGDgJ+wyPsqYJVqIvNXrMMuCm2pVqa+aIpm+ECLohLOk4OO3gTMr+qgOfwUiyacdTGMlpVwLc4YTK9cavXKAN28LVuxJkvmgI4qYvSIO34rwEfnQLwMJIUz/EkNzfyZ+2CGdAPCwUsiRfuVireuJ/l0M6wwBoK4p5eC5mr/wB2R2CZO4fmIgAAAABJRU5ErkJggg==" alt="" />
                      </div>
                      <span lang="menusinhvien-9-vt">Lịch theo tiến độ</span>
                    </div>
                  </a>
                </div>
                <div className="featured-item">
                  <a title="Ghi chú nhắc nhở" langid="menusinhvien-6-title">
                    <div className="box-df auto-height titleButton ">
                      <div className="icon">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABl0lEQVRIie3WP2sVQRSG8d9cNwn+6Qy2goU2io0YtLAXQWJhKbiFVinUTrCzUARt1DTCTuEHECttk3SCja1lUGwURBSTaMZid8MS7nXnRpNCfGFhZ8+885w9e2bYoEoydQ/nEdCa2vsXqXQ9Z5EiE/YQc3jWgXV1LUTTqXTpbwEv4Amubg6kkhDN4zL5wEM4YHj2CZM4ilPqMm4oRAnHEUJ0cnO8nYaPqfQ2qNJt3OpJbBW7mmuYfuIHpnrWeRBUKeEmno7IDr43scnfJLSO3SPiCbN41JZ0Ce96shu+Upk3L0SLMGjG+7cCG1PTWG+B47xdwF3cN7rEw7SMQYE1XMFMhukrbuCwuknOhegO9mZ4j2AlqNIXdXetGd001B9+T3PfzlvFBL5leAusFNiHs3iZkeUZLOCYunMnMJtKz/uMITqNpbZLcw/URTzGm2Ycc2BdtcC+DdvVHKL6EHg1hm+qCxxXr7fo29iHO6b/wH8HmP1j8wdKXeD7HQAuYxBU6TM+qU+R7dQMDhY4gfnmwXaVNuADLv4Co1ZbwkqTYWcAAAAASUVORK5CYII=" alt="" />
                      </div>
                      <span lang="menusinhvien-6-vt">Nhắc nhở</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row chart-custom">
                <div className="col-md-5">
                  <div className="box-df">
                    <div className="portlet">
                      <div className="portlet-title">
                        <div className="caption">
                          <span className="ChuTieuDeNho bold"><a href="/ket-qua-hoc-tap.html" lang="db-kqht">Kết quả học tập</a></span>
                        </div>
                        <div className="actions">
                          <select className="form-control" id="cboIDDotThongKeKQHT" langid="db-hocky-combobox" name="cboIDDotThongKeKQHT" placeholder="Chọn học kỳ"><option value>Chọn học kỳ</option>
                            <option value={37}>HK1 (2020-2021)</option>
                            <option value={38}>HK2 (2020-2021)</option>
                            <option value={39}>HK3 (2020-2021)</option>
                            <option value={40}>HK1 (2021-2022)</option>
                            <option value={41}>HK2 (2021-2022)</option>
                            <option value={42}>HK3 (2021-2022)</option>
                            <option value={43}>HK1 (2022-2023)</option>
                            <option value={44}>HK2 (2022-2023)</option>
                            <option value={45}>HK3 (2022-2023)</option>
                            <option value={46}>HK1 (2023-2024)</option>
                            <option selected="selected" value={56}>HK2 (2023-2024)</option>
                            <option value={57}>HK3 (2023-2024)</option>
                            <option value={58}>HK1 (2024-2025)</option>
                            <option value={59}>HK2 (2024-2025)</option>
                            <option value={60}>HK3 (2024-2025)</option>
                          </select>
                        </div>
                      </div>
                      <div className="portlet-body">
                        <div id="box-dashboard-thongke-ketquahoctap-theodot">
                          <div className="text-center">
                            <img src="/Content/ThemeMXH/img/tkkqht.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="box-df">
                    <div className="portlet">
                      <div className="portlet-title">
                        <div className="caption">
                          <span className="ChuTieuDeNho bold" lang="db-tiendohoctap">Tiến độ học tập</span>
                        </div>
                      </div>
                      <div className="portlet-body">
                        <div>
                          <div id="chartThongTinTinChiDaHoc">
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="box-df">
                    <div className="portlet">
                      <div className="portlet-title">
                        <div className="caption">
                          <span className="ChuTieuDeNho bold" lang="db-lhp">Lớp học phần</span>
                        </div>
                        <div className="actions">
                          <select className="form-control" id="cboIDDotForLHP" langid="db-hocky-combobox_1" name="cboIDDotForLHP" placeholder="Chọn học kỳ"><option value>Chọn học kỳ</option>
                            <option value={37}>HK1 (2020-2021)</option>
                            <option value={38}>HK2 (2020-2021)</option>
                            <option value={39}>HK3 (2020-2021)</option>
                            <option value={40}>HK1 (2021-2022)</option>
                            <option value={41}>HK2 (2021-2022)</option>
                            <option value={42}>HK3 (2021-2022)</option>
                            <option value={43}>HK1 (2022-2023)</option>
                            <option value={44}>HK2 (2022-2023)</option>
                            <option value={45}>HK3 (2022-2023)</option>
                            <option value={46}>HK1 (2023-2024)</option>
                            <option selected="selected" value={56}>HK2 (2023-2024)</option>
                            <option value={57}>HK3 (2023-2024)</option>
                            <option value={58}>HK1 (2024-2025)</option>
                            <option value={59}>HK2 (2024-2025)</option>
                            <option value={60}>HK3 (2024-2025)</option>
                          </select>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="config-tool" className="closed"> */}
        {/* <a id="config-tool-cog">
              <img src="/Content/ThemeMXH/img/icons/menu2.png" />
            </a>
            <div id="config-tool-options">
              <div className="box-df p-0">
                <div id="accordion-menu" className="accordion-menu">
                  <ul>
                    <li>
                      <a href="/dashboard.html" title><i className="fa fa-home" aria-hidden="true" /><span lang="menusinhvien-left-home">TRANG CHỦ</span></a>
                    </li>
                    <li>
                      <a title><i className="fa fa-tv" aria-hidden="true" /><span lang="groupmenu-thongtinchung">THÔNG TIN CHUNG</span></a>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/thong-tin-sinh-vien.html"><span lang="menusinhvien-1">Thông tin sinh viên</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/ghi-chu-nhac-nho-sinh-vien.html"><span lang="menusinhvien-6">Ghi chú nhắc nhở</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/de-xuat-cap-nhat-thong-tin-sinh-vien.html"><span lang="menusinhvien-3">Đề xuất cập nhật thông tin</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/de-xuat-cap-nhat-thong-tin-ngan-hang.html"><span lang="menusinhvien-42">Đề xuất cập nhật thông tin ngân hàng</span></a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:void(0)" title><i className="fa fa-mortar-board" aria-hidden="true" /><span lang="groupmenu-hoctap">HỌC TẬP</span></a>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/ket-qua-hoc-tap.html"><span lang="menusinhvien-7">Kết quả học tập</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/lich-theo-tuan.html"><span lang="menusinhvien-8">Lịch theo tuần</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/lich-theo-tien-do.html"><span lang="menusinhvien-9">Lịch theo tiến độ</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/lich-hoc-lop-danh-nghia.html"><span lang="menusinhvien-43">Lịch học lớp danh nghĩa</span></a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:void(0)" title><i className="fa fa-check-square-o" aria-hidden="true" /><span lang="groupmenu-dangkyhocphan">ĐĂNG KÝ HỌC PHẦN</span></a>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/chuong-trinh-khung.html"><span lang="menusinhvien-14">Chương trình khung</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a target="_blank" href="https://dkhp.iuh.edu.vn"><span lang="menusinhvien-15">Đăng ký học phần</span></a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="javascript:void(0)" title><i className="fa fa-cc-visa" aria-hidden="true" /><span lang="groupmenu-hocphi">HỌC PHÍ</span></a>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/cong-no-sinh-vien.html"><span lang="menusinhvien-20">Tra cứu công nợ</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/thanh-toan-truc-tuyen.html"><span lang="menusinhvien-21">Thanh toán trực tuyến</span></a>
                        </li>
                      </ul>
                      <ul className="submenu" style={{}}>
                        <li style={{}}>
                          <a href="/phieu-thu-tong-hop.html"><span lang="menusinhvien-23">Phiếu thu tổng hợp</span></a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="changeColor">
                <ul className="theme-color">
                  <li data-style="dashboard-default" className="color-default0 current"> </li>
                  <li data-style="dashboard-primary-color" className="color-default"> </li>
                  <li data-style="dashboard-two-color" className="color-default1" />
                  <li data-style="dashboard-three-color" className="color-default2" />
                  <li data-style="dashboard-four-color" className="color-default3" />
                  <li data-style="dashboard-five-color" className="color-default4" />
                </ul>
              </div>
            </div>
          </div> */}
      </div>
      <div><input id="ASC-MC" name="ASC-MC" type="hidden" defaultValue="IIS-SV-DEMO" /></div>
    </div>
  );
}

export default Dashboard;
