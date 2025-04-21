import { useEffect, useState } from 'react';
import Header from '../../layouts/thongTinSV/Header'
import data from './dataLicHoc';
import { useNavigate } from 'react-router-dom';
import path from '../../routes/Path'
function LichHoc() {
    const navigate = useNavigate();

    //hàm format ngày theo dạng dd-mm-yyyy
    const formatDate1 = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    };

    // hàm lấy ngày trong tuần
    function getWeekDates(selectedDate) {
        const date = new Date(selectedDate);
        const dayOfWeek = date.getDay();
        const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Chủ nhật là 0, Thứ hai là 1

        const monday = new Date(date);
        monday.setDate(monday.getDate() + differenceToMonday);

        const datesOfWeek = Array.from({ length: 7 }).map((_, index) => {
            const day = new Date(monday);
            day.setDate(day.getDate() + index);
            return day;
        });

        return datesOfWeek;
    }
    // biến lưu ngày hiện tại
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    // biến lưu ngày trong tuần
    const weekDates = getWeekDates(selectedDate);
    // hàm format ngày theo dạng yyyy-mm-dd
    const formatDate = (date) => {
        return date.toISOString().slice(0, 10);
    };
    // hàm chuyển tuần
    const moveWeek = (days) => {
        const current = new Date(selectedDate);
        current.setDate(current.getDate() + days);
        return current.toISOString().slice(0, 10);
    };

    const handleNextWeek = () => {
        setSelectedDate(moveWeek(7));
    };

    const handlePrevWeek = () => {
        setSelectedDate(moveWeek(-7));
    };
    // hàm lọc dữ liệu theo tuần được chọn
    function filterDataForWeek(data, weekDates) {
        const format = (date) => {
            let d = new Date(date),
                day = ('0' + d.getDate()).slice(-2),
                month = ('0' + (d.getMonth() + 1)).slice(-2),
                year = d.getFullYear();
            return `${day}-${month}-${year}`;
        };

        const weekSet = new Set(weekDates.map(date => format(date)));
        return data.filter(item => weekSet.has(item.time));
    }
    //biến lưu dữ liệu lịch học
    const [scheduleData, setScheduleData] = useState([]);
    // Cập nhật lịch học khi selectedDate thay đổi
    useEffect(() => {
        const weekDates = getWeekDates(selectedDate); // Tính toán các ngày trong tuần từ selectedDate
        const filteredData = filterDataForWeek(data, weekDates); // Lọc dữ liệu cho tuần này
        setScheduleData(filteredData); // Cập nhật state với dữ liệu đã lọc
    }, [selectedDate]);
    // console.log("scheduleData", scheduleData);
    // console.log("weekDates", weekDates);
    // hàm lọc ra lịch của ngày nào đó
    const filterDataForDay = (date, ca) => {
        let result = [];
        scheduleData.forEach((item) => {
            if (item.time === date && item.ca === ca) {
                result.push(
                    <div className="content color-lichhoc text-left" style={{ backgroundColor: '#71cb35', borderColor: '#c9d0db', textAlign: 'left' }} key={item.id}>
                        <b><a target style={{ textDecoration: 'none', color: '#003763' }} data-toggle="tooltip" data-placement="auto" title data-original-title>{item.name}</a></b>
                        <p>{item.maLop} - {item.maHocPhan}</p>
                        <p><span lang="lichtheotuan-tiet">Tiết</span>: {item.tiet}<br /></p>
                        <p><span lang="giang-duong">Phòng</span>:<font> {item.phong}</font> </p>
                        <p><span lang="lichtheotuan-gv">GV</span>: <font>{item.giangVien} </font></p>
                    </div>
                );
            }
        });
        // console.log("object", result);
        return result;
    };
    return (

        <div className="wrapper">
            <Header />
            <div className="main-content">
                <div className="container" style={{ width: '80%' }} id="full-resize-table">
                    <div className="main-section-content" id="contnet">
                        <div className="row" >
                            <div className="col-md-2 hidden-xs">
                                <div className="box-df p-0">
                                    <div id="accordion-menu" className="accordion-menu">
                                        <ul>
                                            <li>
                                                <a href="javascript:void(0)" onClick={() => {
                                                    navigate(`${path.Dashboard}`)
                                                }} title>
                                                    <i className="fa fa-home" aria-hidden="true" />
                                                    <span lang="menusinhvien-left-home">TRANG CHỦ</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" title>
                                                    <i className="fa fa-tv" aria-hidden="true" />
                                                    <span lang="groupmenu-thongtinchung">THÔNG TIN CHUNG</span>
                                                </a>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/thong-tin-sinh-vien.html">
                                                            <span lang="menusinhvien-1">Thông tin sinh viên</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/ghi-chu-nhac-nho-sinh-vien.html">
                                                            <span lang="menusinhvien-6">Ghi chú nhắc nhở</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/de-xuat-cap-nhat-thong-tin-sinh-vien.html">
                                                            <span lang="menusinhvien-3">Đề xuất cập nhật thông tin</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/de-xuat-cap-nhat-thong-tin-ngan-hang.html">
                                                            <span lang="menusinhvien-42">Đề xuất cập nhật thông tin ngân hàng</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" title>
                                                    <i className="fa fa-mortar-board" aria-hidden="true" />
                                                    <span lang="groupmenu-hoctap">HỌC TẬP</span>
                                                </a>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/ket-qua-hoc-tap.html">
                                                            <span lang="menusinhvien-7">Kết quả học tập</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/lich-theo-tuan.html">
                                                            <span lang="menusinhvien-8">Lịch theo tuần</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/lich-theo-tien-do.html">
                                                            <span lang="menusinhvien-9">Lịch theo tiến độ</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/lich-hoc-lop-danh-nghia.html">
                                                            <span lang="menusinhvien-43">Lịch học lớp danh nghĩa</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a onClick={() => {
                                                    navigate(`${path.ROOT}`)
                                                }} href="javascript:void(0)" title>
                                                    <i className="fa fa-check-square-o" aria-hidden="true" />
                                                    <span lang="groupmenu-dangkyhocphan">ĐĂNG KÝ HỌC PHẦN</span>
                                                </a>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/chuong-trinh-khung.html">
                                                            <span lang="menusinhvien-14">Chương trình khung</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a target="_blank" href="https://dkhp.iuh.edu.vn">
                                                            <span lang="menusinhvien-15">Đăng ký học phần</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" title>
                                                    <i className="fa fa-cc-visa" aria-hidden="true" />
                                                    <span lang="groupmenu-hocphi">HỌC PHÍ</span>
                                                </a>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/cong-no-sinh-vien.html">
                                                            <span lang="menusinhvien-20">Tra cứu công nợ</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/thanh-toan-truc-tuyen.html">
                                                            <span lang="menusinhvien-21">Thanh toán trực tuyến</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <ul className="submenu" style={{}}>
                                                    <li style={{}}>
                                                        <a href="/phieu-thu-tong-hop.html">
                                                            <span lang="menusinhvien-23">Phiếu thu tổng hợp</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a href="https://ascvn.com.vn/huong-dan-app-mobile-danh-cho-sinh-vien.html" target="_blank">
                                    <img style={{ marginTop: '10px' }} src="https://ascvn.com.vn/content/images/appsinhvienqr.png" />
                                </a>
                            </div>


                            <div className="col-md-10 col-xs-12">
                                <div className="box-df" >
                                    <div className="portlet"  >
                                        <div className="portlet-title" style={{ height: '90px', gap: '10px' }}>
                                            <div className="caption" style={{ color: '#667580' }}>
                                                <span className="caption-subject bold" lang="lichtheotuan-pagetitle">Lịch học, lịch thi theo tuần</span>
                                            </div>
                                            <br />
                                            <div style={{ width: '785px', marginTop: '20px' }} className="actions">
                                                <div className="mt-radio-inline" style={{ width: '255px', float: 'left', padding: '5px 0px 0px 0px' }}>
                                                    <label className="mt-radio" style={{ paddingLeft: '25px', marginBottom: '0px' }}>
                                                        <input id="rdoLoaiLich" name="rdoLoaiLich" type="radio" defaultValue={0} />
                                                        <label lang="lichtheotuan-tatca">Tất cả</label>
                                                        <span />
                                                    </label>
                                                    <label className="mt-radio" style={{ paddingLeft: '25px', marginBottom: '0px' }}>
                                                        <input defaultChecked="checked" id="rdoLoaiLich" name="rdoLoaiLich" type="radio" defaultValue={1} />
                                                        <label lang="lichtheotuan-lichhoc">Lịch học</label>
                                                        <span />
                                                    </label>
                                                    <label className="mt-radio" style={{ paddingLeft: '25px', marginBottom: '0px' }}>
                                                        <input id="rdoLoaiLich" name="rdoLoaiLich" type="radio" defaultValue={2} />
                                                        <label lang="lichtheotuan-lichthi">Lịch thi</label>
                                                        <span />
                                                    </label>
                                                </div>
                                                <div style={{}}>
                                                    <input id="dateNgayXemLich" name="dateNgayXemLich" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                                    <a onClick={() => {
                                                        setSelectedDate(formatDate(new Date()));
                                                    }} style={{ marginLeft: '8px' }} className="btn btn-action" id="btn_HienTai" lang="lichtheotuan-hientai-button">
                                                        <i className="fa fa-calendar" aria-hidden="true" />
                                                        Hiện tại
                                                    </a>
                                                    <a style={{ marginLeft: '8px' }} className="btn btn-action" id="btn_InLich" onclick="PrintElem()" lang="lichtheotuan-print-button">
                                                        <i className="fa fa-print" aria-hidden="true" />
                                                        In lịch
                                                    </a>
                                                    <a style={{ marginLeft: '8px' }} onClick={handlePrevWeek} className="btn btn-action" id="btn_TroVe" lang="lichtheotuan-back-button">
                                                        <i className="fa fa-angle-left" aria-hidden="true" />
                                                        Trở về
                                                    </a>
                                                    <a style={{ marginLeft: '8px' }} onClick={handleNextWeek} className="btn btn-action" id="btn_Tiep" lang="lichtheotuan-next-button">
                                                        Tiếp
                                                        <i className="fa fa-angle-right" aria-hidden="true" />
                                                    </a>
                                                    {/* <a href="javascript:;" className="btn btn-action" id="full-table">
                                                    <span className="glyphicon glyphicon-resize-full" aria-hidden="true" />
                                                </a> */}
                                                </div>

                                            </div>
                                        </div>
                                        <div id="viewLichTheoTuan">
                                            <div className="table-responsive">
                                                <table className="fl-table table table-bordered text-center no-footer dtr-inline" width="100%" role="grid">
                                                    <thead>

                                                        <tr>
                                                            <th style={{ fontWeight: 'bold', fontSize: '17px' }} lang="lichtheotuan-cahoc">Ca học</th>
                                                            {weekDates.map((date, index) => (
                                                                <th style={{ fontWeight: 'bold', fontSize: '17px' }} key={index}> <span lang="lichtheotuan-mon">Thứ {index + 2}</span><br />{formatDate1(date)}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>


                                                        <tr role="row">
                                                            <td style={{ height: '150px' }} lang="lichtheotuan-buoisang"><b>Sáng</b></td>
                                                            {weekDates.map((date, index) => (
                                                                <td style={{ height: '150px' }}>
                                                                    {filterDataForDay(formatDate1(date), "Sang")}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr role="row">
                                                            <td style={{ height: '150px' }} lang="lichtheotuan-buoisang"><b>Chiều</b></td>
                                                            {weekDates.map((date, index) => (
                                                                <td style={{ height: '150px' }}>
                                                                    {filterDataForDay(formatDate1(date), "Chieu")}

                                                                </td>
                                                            ))}
                                                        </tr>
                                                        <tr role="row">
                                                            <td style={{ height: '150px' }} lang="lichtheotuan-buoisang"><b>Tối</b></td>
                                                            {weekDates.map((date, index) => (
                                                                <td style={{ height: '150px' }}>
                                                                    {filterDataForDay(formatDate1(date), "Toi")}

                                                                </td>

                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="tableGC">
                                                <ul>
                                                    <li>
                                                        <span className="colorSTLichHoc" /><label lang="lichtheotuan-lichhoc">Lịch học lý thuyết</label>
                                                    </li>
                                                    <li>
                                                        <span className="colorSTLichHoc" style={{ backgroundColor: '#71cb35', borderColor: '#c9d0db' }} /><label lang="lichtheotuan-lichhoconline">Lịch học thực hành</label>
                                                    </li>
                                                    <li>
                                                        <span className="colorSTLichHoc" style={{ backgroundColor: '#92d6ff', borderColor: '#1da1f2' }} /><label lang="lichtheotuan-lichhoconline">Lịch học trực tuyến</label>
                                                    </li>
                                                    <li>
                                                        <span className="colorSTLichThi" /><label lang="lichtheotuan-lichthi">Lịch thi</label>
                                                    </li>
                                                    <li>
                                                        <span className="colorSTTamNgung" /><label lang="lichtheotuan-lichtamngung">Lịch tạm ngưng</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <input id="firstDatePrevOffWeek" name="firstDatePrevOffWeek" type="hidden" defaultValue="06/05/2024" />
                                            <input id="firstDateOffWeek" name="firstDateOffWeek" type="hidden" defaultValue="13/05/2024" />
                                            <input id="firstDateNextOffWeek" name="firstDateNextOffWeek" type="hidden" defaultValue="20/05/2024" />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LichHoc;
