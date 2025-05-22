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
import tuyChon from '../../assets/images/ico-delete-min.png'
import batBuoc from '../../assets/images/ico-select-min.png'
// import { dataMH } from "./data.js";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext.js";
import axios from "axios";
function Home() {
  const { user } = useUser();
  //===============================================================
  // các useEffect
  // biến lưu danh sách học kì




  //===============================================================================================================================================================================================
  // biến và các hàm sử lý bảng môn học
  const [academicTerms, setAcademicTerms] = useState([]);
  // biến lưu học kì được chọn
  const [selectedTerm, setSelectedTerm] = useState("");

  // biến lưu danh sách học kì được phép đăng ký
  const [hocKyDuocPhepDangKy, setHocKyDuocPhepDangKy] = useState([]);
  // Hàm tạo học kì
  function generateAcademicTerms(startYear) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // January is 0
    const endYear = currentYear; // Cách sau năm hiện tại 1 năm
    let defaultTerm;
    let terms = [];

    for (let year = startYear; year <= endYear; year++) {
      for (let term = 1; term <= 3; term++) {
        terms.unshift(`HK${term} (${year}-${year + 1})`);
      }
    }
    if (currentMonth >= 11) { // After November, default to Kì 2 of the next academic year
      defaultTerm = `HK2 (${currentYear}-${currentYear + 1})`;
      setHocKyDuocPhepDangKy([`HK1 (${currentYear}-${currentYear + 1})`, defaultTerm])
    } else if (currentMonth >= 6) { // After June, default to Kì 1 of the next academic year
      defaultTerm = `HK1 (${currentYear}-${currentYear + 1})`;
      setHocKyDuocPhepDangKy([`HK3 (${currentYear - 1}-${currentYear})`, defaultTerm])
    } else if (currentMonth >= 4) { // After April, default to Kì 3 of the current academic year
      defaultTerm = `HK3 (${currentYear - 1}-${currentYear})`;
      setHocKyDuocPhepDangKy([`HK2 (${currentYear - 1}-${currentYear})`, defaultTerm])
    } else {
      defaultTerm = `HK2 (${currentYear - 1}-${currentYear})`;
      setHocKyDuocPhepDangKy([`HK1 (${currentYear - 1}-${currentYear})`, defaultTerm])
    }
    setAcademicTerms(terms);
    setSelectedTerm(defaultTerm);

  }

  const [dataMH, setDataMH] = useState([]);
  async function getMonHocCTK() {
    const respons = await axios.get(`http://localhost:8080/api/DKHP_Service/getMonHocCTK?mssv=${user.mssv}`);
    setDataMH(respons.data);
  }
  // hàm chọn học kì
  const handleTermChange = (e) => {
    setSelectedTH("");
    const term = e.target.value;
    setSelectedTerm(term);
    setNhomTH([]);
    if (!hocKyDuocPhepDangKy.includes(term)) {
      alert("Không được phép đăng ký kỳ học này");
      setSelectedTerm(hocKyDuocPhepDangKy[1])
      setDataMH([]);
      // setShowModal(true);
      // setTimeout(() => setShowModal(false), 2000);  // Thông báo hiển thị trong 2 giây
    }
    getMonHocCTK();
    setSelectedRowMonHoc(-1);
    setSelectedRowLopHocPhan(-1);
    setLopHocTheoMonHocTheoHocKy([])
    setLopHocPhanDaDangKy([])

  };
  //=================================================================================================================================================================================================================================================================================================
  //biến và hàm xử lý bảng lớp học phần

  // biến và hàm chọn môn học
  const [selectedRowMonHoc, setSelectedRowMonHoc] = useState(-1);
  // biến lưu môn học theo học kì
  const [LopHocTheoMonHocTheoHocKy, setLopHocTheoMonHocTheoHocKy] = useState([]);
  // Hàm chọn môn học
  async function handleRowClickMonHoc(index, item) {
    setSelectedRowMonHoc(index);  // Cập nhật hàng được chọn
    setSelectedRowLopHocPhan(-1);
    setChiTietLopHocPhan(null);
    setSelectedTH("");
    setNhomTH([]);

    try {
      const repon = await axios.get(
          `http://localhost:8080/api/DKHP_Service/getLopHocPhan?maMonHoc=${item.monHoc.maMonHoc}&kiHoc=${selectedTerm}`
      );
      setLopHocTheoMonHocTheoHocKy(repon.data);

      // ✅ Để log kết quả trả về, dùng repon.data, KHÔNG gọi setState trong console.log
      console.log("Dữ liệu lớp học phần:", repon.data);
    } catch (error) {
      console.error("Lỗi khi gọi API lớp học phần:", error);
    }
  }
  //===============================================================================================================================================================================================
  //biến và hàm xử lý bảng chi tiết lớp học phần
  // biến và hàm chọn lớp học phần
  const [selectedRowLopHocPhan, setSelectedRowLopHocPhan] = useState(-1);
  // biến lưu chi tiết lớp học phần
  const [chiTietLopHocPhan, setChiTietLopHocPhan] = useState();
  // biến lưu lớp học phần có data hay không
  const [isDataLopHocPhan, setIsDataLopHocPhan] = useState(false);
  // biến lưu nhóm TH
  const [nhomTH, setNhomTH] = useState([]);
  // Hàm chọn lớp học phần
  async function handleRowClickLopHocPhan(index, item) {
    setSelectedRowLopHocPhan(index);  // Cập nhật hàng được chọn
    setNhomTH([]);
    setSelectedTH("");
    // Gọi API lấy môn học theo học kỳ
    try {
      const repon = await axios.get(`http://localhost:8080/api/DKHP_Service/getGiangVienLopHP?maLopHocPhan=${item.maLopHocPhan}`)
      console.log("objectrepon", repon.data);
      setChiTietLopHocPhan(repon.data);
      if (repon.data?.loaiLichHoc === 'TH') {
        const nhomTH = repon.data.lichHocTHList.map(item => item.tenNhomLichHocTH)
        setNhomTH(nhomTH);
      }
    } catch (error) {
      console.log(error);
    }

  }
  //===============================================================================================================================================================================================
  //biến và hàm xử lý nút đăng ký
  //===============================================================
  //biến và hàm xử lý bảng lớp học phần đã đăng ký




  function TongTCMH(a, b) {
    return a + b;
  }

  const [showModal, setShowModal] = useState(false);


  // Sử dụng hàm:
  // hàm lấy phòng học
  function getPhongHoc(string) {
    if (string) { // Kiểm tra xem chuỗi có tồn tại (không phải null hoặc undefined)
      const start = string.lastIndexOf('_') + 1;
      return string.substring(start);
    }
    return ''
  }
  // hàm lấy dãy nhà
  function getDayNha(String) {
    return String?.slice(9, 10);
  }
  function formatDate(inputDate) {
    const date = new Date(inputDate); // Chuyển đổi chuỗi ngày tháng vào đối tượng Date
    return date.toLocaleDateString('vi-VN'); // Định dạng ngày theo dạng ngày/tháng/năm
  }
  // hàm lấy lịch học
  function getLichHoc(lichHoc) {
    return lichHoc.slice(0, 15)
  }
  const [selectedTH, setSelectedTH] = useState("");
  // hàm chọn nhóm thực hành
  //biến chọn nhóm thực hành
  function handleChonNhomTH(e) {
    setSelectedTH(e.target.value);
  }
  // dăng ký môn học

  async function DangKiMonHoc() {
    if (chiTietLopHocPhan?.loaiLichHoc === 'TH' && selectedTH === "") {
      alert("Vui lòng chọn nhóm thực hành.");
      return;
    }

    const data = {
      sinhVien: {
        mssv: user.mssv,
      },
      lopHocPhan: {
        maLopHocPhan: chiTietLopHocPhan?.maLopHocPhan || null,
      },
      ngayDangKy: new Date().toISOString(),
      trangThaiHocPhi: 0,
      nhomTH: selectedTH === "" ? 0 : selectedTH,
    };

    try {
      const response = await axios.post(`http://localhost:8080/api/DKHP_Service/addBangDiem`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("✅ Đăng ký môn học thành công!");

        // Reset lại các trạng thái cần thiết sau khi đăng ký thành công
        getMonHocCTK();
        getLopHocPhanDaDangKy();
        setChiTietLopHocPhan(null);
        setSelectedRowMonHoc(-1);
        setSelectedRowLopHocPhan(-1);
        setNhomTH([]);
        setSelectedTH("");
        setLopHocTheoMonHocTheoHocKy([]);
      } else {
        alert("❌ Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi đăng ký môn học:", error);
      alert("❌ Có lỗi xảy ra khi đăng ký môn học. Kiểm tra kết nối hoặc thử lại sau.");
    }
  }
  // bổ sung
  // async function DangKiMonHoc() {
  //   if (chiTietLopHocPhan?.loaiLichHoc === 'TH' && selectedTH === "") {
  //     alert("Vui lòng chọn nhóm thực hành.");
  //     return;
  //   }
  //
  //   alert("✅ Đăng ký môn học thành công (chỉ hiển thị, không gửi lên server)");
  //
  //   // Reset các state nếu cần
  //   setChiTietLopHocPhan(null);
  //   setSelectedRowMonHoc(-1);
  //   setSelectedRowLopHocPhan(-1);
  //   setNhomTH([]);
  //   setSelectedTH("");
  //   setLopHocTheoMonHocTheoHocKy([]);
  // }


  useEffect(() => {(async () => {
    await getMonHocCTK();
    generateAcademicTerms(user.namBatDauHoc);
  })();
  }, []);
  useEffect(() => {
    if (selectedTerm) {
      getLopHocPhanDaDangKy();
    }
  }, [selectedTerm]);
  // biến lưu danh sách lớp học phần đã đăng ký
  const [lopHocPhanDaDangKy, setLopHocPhanDaDangKy] = useState([]);
  // get lớp học phần đã đăng kí trong kì này
  async function getLopHocPhanDaDangKy() {
    try{
      console.log("hoc kì",selectedTerm);
      const respons = await axios.get(`http://localhost:8080/api/DKHP_Service/getLHPDaDK?mssv=${user.mssv}&kiHoc=${encodeURIComponent(selectedTerm)}`);
      setLopHocPhanDaDangKy(respons.data);
      console.log("Học phần đã dăng kí", respons.data);
    }
    catch(error){
      console.log("Lỗi get Lớp học phần đã đăng kí",error);
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
                      {/*
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Thông Báo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Sinh viên không được phép đăng ký kỳ học này.</Modal.Body>
                    </Modal> */}
                    </div>
                    <div className="pull-left">
                      <div className="group-option">
                        <label id="lblHocMoi">
                          <input
                              type="radio"
                              id="radHocMoi"
                              name="sv-dk"
                              defaultValue={1}
                              defaultChecked="checked"
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
                              defaultValue={2}
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
                              defaultValue={3}
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
                            Học phần: học trước (a), tiên quyết (b), song hành
                            (c)
                          </th>
                          <th>Học phần tương đương</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataMH.map((item, index) => (
                            <tr className={`monhoctr monhoc_014193 ${selectedRowMonHoc === index ? 'selected-row' : ''}`} key={index} onClick={() => handleRowClickMonHoc(index, item)}>
                              <td>
                                <input type="radio" name="MHRadio" checked={selectedRowMonHoc === index} readOnly />
                              </td>
                              <td>{index + 1}</td>
                              <td>{item.monHoc.maMonHoc}</td>
                              <td className="alignleftcol">{item.monHoc.tenMonHoc}</td>
                              <td>{TongTCMH(item.soTinChiLyThuyet, item.soTinChiThucHanh)}</td>
                              <td> <img style={{ width: '20px', height: '20px', objectFit: 'cover' }} src={item.loaiMonHoc === "Bắt buộc" ? batBuoc : tuyChon} /> </td>
                              <td>{item.monHoc.maMonTQ !== 0 ? item.monHoc.maMonTQ : null}</td>
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
                      {/* <div
                      className="pull-right"
                      style={{ paddingRight: "10px" }}
                    >
                      <label>
                        <input
                          id="chkLHPKhongTrungLich"
                          name="chkLHPKhongTrungLich"
                          type="checkbox"
                          defaultValue="true"
                        />
                        <input
                          name="chkLHPKhongTrungLich"
                          type="hidden"
                          defaultValue="false"
                        />
                        Hiển thị lớp học phần không trùng lịch
                      </label>
                    </div> */}
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
                        {LopHocTheoMonHocTheoHocKy && LopHocTheoMonHocTheoHocKy.map((item, index) => (
                            <tr className={`monhoctr monhoc_014193 ${selectedRowLopHocPhan === index ? 'selected-row' : ''}`} key={index} onClick={() => handleRowClickLopHocPhan(index, item)}>
                              <td>
                                <input type="radio" name="MHRadio" readOnly />
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
                          <select id="selectNhomTH"
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "20px",
                                    minWidth: "150px",
                                  }} value={selectedTH} onChange={handleChonNhomTH}>
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

                        {chiTietLopHocPhan?.maLopHocPhan != 0 && chiTietLopHocPhan ? <tr className="selected-row" >
                          <td>
                            1
                          </td>
                          <td>LT - {getLichHoc(chiTietLopHocPhan?.lichHocLT[0])}</td>

                          <td />
                          <td className="alignleftcol">{getPhongHoc(chiTietLopHocPhan?.viTri)}</td>
                          <td>{getDayNha(chiTietLopHocPhan?.viTri)}(CS1)</td>

                          <td className="alignleftcol">Cơ sở 1(Thành phố Hồ Chí Minh)</td>
                          <td className="alignleftcol">{chiTietLopHocPhan?.giangVien?.tenGiangVien}</td>
                          <td className="alignleftcol">{formatDate(chiTietLopHocPhan?.thoiGian)}</td>
                          <td />
                        </tr> : null}
                        {
                            chiTietLopHocPhan?.maLopHocPhan != 0 && chiTietLopHocPhan?.loaiLichHoc === 'TH' &&
                            chiTietLopHocPhan.lichHocTHList.map((item, index) => (
                                <tr className={`${selectedTH == (index + 1) ? 'selected-row-blue' : ''}`} key={index}>
                                  <td>{index + 2}</td>
                                  <td>{getLichHoc(item.lichHoc[0])}</td>
                                  <td>{item.tenNhomLichHocTH}</td>
                                  <td className="alignleftcol">{getPhongHoc(item?.viTri)}</td>
                                  <td>{getDayNha(item?.viTri)}(CS1)</td>
                                  <td className="alignleftcol">Cơ sở 1(Thành phố Hồ Chí Minh)</td>
                                  <td className="alignleftcol">{chiTietLopHocPhan.giangVien?.tenGiangVien}</td>
                                  <td className="alignleftcol">{formatDate(chiTietLopHocPhan.thoiGian)}</td>
                                  <td />
                                </tr>
                            ))
                        }

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
                        name
                        // disabled="disabled"
                        defaultValue="Đăng ký môn học"
                        className="btn-custom-1"
                        style={{ verticalAlign: "middle" }}
                    >Đăng kí môn học</a>
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

                          <th>Trang thái ĐK</th>
                          <th>Ngày ĐK</th>
                          <th>Trang Thái LHP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lopHocPhanDaDangKy && lopHocPhanDaDangKy.map((item, index) => (
                            <tr key={index}>
                              <td>

                              </td>
                              <td>{index + 1}</td>
                              <td>{item.maLopHocPhan}</td>
                              <td className="alignleftcol">{item.monHoc.tenMonHoc}</td>
                              <td className="alignleftcol">{item.tenLopHocPhan}</td>
                              <td>{TongTCMH(item.soTinhChiLT,item.soTinhChiTH)}</td>
                              <td>{item.nhomTH=='0'?null:item.nhomTH}</td>
                              <td></td>
                              <td></td>

                              <td>{item.ngayDangKy.slice(0,10)}</td>
                              <td>{item.trangThaiLop}</td>
                            </tr>
                        ))
                        }
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

export default Home;