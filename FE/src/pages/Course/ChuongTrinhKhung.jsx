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
import print from "../../assets/images/print-w.png";
import { useState } from "react";
import { dataChuongTK } from './dataChuongTK.js'
import { useUser } from "../../contexts/UserContext.js";
import React from "react";
function Home() {
  const { user } = useUser();
  return (
    <div>
      <Banner />
      <div id="contain">
        <div className="bg-fff">
          <section className="content">
            <div className="container">
              <InforUser />
              <div className="dangkyhp border-box info-sv">
                <h2 className="title-table">TRA CỨU CHƯƠNG TRÌNH KHUNG</h2>
                <h3 className="title-table">Sinh viên: {user.hoTen}</h3>
                <div className="col-md-12">
                  <div className="bullet-table">
                    <div className="col-md-6">
                      <ul className="custom-bullet clearfix">
                        <li>Đại học Chính quy</li>
                        <li>Khóa 2020 - 2021</li>
                        <li>Cơ sở 1 (Thành phố Hồ Chí Minh)</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="custom-bullet clearfix">
                        <li>Ngành {user.tenNganhHoc} </li>
                        <li>Chuyên ngành {user.tenNganhHoc}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="clear" />
                <h3 id="title-ctk" className="title-table">Thông tin chương trình khung <button id="btnPrintCTK" className="btn btn-custom-1" title="In chương trình khung">
                  <img src={print} width={18} height={18} className="center-block" />
                </button>
                </h3>
                <div className="gr-table">
                  <div className="dangkyhocphantable">
                    <table id="chuongtrinhkhungtbl" className="table table-bordered bg-custom responsive text-center" width="100%">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Mã môn học</th> 
                          <th>Tên môn học</th> 
                          <th>Mã học phần</th> 
                          <th>
                            <span id="hpFull">Học phần: học trước (a), tiên quyết (b), song hành (c)</span>
                            <span id="hpHide">Học phần</span>
                          </th> 
                          <th style={{ minWidth: '20px' }}>Số TC/ĐVHT</th> 
                          <th style={{ minWidth: '20px' }}>Số tiết LT</th> 
                          <th style={{ minWidth: '20px' }}>Số tiết TH</th> 
                          <th style={{ minWidth: '30px' }}>Đạt</th> 
                          <th style={{ minWidth: '30px' }}>Đề cương môn học</th> 
                        </tr>
                      </thead>
                      <tbody>
                      {dataChuongTK.map((semester, index) => (
    <React.Fragment key={semester.id}>
      <tr className="hockytr">
        <td colSpan={10}>{semester.HocKy} - Tổng số TC: {semester.tongTC}</td>
      </tr>
      {semester.hocPhanBatBuoc.length > 0 && (
        <>
          <tr className="HocKyRowCls">
            <td style={{textAlign: 'left'}} colSpan={10}>Học phần bắt buộc</td>
          </tr>
          {semester.hocPhanBatBuoc.map((hpbb, idx) => (
            <tr key={hpbb.id} className="HocPhanRowCls verify-tr">
              <td>{idx + 1}</td> 
              <td>{hpbb.maMH}</td> 
              <td className="alignleftcol">{hpbb.tenMH}</td>
              <td>{hpbb.maHP}</td> 
              <td>{hpbb.hpTienQuyet}</td> 
              <td>{hpbb.soTC}</td> 
              <td>{hpbb.soTietLT}</td> 
              <td>{hpbb.soTietTH}</td> 
              <td><img className="verify" src="/Content/images/ico-select-min.png" alt="Đạt"/></td>
              <td>
                <button >Xem</button> 
              </td>
            </tr>
          ))}
        </>
      )}
      {semester.hocPhanTuChon.length > 0 && (
        <>
          <tr className="HocKyRowCls">
            <td style={{textAlign: 'left'}} colSpan={10}>Học phần tự chọn</td>
          </tr>
          {semester.hocPhanTuChon.map((hptc, idx) => (
            <tr key={hptc.id} className="HocPhanRowCls">
              <td>{idx + 1}</td>
              <td>{hptc.maMH}</td>
              <td className="alignleftcol">{hptc.tenMH}</td>
              <td>{hptc.maHP}</td> 
              <td>{hptc.hpTienQuyet}</td> 
              <td>{hptc.soTC}</td> 
              <td>{hptc.soTietLT}</td> 
              <td>{hptc.soTietTH}</td> 
              <td><img className="verify" src="/Content/images/ico-select-min.png" alt="Đạt"/></td>
              <td>
                <button >Xem</button>
              </td>
            </tr>
          ))}
        </>
      )}
    </React.Fragment>
  ))}
                        
                        
                        <tr className="SummaryRowCls">
                          <td colSpan={5}>Tổng số TC/ĐVHT yêu cầu</td>
                          <td colSpan={5} className="alignrightcol">138</td>
                        </tr>
                        <tr className="SummaryRowCls">
                          <td colSpan={5}>Tổng số TC/ĐVHT bắt buộc</td>
                          <td colSpan={5} className="alignrightcol">106</td>
                        </tr>
                        <tr className="SummaryRowCls">
                          <td colSpan={5}>Tổng số TC/ĐVHT tự chọn</td>
                          <td colSpan={5} className="alignrightcol">32</td>
                        </tr>
                        <tr className="SummaryRowCls">
                          <td colSpan={10} style={{ textTransform: 'none', fontWeight: 'normal', fontStyle: 'italic' }}>Ghi chú: Những môn học có dấu <span style={{ color: 'red', fontWeight: 'bold' }}>*</span> không được tính vào Trung bình chung tích lũy</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="GhiChu">
                    <div>Môn đã hoặc đang học</div>
                    <div style={{ backgroundColor: '#eee', border: '1px solid gray', marginTop: '5px' }} />
                    <div>&nbsp;&nbsp;Đã đạt &nbsp;<img className="verify" src="/Content/images/ico-select-min.png" />
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
