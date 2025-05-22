package fit.iuh.edu.vn.dkhp_service.configs;


import fit.iuh.edu.vn.dkhp_service.entities.*;
import fit.iuh.edu.vn.dkhp_service.enums.*;
import fit.iuh.edu.vn.dkhp_service.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSampleConfig {
    private final BangDiemRepository bangDiemRepository;
    private final ChuongTrinhKhungRepository chuongTrinhKhungRepository;
    private final GiangVienLopHocPhanRepository giangVienLopHocPhanRepository;
    private final GiangVienRepository giangVienRepository;
    private final KhoaHocRepository khoaHocRepository;
    private final KhoaRepository khoaRepository;
    private final LoaiSinhVienRepository loaiSinhVienRepository;
    private final LopHocDanhNghiaRepository lopHocDanhNghiaRepository;
    private final LopHocPhanRepository lopHocPhanRepository;
    private final MonHocChuongTrinhKhungRepository monHocChuongTrinhKhungRepository;
    private final MonHocRepository monHocRepository;
    private final MonHocTienQuyetRepository monHocTienQuyetRepository;
    private final NganhHocRepository nganhHocRepository;
    private final SinhVienRepository sinhVienRepository;
    private final LichHocTHRepository lichHocTHRepository;

    @Bean
    CommandLineRunner test() {
        return args -> {
            List<MonHocChuongTrinhKhung> monHocChuongTrinhKhungs = monHocChuongTrinhKhungRepository.findMonHocChuongTrinhKhungByMssv(20111601);
            for (MonHocChuongTrinhKhung monHocChuongTrinhKhung : monHocChuongTrinhKhungs) {
                System.out.println("Môn học chương trình khung:" + monHocChuongTrinhKhung);
            }
        };
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // insert Khoa
            Khoa khoaCNTT = new Khoa("Công nghệ thông tin");
            Khoa khoaCK = new Khoa("Cơ khí");
            Khoa khoaLuat = new Khoa("Luật");
            Khoa khoaHoa = new Khoa("Hóa");
            Khoa khoaDongLuc = new Khoa("Động lực");
            Khoa khoaThucPham = new Khoa("Thực phẩm");
            Khoa khoaThoiTrang = new Khoa("Thời trang");

            khoaRepository.save(khoaCNTT);
            khoaRepository.save(khoaCK);
            khoaRepository.save(khoaLuat);
            khoaRepository.save(khoaHoa);
            khoaRepository.save(khoaDongLuc);
            khoaRepository.save(khoaThucPham);
            khoaRepository.save(khoaThoiTrang);

            // insert Nganh hoc
            NganhHoc nganhKTPM = new NganhHoc("Kỹ thuật phần mềm", khoaCNTT);
            NganhHoc nganhHTTT = new NganhHoc("Hệ thống thông tin", khoaCNTT);
            NganhHoc nganhATTT = new NganhHoc("An toàn thông tin", khoaCNTT);
            NganhHoc nganhKHDL = new NganhHoc("Khoa học dữ liệu", khoaCNTT);
            NganhHoc oto = new NganhHoc("Ô tô", khoaDongLuc);
            NganhHoc nganhHocKT = new NganhHoc("Tài chính ngân hàng", khoaLuat);
            nganhHocRepository.save(nganhKTPM);
            nganhHocRepository.save(nganhHTTT);
            nganhHocRepository.save(nganhATTT);
            nganhHocRepository.save(nganhKHDL);
            nganhHocRepository.save(nganhHocKT);
            nganhHocRepository.save(oto);

            // insert Giang vien
            GiangVien gv1 = new GiangVien(
                    "Võ Văn Hải",
                    "TS",
                    "0339717894",
                    "666 Quang Trung, Gò vấp", "Nam",
                    LocalDateTime.of(1986, 6, 13, 0, 0),
                    khoaCNTT
            );
            GiangVien gv2 = new GiangVien(
                    "Nguyễn Văn A",
                    "TS",
                    "0339717894",
                    "111 Quang Trung, Gò vấp", "Nam",
                    LocalDateTime.of(2002, 9, 18, 0, 0),
                    khoaCNTT
            );
            GiangVien gv3 = new GiangVien(
                    "Tôn Long Phước",
                    "TS",
                    "0339717899",
                    "111 Quang Trung, Gò vấp", "Nam",
                    LocalDateTime.of(1983, 2, 2, 0, 0),
                    khoaCNTT
            );
            GiangVien gv4 = new GiangVien(
                    "Nguyễn Thị Hoàng Khánh",
                    "TS",
                    "0339717891",
                    "222 Quang Trung, Gò vấp", "Nữ",
                    LocalDateTime.of(1988, 6, 13, 0, 0),
                    khoaCNTT
            );
            GiangVien gv5 = new GiangVien(
                    "Nguyễn Thị B",
                    "TS",
                    "0339717891",
                    "222 Quang Trung, Gò vấp", "Nữ",
                    LocalDateTime.of(1988, 6, 13, 0, 0),
                    khoaLuat
            );
            giangVienRepository.save(gv1);
            giangVienRepository.save(gv2);
            giangVienRepository.save(gv3);
            giangVienRepository.save(gv4);
            giangVienRepository.save(gv5);

            // insert Khoa hoc
            KhoaHoc khoa14 = new KhoaHoc("K14", 2018);
            KhoaHoc khoa15 = new KhoaHoc("K15", 2019);
            KhoaHoc khoa16 = new KhoaHoc("K16", 2020);
            KhoaHoc khoa17 = new KhoaHoc("K17", 2021);
            KhoaHoc khoa18 = new KhoaHoc("K18", 2022);
            khoaHocRepository.save(khoa16);
            khoaHocRepository.save(khoa17);
            khoaHocRepository.save(khoa18);
            khoaHocRepository.save(khoa14);
            khoaHocRepository.save(khoa15);

            // insert Chuong trinh khung
            ChuongTrinhKhung chuongTrinhKhung1 = new ChuongTrinhKhung("9", nganhKTPM, khoa16);
            ChuongTrinhKhung chuongTrinhKhung2 = new ChuongTrinhKhung("9", nganhKTPM, khoa17);
            ChuongTrinhKhung chuongTrinhKhung4 = new ChuongTrinhKhung("9", nganhKTPM, khoa15);
            ChuongTrinhKhung chuongTrinhKhung3 = new ChuongTrinhKhung("9", nganhHocKT, khoa18);
            chuongTrinhKhungRepository.save(chuongTrinhKhung1);
            chuongTrinhKhungRepository.save(chuongTrinhKhung2);
            chuongTrinhKhungRepository.save(chuongTrinhKhung3);
            chuongTrinhKhungRepository.save(chuongTrinhKhung4);
            // insert Loai sinh vien
            LoaiSinhVien loaiSinhVien1 = new LoaiSinhVien(TenLoai.DANG_HOC);
            LoaiSinhVien loaiSinhVien2 = new LoaiSinhVien(TenLoai.THOI_HOC);
            LoaiSinhVien loaiSinhVien3 = new LoaiSinhVien(TenLoai.DA_TOT_NGHIEP);
            loaiSinhVienRepository.save(loaiSinhVien1);
            loaiSinhVienRepository.save(loaiSinhVien2);
            loaiSinhVienRepository.save(loaiSinhVien3);
            // insert Lop hoc danh nghia
            LopHocDanhNghia lopHocDanhNghia1 = new LopHocDanhNghia("DHKTPM16A",
                    BacDaoTao.DAI_HOC,
                    "Chính quy",
                    gv1,
                    nganhKTPM,
                    khoa16
            );
            LopHocDanhNghia lopHocDanhNghia2 = new LopHocDanhNghia("DKKTTC17B",
                    BacDaoTao.DAI_HOC,
                    "Chính quy",
                    gv2,
                    nganhHocKT,
                    khoa17
            );
            LopHocDanhNghia lopHocDanhNghia3 = new LopHocDanhNghia("DKTPM17A",
                    BacDaoTao.DAI_HOC,
                    "Chính quy",
                    gv1,
                    nganhKTPM,
                    khoa17
            );
            LopHocDanhNghia lopHocDanhNghia4 = new LopHocDanhNghia("DHKTPM16B",
                    BacDaoTao.DAI_HOC,
                    "Chính quy",
                    gv3,
                    nganhKTPM,
                    khoa16
            );
            lopHocDanhNghiaRepository.save(lopHocDanhNghia1);
            lopHocDanhNghiaRepository.save(lopHocDanhNghia2);
            lopHocDanhNghiaRepository.save(lopHocDanhNghia3);
            lopHocDanhNghiaRepository.save(lopHocDanhNghia4);
            // insert Mon hoc
            MonHoc monHocLTHDT = new MonHoc("Lập trình hướng đối tượng", khoaCNTT);
            MonHoc monHocCTDLvaGT = new MonHoc("Cấu trúc dữ liệu và giải thuật", khoaCNTT);
            MonHoc monhocPTvaTKHT = new MonHoc("Phân tích và thiết kế hệ thống", khoaCNTT);
            MonHoc monKienTruc = new MonHoc("Kiến trúc phần mềm", khoaCNTT);
            MonHoc monKTLT = new MonHoc("Kỹ thuật lập trình", khoaCNTT);
            MonHoc monLTDT = new MonHoc("Lý thuyết đồ thị", khoaCNTT);
            MonHoc monMMT = new MonHoc("Mạng máy tính", khoaCNTT);
            MonHoc monhocCNM = new MonHoc("Công nghệ mới", khoaCNTT);
            MonHoc monHocWWW = new MonHoc("Lập trình WWW", khoaCNTT);
            MonHoc monHoc2 = new MonHoc("Luật kinh tế", khoaLuat);
            MonHoc monHocWeb = new MonHoc("Lập trình Web", khoaCNTT);
            MonHoc monHocAI = new MonHoc("Trí tuệ nhân tạo", khoaCNTT);
            MonHoc monHocMachineLearning = new MonHoc("Học máy", khoaCNTT);
            MonHoc monHocDatabase = new MonHoc("Cơ sở dữ liệu", khoaCNTT);
            MonHoc monHocOS = new MonHoc("Hệ điều hành", khoaCNTT);
            MonHoc monHocNetworkSecurity = new MonHoc("An ninh mạng", khoaCNTT);
            MonHoc monHocSoftwareEng = new MonHoc("Kỹ thuật phần mềm", khoaCNTT);
            MonHoc monHocMobileDev = new MonHoc("Phát triển ứng dụng di động", khoaCNTT);
            MonHoc monHocCloud = new MonHoc("Điện toán đám mây", khoaCNTT);
            MonHoc monHocBigData = new MonHoc("Phân tích dữ liệu lớn", khoaCNTT);

// Lưu các môn học mới vào repository
            monHocRepository.save(monHocWeb);
            monHocRepository.save(monHocAI);
            monHocRepository.save(monHocMachineLearning);
            monHocRepository.save(monHocDatabase);
            monHocRepository.save(monHocOS);
            monHocRepository.save(monHocNetworkSecurity);
            monHocRepository.save(monHocSoftwareEng);
            monHocRepository.save(monHocMobileDev);
            monHocRepository.save(monHocCloud);
            monHocRepository.save(monHocBigData);
            monHocRepository.save(monHocLTHDT);
            monHocRepository.save(monHocCTDLvaGT);
            monHocRepository.save(monhocPTvaTKHT);
            monHocRepository.save(monhocCNM);
            monHocRepository.save(monHocWWW);
            monHocRepository.save(monHoc2);
            monHocRepository.save(monKienTruc);
            monHocRepository.save(monKTLT);
            monHocRepository.save(monLTDT);
            monHocRepository.save(monMMT);
            // insert Sinh vien
            SinhVien sv1 = new SinhVien(20108521,
                    "123456",
                    "Bùi Ngọc Thu",
                    LocalDateTime.of(2002, 9, 14, 0, 0),
                    "121 Quang Trung, Gò vấp ",
                    "Hải Phòng",
                    "0339717894",
                    "Nam",
                    "https://th.bing.com/th/id/R.e089a43cd9546701b048d2ab47bd45a9?rik=YUUjgVi2gtRQQw&pid=ImgRaw&r=0",
                    "bohiepdzai@gmail.com",
                    loaiSinhVien1,
                    lopHocDanhNghia1
            );
            SinhVien sv2 = new SinhVien(21082761,
                    "123456",
                    "Phạm Anh Khoa",
                    LocalDateTime.of(2002, 6, 13, 0, 0),
                    "121 Lê Đức Thọ, Gò Vấp",
                    "Tây Ninh",
                    "0974067552",
                    "Nam",
                    "https://th.bing.com/th/id/OIP.mIf9ZAHku6YCPc4qT14avgHaK0?rs=1&pid=ImgDetMain",
                    "phamanhkhoa999@gmail.com",
                    loaiSinhVien1,
                    lopHocDanhNghia2
            );
            SinhVien sv3 = new SinhVien(20078481,
                    "123456",
                    "Trương Tuấn Kiệt",
                    LocalDateTime.of(2002, 1, 1, 0, 0),
                    "121 Lê Đức Thọ, Gò Vấp",
                    "Tây Nguyên",
                    "0974067555",
                    "Nam",
                    "https://th.bing.com/th/id/R.06dfda1237b260bd72aa998b6679d0eb?rik=N0Phchug7q3nTg&pid=ImgRaw&r=0",
                    "tkiet999@gmail.com",
                    loaiSinhVien1,
                    lopHocDanhNghia3
            );
            sinhVienRepository.save(sv1);
            sinhVienRepository.save(sv2);
            sinhVienRepository.save(sv3);
            // insert Lop hoc phan
            LopHocPhan lopKienTrucKi3_1 = new LopHocPhan("DHKTPM16C",
                    80,
                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    18,
                    monKienTruc
            );
            LopHocPhan lopKienTrucKi3_2 = new LopHocPhan("DHHTTT16C",
                    80,
                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    18,
                    monKienTruc
            );
            LopHocPhan lopKienTrucKi2 = new LopHocPhan("DHKTPM16C",
                    80,
                    TrangThaiLop.DA_KHOA,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    18,
                    monKienTruc
            );
            LopHocPhan lopAIKi3_1 = new LopHocPhan("DHKTPM16A",
                    80,
                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    18,
                    monHocAI
            );
            LopHocPhan lopAIKi3_2 = new LopHocPhan("DHKTPM16B",
                    80,
                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    38,
                    monHocAI
            );
            LopHocPhan lopAIKi2 = new LopHocPhan("DHKTPM16B",
                    80,
                    TrangThaiLop.DA_KHOA,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    28,
                    monHocAI
            );
            LopHocPhan lopCloudKi3 = new LopHocPhan("DHKTPM16B",
                    80,
                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
                    "HK3 (2024-2025)",
                    1200000,
                    900000,
                    1,
                    3,
                    18,
                    monHocCloud
            );
            LopHocPhan lopHocCloudK2 = new LopHocPhan("DHCTDL16A",
                    80,
                    TrangThaiLop.DA_KHOA,
                    "HK3 (2024-2025)",
                    800000,
                    900000,
                    1,
                    3,
                    18,
                    monHocCloud
            );
            LopHocPhan lopWWWKi3 = new LopHocPhan("DHKTPM16D",
                    60,
                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
                    "HK3 (2024-2025)",
                    1200000,
                    300000,
                    1,
                    3,
                    50,
                    monHocWWW
            );
            LopHocPhan lopWWWKi2 = new LopHocPhan("DHKTPM16D",
                    60,
                    TrangThaiLop.DA_KHOA,
                    "HK3 (2024-2025)",
                    1200000,
                    300000,
                    1,
                    3,
                    50,
                    monHocWWW
            );
//            LopHocPhan lopHocPhan4 = new LopHocPhan("DHKTPM16E",
//                    80,
//                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
//                    "HK3 (2023-2024)",
//                    1500000,
//                    500000,
//                    1,
//                    3,
//                    20,
//                    monKTLT
//            );
//            LopHocPhan lopHocPhan5 = new LopHocPhan("DHKTPM16F",
//                    80,
//                    TrangThaiLop.CHO_SINH_VIEN_DANG_KY,
//                    "HK3 (2023-2024)",
//                    900000,
//                    500000,
//                    1,
//                    3,
//                    50,
//                    monhocCNM
//            );
//            LopHocPhan lopHocPhan8 = new LopHocPhan("DHKTPM16F",
//                    80,
//                    TrangThaiLop.DA_KHOA,
//                    "HK2 (2023-2024)",
//                    900000,
//                    500000,
//                    1,
//                    3,
//                    50,
//                    monhocCNM
//            );
//            LopHocPhan lopHocPhan9 = new LopHocPhan("DHKTPM16F",
//                    80,
//                    TrangThaiLop.DA_KHOA,
//                    "HK2 (2023-2024)",
//                    900000,
//                    500000,
//                    1,
//                    3,
//                    50,
//                    monMMT
//            );
//            LopHocPhan lopHocPhan10 = new LopHocPhan("DHKTPM16F",
//                    80,
//                    TrangThaiLop.DA_KHOA,
//                    "HK2 (2023-2024)",
//                    900000,
//                    500000,
//                    1,
//                    3,
//                    50,
//                    monKienTruc
//            );
            lopHocPhanRepository.save(lopCloudKi3);
            lopHocPhanRepository.save(lopAIKi2);
            lopHocPhanRepository.save(lopAIKi3_2);
            lopHocPhanRepository.save(lopKienTrucKi3_2);
            lopHocPhanRepository.save(lopAIKi3_1);
            lopHocPhanRepository.save(lopHocCloudK2);
            lopHocPhanRepository.save(lopWWWKi2);
            lopHocPhanRepository.save(lopWWWKi3);
            lopHocPhanRepository.save(lopKienTrucKi3_1);
            lopHocPhanRepository.save(lopKienTrucKi2);

            // insert Bang diem
//            BangDiem bangDiem1 = new BangDiem(7, 5, 4, 6, 7, TrangThai.DAT,
//                    LocalDateTime.of(2023, 5, 14, 0, 0),
//                    TrangThaiHocPhi.DA_DONG,
//                    sv1,
//                    lopHocPhan1,
//                    "1"
//            );
//            BangDiem bangDiem2 = new BangDiem(10, 9, 9, 9, 9, TrangThai.DAT,
//                    LocalDateTime.of(2022, 7, 14, 0, 0),
//                    TrangThaiHocPhi.DA_DONG,
//                    sv2,
//                    lopHocPhan1,
//                    "1"
//            );
//            bangDiemRepository.save(bangDiem1);
//            bangDiemRepository.save(bangDiem2);
            // insert Mon hoc-Chuong trinh khung
            MonHocChuongTrinhKhung monHocChuongTrinhKhung1 = new MonHocChuongTrinhKhung(1,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocLTHDT,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung2 = new MonHocChuongTrinhKhung(1,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocCTDLvaGT,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung3 = new MonHocChuongTrinhKhung(2,
                    LoaiMonHoc.TUY_CHON,
                    1,
                    3,
                    monhocPTvaTKHT,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung4 = new MonHocChuongTrinhKhung(2,
                    LoaiMonHoc.TUY_CHON,
                    1,
                    3,
                    monKienTruc,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung5 = new MonHocChuongTrinhKhung(3,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monKTLT,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung6 = new MonHocChuongTrinhKhung(3,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monLTDT,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung7 = new MonHocChuongTrinhKhung(4,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monMMT,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung8 = new MonHocChuongTrinhKhung(4,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monhocCNM,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung9 = new MonHocChuongTrinhKhung(5,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocWWW,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung10 = new MonHocChuongTrinhKhung(5,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocWeb,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung11 = new MonHocChuongTrinhKhung(6,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocAI,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung12 = new MonHocChuongTrinhKhung(6,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocMachineLearning,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung13 = new MonHocChuongTrinhKhung(7,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocDatabase,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung14 = new MonHocChuongTrinhKhung(7,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocOS,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung15 = new MonHocChuongTrinhKhung(8,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocNetworkSecurity,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung16 = new MonHocChuongTrinhKhung(8,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocSoftwareEng,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung17 = new MonHocChuongTrinhKhung(9,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocMobileDev,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung18 = new MonHocChuongTrinhKhung(1,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocCloud,
                    chuongTrinhKhung1
            );
            MonHocChuongTrinhKhung monHocChuongTrinhKhung19 = new MonHocChuongTrinhKhung(2,
                    LoaiMonHoc.BAT_BUOC,
                    1,
                    3,
                    monHocBigData,
                    chuongTrinhKhung1
            );
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung1);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung2);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung3);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung4);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung5);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung6);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung7);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung8);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung9);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung10);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung11);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung12);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung13);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung14);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung15);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung16);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung17);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung18);
            monHocChuongTrinhKhungRepository.save(monHocChuongTrinhKhung19);

            // insert Mon hoc tien quyet
            MonHocTienQuyet monHocTienQuyet1 = new MonHocTienQuyet(monHocLTHDT, monHocWWW);
            MonHocTienQuyet monHocTienQuyet2 = new MonHocTienQuyet(monHocLTHDT, monHocCTDLvaGT);
            monHocTienQuyetRepository.save(monHocTienQuyet1);
            monHocTienQuyetRepository.save(monHocTienQuyet2);

            // Insert giang vien lop hoc phan và Lop hoc thuc hanh: insert Lich hoc thuc hanh sau do insert giang vien lop hoc phan
            List<String> lichHocTHKienTrucKi3_1 = new ArrayList<>();
            lichHocTHKienTrucKi3_1.add("Thứ 3 (T7 - T9)_21/05/2024");
            lichHocTHKienTrucKi3_1.add("Thứ 5 (T1 - T3)_23/05/2024");
            lichHocTHKienTrucKi3_1.add("Thứ 6 (T4 - T6)_24/05/2024");
            lichHocTHKienTrucKi3_1.add("Thứ 3 (T7 - T9)_28/05/2024");
            lichHocTHKienTrucKi3_1.add("Thứ 5 (T1 - T3)_30/05/2024");
            lichHocTHKienTrucKi3_1.add("Thứ 6 (T4 - T6)_31/05/2024");

            List<String> lichHocTHKienTrucKi3_2 = new ArrayList<>();
            lichHocTHKienTrucKi3_2.add("Thứ 3 (T7 - T9)_21/05/2024");
            lichHocTHKienTrucKi3_2.add("Thứ 5 (T1 - T3)_23/05/2024");
            lichHocTHKienTrucKi3_2.add("Thứ 6 (T4 - T6)_24/05/2024");
            lichHocTHKienTrucKi3_2.add("Thứ 3 (T7 - T9)_28/05/2024");
            lichHocTHKienTrucKi3_2.add("Thứ 5 (T1 - T3)_30/05/2024");
            lichHocTHKienTrucKi3_2.add("Thứ 6 (T4 - T6)_31/05/2024");

            LichHocTH lichTHKienTrucKi3_1 = new LichHocTH(
                    "1",
                    "Tructiep_X_X8.01",
                    lichHocTHKienTrucKi3_1
            );

            LichHocTH lichTHKienTrucKi3_2 = new LichHocTH(
                    "2",
                    "Tructiep_X_X11.01",
                    lichHocTHKienTrucKi3_2
            );
            List<String> lichLTKienTrucKi3 = new ArrayList<>();
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_20/05/2024");
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_27/05/2024");
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_03/06/2024");
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_10/06/2024");

            List<LichHocTH> lichHocTHKienTrucList1 = new ArrayList<>();
            lichHocTHKienTrucList1.add(lichTHKienTrucKi3_1);
            lichHocTHKienTrucList1.add(lichTHKienTrucKi3_2);

            GiangVienLopHocPhan giangVienLopHocPhan1 = new GiangVienLopHocPhan(
                    LoaiLichHoc.TH,
                    "Tructiep_X_X8.01",
                    lichLTKienTrucKi3,
                    LocalDateTime.of(2024, 6, 13, 2, 1),
                    gv1,
                    lopKienTrucKi3_1,
                    lichHocTHKienTrucList1
            );

            lichTHKienTrucKi3_1.setGiangVienLopHocPhan(giangVienLopHocPhan1);
            lichTHKienTrucKi3_2.setGiangVienLopHocPhan(giangVienLopHocPhan1);

            giangVienLopHocPhanRepository.save(giangVienLopHocPhan1);

            List<String> lichHocLapTrinhDoiTuongKi3_1 = new ArrayList<>();
            lichHocLapTrinhDoiTuongKi3_1.add("Thứ 2 (T1 - T3)_20/05/2024");
            lichHocLapTrinhDoiTuongKi3_1.add("Thứ 4 (T4 - T6)_22/05/2024");
            lichHocLapTrinhDoiTuongKi3_1.add("Thứ 6 (T7 - T9)_24/05/2024");
            lichHocLapTrinhDoiTuongKi3_1.add("Thứ 2 (T7 - T9)_27/05/2024");
            lichHocLapTrinhDoiTuongKi3_1.add("Thứ 4 (T1 - T3)_29/05/2024");
            lichHocLapTrinhDoiTuongKi3_1.add("Thứ 6 (T4 - T6)_31/05/2024");


            List<String> lichHocLapTrinhDoiTuongKi3_2 = new ArrayList<>();
            lichHocLapTrinhDoiTuongKi3_2.add("Thứ 2 (T1 - T3)_20/05/2024");
            lichHocLapTrinhDoiTuongKi3_2.add("Thứ 4 (T4 - T6)_22/05/2024");
            lichHocLapTrinhDoiTuongKi3_2.add("Thứ 6 (T7 - T9)_24/05/2024");
            lichHocLapTrinhDoiTuongKi3_2.add("Thứ 2 (T7 - T9)_27/05/2024");
            lichHocLapTrinhDoiTuongKi3_2.add("Thứ 4 (T1 - T3)_29/05/2024");
            lichHocLapTrinhDoiTuongKi3_2.add("Thứ 6 (T4 - T6)_31/05/2024");

            LichHocTH lichTHLapTrinhDoiTuongKi3_1 = new LichHocTH(
                    "1",
                    "Tructiep_X_X8.01",
                    lichHocLapTrinhDoiTuongKi3_1
            );

            LichHocTH lichTHLapTrinhDoiTuongKi3_2 = new LichHocTH(
                    "2",
                    "Tructiep_X_X11.01",
                    lichHocLapTrinhDoiTuongKi3_2
            );
            List<String> lichLTLapTrinhDoiTuongKi3 = new ArrayList<>();
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_20/05/2024");
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_27/05/2024");
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_03/06/2024");
            lichLTKienTrucKi3.add("Thứ 2(T1-3)_10/06/2024");

            List<LichHocTH> lichHocTHLapTrinhDoiTuongList1 = new ArrayList<>();
            lichHocTHLapTrinhDoiTuongList1.add(lichTHLapTrinhDoiTuongKi3_1);
            lichHocTHLapTrinhDoiTuongList1.add(lichTHLapTrinhDoiTuongKi3_2);

            GiangVienLopHocPhan giangVienLopHocPhan2 = new GiangVienLopHocPhan(
                    LoaiLichHoc.TH,
                    "Tructiep_X_X8.01",
                    lichLTLapTrinhDoiTuongKi3,
                    LocalDateTime.of(2024, 6, 13, 2, 1),
                    gv2,
                    lopAIKi3_1,
                    lichHocTHLapTrinhDoiTuongList1
            );

            lichTHLapTrinhDoiTuongKi3_1.setGiangVienLopHocPhan(giangVienLopHocPhan2);
            lichTHLapTrinhDoiTuongKi3_2.setGiangVienLopHocPhan(giangVienLopHocPhan2);

            giangVienLopHocPhanRepository.save(giangVienLopHocPhan2);
        };
    }

}