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
import { useNavigate } from "react-router-dom";
import print from "../../assets/images/print-w.png";
import tuyChon from '../../assets/images/ico-delete-min.png';
import batBuoc from '../../assets/images/ico-select-min.png';
import { datamonhocdangky } from './datamonhocdangky';
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext.js";
import axios from "axios";
import { Modal } from "react-bootstrap";

function Register() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    getMonHocCTK();
    generateAcademicTerms(user.namBatDauHoc);
  }, [user, navigate]);

  const [academicTerms, setAcademicTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [hocKyDuocPhepDangKy, setHocKyDuocPhepDangKy] = useState([]);
  const [error, setError] = useState(null);

  function generateAcademicTerms(startYear) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const endYear = currentYear;
    let defaultTerm;
    let terms = [];

    for (let year = startYear; year <= endYear; year++) {
      for (let term = 1; term <= 3; term++) {
        terms.unshift(`HK${term} (${year}-${year + 1})`);
      }
    }
    if (currentMonth >= 11) {
      defaultTerm = `HK2 (${currentYear}-${currentYear + 1})`;
      setHocKyDuocPhepDangKy([`HK1 (${currentYear}-${currentYear + 1})`, defaultTerm]);
    } else if (currentMonth >= 6) {
      defaultTerm = `HK1 (${currentYear}-${currentYear + 1})`;
      setHocKyDuocPhepDangKy([`HK3 (${currentYear - 1}-${currentYear})`, defaultTerm]);
    } else if (currentMonth >= 4) {
      defaultTerm = `HK3 (${currentYear - 1}-${currentYear})`;
      setHocKyDuocPhepDangKy([`HK2 (${currentYear - 1}-${currentYear})`, defaultTerm]);
    } else {
      defaultTerm = `HK2 (${currentYear - 1}-${currentYear})`;
      setHocKyDuocPhepDangKy([`HK1 (${currentYear - 1}-${currentYear})`, defaultTerm]);
    }
    setAcademicTerms(terms);
    setSelectedTerm(defaultTerm);
  }

  const [dataMH, setDataMH] = useState([]);
  async function getMonHocCTK() {
    try {
      const response = await axios.get(`/getMonHocCTK?mssv=${user.mssv}`);
      setDataMH(response.data);
      setError(null);
    } catch (error) {
      console.error("Lỗi khi lấy môn học CTK:", error);
      setError("Không thể tải danh sách môn học. Vui lòng thử lại sau.");
    }
  }

  const handleTermChange = (e) => {
    setSelectedTH("");
    const term = e.target.value;
    setSelectedTerm(term);
    setNhomTH([]);
    if (!hocKyDuocPhepDangKy.includes(term)) {
      alert("Không được phép đăng ký kỳ học này");
      setSelectedTerm(hocKyDuocPhepDangKy[1]);
      setDataMH([]);
      getMonHocCTK();
      setSelectedRowMonHoc(-1);
      setSelectedRowLopHocPhan(-1);
      setLopHocTheoMonHocTheoHocKy([]);
    }
  };

  const [selectedRowMonHoc, setSelectedRowMonHoc] = useState(-1);
  const [LopHocTheoMonHocTheoHocKy, setLopHocTheoMonHocTheoHocKy] = useState([]);
  async function handleRowClickMonHoc(index, item) {
    setSelectedRowMonHoc(index);
    setSelectedRowLopHocPhan(-1);
    setChiTietLopHocPhan(null);
    setSelectedTH("");
    setNhomTH([]);
    try {
      const response = await axios.get(`/getLopHocPhan?maMonHoc=${item.monHoc.maMonHoc}&kiHoc=${selectedTerm}`);
      setLopHocTheoMonHocTheoHocKy(response.data);
      setError(null);
    } catch (error) {
      console.error("Lỗi khi lấy lớp học phần:", error);
      setError("Không thể tải danh sách lớp học phần. Vui lòng thử lại sau.");
    }
  }

  const [selectedRowLopHocPhan, setSelectedRowLopHocPhan] = useState(-1);
  const [chiTietLopHocPhan, setChiTietLopHocPhan] = useState(null);
  const [nhomTH, setNhomTH] = useState([]);
  const [selectedTH, setSelectedTH] = useState("");
  async function handleRowClickLopHocPhan(index, item) {
    setSelectedRowLopHocPhan(index);
    setNhomTH([]);
    setSelectedTH("");
    try {
      const response = await axios.get(`/getGiangVienLopHP?maLopHocPhan=${item.maLopHocPhan}`);
      setChiTietLopHocPhan(response.data);
      if (response.data?.loaiLichHoc === 'TH') {
        const nhomTH = response.data.lichHocTHList.map(item => item.tenNhomLichHocTH);
        setNhomTH(nhomTH);
      }
      setError(null);
    } catch (error) {
      console.error("Lỗi khi lấy giảng viên lớp học phần:", error);
      setError("Không thể tải chi tiết lớp học phần. Vui lòng thử lại sau.");
    }
  }

  function TongTCMH(a, b) {
    return a + b;
  }

  function getPhongHoc(string) {
    if (string) {
      const start = string.lastIndexOf('_') + 1;
      return string.substring(start);
    }
    return '';
  }

  function getDayNha(String) {
    return String?.slice(9, 10);
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    return date.toLocaleDateString('vi-VN');
  }

  function getLichHoc(lichHoc) {
    return lichHoc?.slice(0, 15) || '';
  }

  function handleChonNhomTH(e) {
    setSelectedTH(e.target.value);
  }

  async function DangKiMonHoc() {
    if (chiTietLopHocPhan?.loaiLichHoc === 'TH' && selectedTH === "") {
      alert("Vui lòng chọn nhóm thực hành");
      return;
    }
    const data = {
      sinhVien: {
        mssv: user.mssv,
      },
      lopHocPhan: {
        maLopHocPhan: chiTietLopHocPhan?.maLopHocPhan
      },
      ngayDangKy: new Date().toISOString(),
      trangThaiHocPhi: 0,
      nhomTH: selectedTH || 0
    };

    try {
      const response = await axios.post(`/addBangDiem`, data);
      console.log("Đăng ký môn học thành công", response.data);
      getMonHocCTK();
      setChiTietLopHocPhan(null);
      setSelectedRowMonHoc(-1);
      setSelectedRowLopHocPhan(-1);
      setNhomTH([]);
      setSelectedTH("");
      setLopHocTheoMonHocTheoHocKy([]);
      setError(null);
      alert("Đăng ký môn học thành công!");
    } catch (error) {
      console.error("Lỗi đăng ký môn học:", error);
      setError("Đăng ký môn học thất bại. Vui lòng thử lại sau.");
    }
  }

  return (
    <div>
      <Banner />
      <div id="contain">
        <div className="bg-fff">
          <section className="content">
            <div className="container">
              <InforUser />
              <div className="dangkyhp border-box info-sv" id="dkhpsv">
                <h2 style={{ fontSize: 22, margin: 20, fontWeight: 'bold' }} className="title-table">
                  Đăng ký học phần
                </h2>
                {error && (
                  <div className="alert alert-danger" style={{ margin: 20 }}>
                    {error}
                  </div>
                )}
                <div
                  className="form-dk clearfix center-block"
                  style={{ maxWidth: "850px" }}
                >
                  <div className="pull-left">
                    <select id="cboKhoaHoc" style={{ display: "none" }} />
                  </div>
                  <div className="pull-left">
                    <span style={{ marginRight: "15px" }}>
                      <b>&nbsp;Đợt đăng ký</b>
                    </span>
                    <select id="KiHoc" value={selectedTerm} onChange={handleTermChange}>
                      {academicTerms.map((term, index) => (
                        <option key={index} value={term}>
                          {term}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="pull-left">
                    <div className="group-option">
                      <label id="lblHocMoi">
                        <input
                          type="radio"
                          id="radHocMoi"
                          name="sv-dk"
                          value={1}
                          defaultChecked
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "25px",
                            marginBottom: "7px",
                            marginRight: "5px",
                          }}
                        />
                        Học mới
                      </label>
                      <label id="lblHocLai">
                        <input
                          type="radio"
                          id="radHocLai"
                          name="sv-dk"
                          value={2}
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "25px",
                            marginBottom: "7px",
                            marginRight: "5px",
                          }}
                        />
                        Học lại
                      </label>
                      <label id="lblHocCaiThien">
                        <input
                          type="radio"
                          id="radHocCaiThien"
                          name="sv-dk"
                          value={3}
                          style={{
                            verticalAlign: "middle",
                            marginLeft: "25px",
                            marginBottom: "7px",
                            marginRight: "5px",
                          }}
                        />
                        Học cải thiện
                      </label>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="text-left" style={{ display: "none" }}>
                    <i id="lblGhiChuDot" />
                  </div>
                </div>
                <div className="gr-table" id="chodk">
                  <h3 style={{ fontSize: 18, margin: 20, fontWeight: 'bold' }} className="title-table">Môn học phần đang chờ đăng ký</h3>
                  <div className="dangkyhocphantable">
                    <table
                      id="monHocCho"
                      className="table table-bordered bg-custom responsive text-center"
                    >
                      <thead>
                        <tr>
                          <th />
                          <th>STT</th>
                          <th>Mã HP</th>
                          <th>Tên môn học</th>
                          <th style={{ minWidth: "40px" }}>TC</th>
                          <th>Bắt buộc</th>
                          <th style={{ width: "18%" }}>
                            Học phần: học trước (a), tiên quyết (b), song hành (c)
                          </th>
                          <th>Học phần tương đương</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataMH.map((item, index) => (
                          <tr
                            className={`monhoctr monhoc_014193 ${selectedRowMonHoc === index ? 'selected-row' : ''}`}
                            key={index}
                            onClick={() => handleRowClickMonHoc(index, item)}
                          >
                            <td>
                              <input type="radio" name="MHRadio" checked={selectedRowMonHoc === index} readOnly />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.monHoc.maMonHoc}</td>
                            <td className="alignleftcol">{item.monHoc.tenMonHoc}</td>
                            <td>{TongTCMH(item.soTinChiLyThuyet, item.soTinChiThucHanh)}</td>
                            <td>
                              <img
                                style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                                src={item.loaiMonHoc === "Bắt buộc" ? batBuoc : tuyChon}
                                alt={item.loaiMonHoc}
                              />
                            </td>
                            <td>{item.monHoc.maMonTQ !== 0 ? item.monHoc.maMonTQ : ''}</td>
                            <td />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div id="appendNone" />
                </div>
                <div className="gr-table" id="lopchodk">
                  <h3 style={{ fontSize: 18, margin: 20, fontWeight: 'bold' }} className="title-table">
                    Lớp học phần chờ đăng ký
                  </h3>
                  <div className="clearfix" />
                  <div className="dangkyhocphantable">
                    <table
                      id="lopHocCho"
                      className="table table-bordered bg-custom responsive text-center"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th />
                          <th>STT</th>
                          <th>Mã LHP</th>
                          <th>Tên lớp học phần</th>
                          <th>Lớp dự kiến</th>
                          <th>Sĩ số tối đa</th>
                          <th>Đã đăng ký</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {LopHocTheoMonHocTheoHocKy.map((item, index) => (
                          <tr
                            className={`monhoctr monhoc_014193 ${selectedRowLopHocPhan === index ? 'selected-row' : ''}`}
                            key={index}
                            onClick={() => handleRowClickLopHocPhan(index, item)}
                          >
                            <td>
                              <input type="radio" name="MHRadio" checked={selectedRowLopHocPhan === index} readOnly />
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.maLopHocPhan}</td>
                            <td className="alignleftcol">{item.monHoc.tenMonHoc}</td>
                            <td className="alignleftcol">{item.tenLopHocPhan}</td>
                            <td className="alignleftcol">{item.soLuongToiDa}</td>
                            <td className="alignleftcol">{item.soLuongDaDangKy}</td>
                            <td className="alignleftcol">{item.trangThaiLop}</td>
                            <td />
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div id="appendNoneLHP" />
                </div>
                <div className="gr-table" id="ctlophp">
                  <h3 style={{ fontSize: 18, margin: 20, fontWeight: 'bold' }} className="title-table">Chi tiết lớp học phần</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div style={{ margin: "10px 0" }}>
                        <span style={{ marginRight: "15px" }}>
                          Nhóm thực hành
                        </span>
                        <select
                          id="selectNhomTH"
                          style={{
                            marginLeft: "10px",
                            marginRight: "20px",
                            minWidth: "150px",
                          }}
                          value={selectedTH}
                          onChange={handleChonNhomTH}
                        >
                          <option value="">Chọn nhóm thực hành</option>
                          {nhomTH.map((term, index) => (
                            <option key={index} value={term}>
                              {term}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="dangkyhocphantable">
                    <table
                      id="chiTietLopHoc"
                      className="table table-bordered bg-custom responsive text-center"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Lịch học</th>
                          <th>Nhóm TH</th>
                          <th>Phòng</th>
                          <th>Dãy nhà</th>
                          <th>Cơ sở</th>
                          <th>Giảng viên</th>
                          <th>Thời gian</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {chiTietLopHocPhan?.maLopHocPhan && (
                          <tr className="selected-row">
                            <td>1</td>
                            <td>{chiTietLopHocPhan.lichHocLT?.[0] ? `LT - ${getLichHoc(chiTietLopHocPhan.lichHocLT[0])}` : ''}</td>
                            <td />
                            <td className="alignleftcol">{getPhongHoc(chiTietLopHocPhan?.viTri)}</td>
                            <td>{getDayNha(chiTietLopHocPhan?.viTri)} (CS1)</td>
                            <td className="alignleftcol">Cơ sở 1 (Thành phố Hồ Chí Minh)</td>
                            <td className="alignleftcol">{chiTietLopHocPhan?.giangVien?.tenGiangVien || ''}</td>
                            <td className="alignleftcol">{chiTietLopHocPhan?.thoiGian ? formatDate(chiTietLopHocPhan.thoiGian) : ''}</td>
                            <td />
                          </tr>
                        )}
                        {chiTietLopHocPhan?.loaiLichHoc === 'TH' &&
                          chiTietLopHocPhan.lichHocTHList?.map((item, index) => (
                            <tr className={`${selectedTH === item.tenNhomLichHocTH ? 'selected-row-blue' : ''}`} key={index}>
                              <td>{index + 2}</td>
                              <td>{getLichHoc(item.lichHoc?.[0])}</td>
                              <td>{item.tenNhomLichHocTH}</td>
                              <td className="alignleftcol">{getPhongHoc(item?.viTri)}</td>
                              <td>{getDayNha(item?.viTri)} (CS1)</td>
                              <td className="alignleftcol">Cơ sở 1 (Thành phố Hồ Chí Minh)</td>
                              <td className="alignleftcol">{chiTietLopHocPhan.giangVien?.tenGiangVien || ''}</td>
                              <td className="alignleftcol">{chiTietLopHocPhan?.thoiGian ? formatDate(chiTietLopHocPhan.thoiGian) : ''}</td>
                              <td />
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div id="appendNoneChiTiet" />
                </div>
                <div style={{ textAlign: "center" }} id="dkhpbtn">
                  <a
                    onClick={DangKiMonHoc}
                    id="dkMonHoc"
                    type="submit"
                    className="btn-custom-1"
                    style={{ verticalAlign: "middle" }}
                  >
                    Đăng kí môn học
                  </a>
                </div>
                <div className="gr-table" id="divDDK">
                  <h3 style={{ fontSize: 18, margin: 20, fontWeight: 'bold' }} className="title-table">
                    Lớp học phần đã đăng ký trong học kỳ này
                    <button
                      style={{ float: "right" }}
                      id="btnPrintDDK"
                      className="btn btn-custom-1"
                      title="In danh sách lớp học phần đã đăng kí"
                    >
                      <img
                        src={print}
                        style={{ width: "20px", height: '20px' }}
                        className="center-block"
                        alt="In danh sách"
                      />
                    </button>
                  </h3>
                  <div className="dangkyhocphantable">
                    <table
                      id="lopDaDK"
                      className="table table-bordered bg-custom responsive text-center"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th>Thao tác</th>
                          <th>STT</th>
                          <th>Mã LHP</th>
                          <th>Tên môn học</th>
                          <th>Lớp học dự kiến</th>
                          <th>Số TC</th>
                          <th style={{ padding: 0 }}>Nhóm TH</th>
                          <th>Học phí</th>
                          <th>Hạn nộp</th>
                          <th>Thu</th>
                          <th>Trang thái ĐK</th>
                          <th>Ngày ĐK</th>
                          <th>Trang Thái LHP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {datamonhocdangky.map((item, index) => (
                          <tr key={item.id}>
                            <td>
                              <button className="btn btn-danger btn-sm">Hủy</button>
                            </td>
                            <td>{index + 1}</td>
                            <td>{item.maLHP}</td>
                            <td>{item.tenMH}</td>
                            <td>{item.lopHP}</td>
                            <td>{item.soTC}</td>
                            <td>{item.nhomTH}</td>
                            <td>{item.hocPhi.toLocaleString()}₫</td>
                            <td>{item.hanNop}</td>
                            <td>{item.thu.toLocaleString()}₫</td>
                            <td>{item.trangThai}</td>
                            <td>{item.ngayDK}</td>
                            <td>{item.trangThaiLop}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Register;