package fit.iuh.edu.vn.dkhp_service.controllers;


import fit.iuh.edu.vn.dkhp_service.dtos.*;
import fit.iuh.edu.vn.dkhp_service.entities.*;
import fit.iuh.edu.vn.dkhp_service.repositories.BangDiemRepository;
import fit.iuh.edu.vn.dkhp_service.repositories.LopHocPhanRepository;
import fit.iuh.edu.vn.dkhp_service.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DKHPController {

    private final MonHocCTKService monHocCTKService;
    private final LopHocPhanService lopHocPhanService;
    private final GiangVienLopHocPhanService giangVienLopHocPhanService;
    private final BangDiemService bangDiemService;
    public final BangDiemRepository bangDiemRepository;
    public final LopHocPhanRepository lopHocPhanRepository;

    @GetMapping("/getMonHocCTK")
    private ResponseEntity<List<MonHocCTK_DTO>> getMonHocCTK(@RequestParam long mssv) {
        List<MonHocChuongTrinhKhung> monHocChuongTrinhKhungList = monHocCTKService.getMonHocCTKByMssv(mssv);
        if (!monHocChuongTrinhKhungList.isEmpty()) {
            List<MonHocCTK_DTO> monHocCTK_dtos = new ArrayList<>();
            for (MonHocChuongTrinhKhung monHocChuongTrinhKhung : monHocChuongTrinhKhungList) {
                String loaiMonHoc = "";
                switch (monHocChuongTrinhKhung.getLoaiMonHoc().getValue()) {
                    case 0 -> loaiMonHoc += "Bắt buộc";
                    case 1 -> loaiMonHoc += "Tùy chọn";
                }
                MonHoc_DTO monHocDto;
                if (!monHocChuongTrinhKhung.getMonHoc().getMonHocTienQuyets().isEmpty()) {
                    monHocDto = new MonHoc_DTO(monHocChuongTrinhKhung.getMonHoc().getMaMonHoc(),
                            monHocChuongTrinhKhung.getMonHoc().getTenMonHoc(),
                            monHocChuongTrinhKhung.getChuongTrinhKhung().getKhoaHoc().getMaKhoaHoc(),
                            monHocChuongTrinhKhung.getMonHoc().getMonHocTienQuyets().get(0).getMaMonHocTienQuyet().getMaMonHoc()
                    );
                } else {
                    monHocDto = new MonHoc_DTO(monHocChuongTrinhKhung.getMonHoc().getMaMonHoc(),
                            monHocChuongTrinhKhung.getMonHoc().getTenMonHoc(),
                            monHocChuongTrinhKhung.getChuongTrinhKhung().getKhoaHoc().getMaKhoaHoc());
                }
                NganhHoc_DTO nganhHoc_dto = new NganhHoc_DTO(
                        monHocChuongTrinhKhung.getChuongTrinhKhung().getNganhHoc().getMaNganhHoc(),
                        monHocChuongTrinhKhung.getChuongTrinhKhung().getNganhHoc().getTenNganhHoc()
                );
                KhoaHoc_DTO khoaHoc_dto = new KhoaHoc_DTO(monHocChuongTrinhKhung.getChuongTrinhKhung().getKhoaHoc().getMaKhoaHoc(),
                        monHocChuongTrinhKhung.getChuongTrinhKhung().getKhoaHoc().getTenKhoaHoc(),
                        monHocChuongTrinhKhung.getChuongTrinhKhung().getKhoaHoc().getNamBatDauHoc()
                );
                ChuongTrinhKhung_DTO chuongTrinhKhung_dto = new ChuongTrinhKhung_DTO(monHocChuongTrinhKhung.getChuongTrinhKhung().getMaChuongTrinhKhung(),
                        nganhHoc_dto,
                        khoaHoc_dto,
                        monHocChuongTrinhKhung.getChuongTrinhKhung().getThoiGianHoc()
                );
                MonHocCTK_DTO monHocCTK_dto = new MonHocCTK_DTO(monHocDto,
                        chuongTrinhKhung_dto,
                        monHocChuongTrinhKhung.getHocKy(),
                        loaiMonHoc,
                        monHocChuongTrinhKhung.getSoTinChiLyThuyet(),
                        monHocChuongTrinhKhung.getSoTinChiThucHanh()
                );
                monHocCTK_dtos.add(monHocCTK_dto);
            }
            return ResponseEntity.ok(monHocCTK_dtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getLopHocPhan")
    private ResponseEntity<List<LopHocPhan_DTO>> getLopHocPhan(@RequestParam long maMonHoc, @RequestParam String kiHoc) {
        List<LopHocPhan> lopHocPhans = lopHocPhanService.findLopHocPhanByMaMHAndKiHoc(maMonHoc, kiHoc);
        if (lopHocPhans != null) {
            List<LopHocPhan_DTO> lopHocPhan_dtos = new ArrayList<>();
            for (LopHocPhan lopHocPhan : lopHocPhans) {
                String trangThaiLop = "";
                switch (lopHocPhan.getTrangThaiLop().getValue()) {
                    case 0 -> trangThaiLop += "Đã khóa";
                    case 1 -> trangThaiLop += "Chờ sinh viên đăng ký";
                }
                MonHoc_DTO monHoc_dto = new MonHoc_DTO(lopHocPhan.getMonHoc().getMaMonHoc(),
                        lopHocPhan.getMonHoc().getTenMonHoc(),
                        lopHocPhan.getMonHoc().getKhoa().getMaKhoa()
                );
                LopHocPhan_DTO lopHocPhan_dto = new LopHocPhan_DTO(
                        lopHocPhan.getMaLopHocPhan(),
                        lopHocPhan.getTenLopHocPhan(),
                        lopHocPhan.getSoLuongToiDa(),
                        trangThaiLop,
                        lopHocPhan.getKiHoc(),
                        monHoc_dto,
                        lopHocPhan.getHocPhiTCTH(),
                        lopHocPhan.getHocPhiTCLT(),
                        lopHocPhan.getSoTinChiTH(),
                        lopHocPhan.getSoTinChiLT(),
                        lopHocPhan.getSoLuongDaDangKy()
                );
                lopHocPhan_dtos.add(lopHocPhan_dto);
            }

            return ResponseEntity.ok(lopHocPhan_dtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getGiangVienLopHP")
    private ResponseEntity<GiangVienLopHocPhan_DTO> getGiangVienLopHocPhan(@RequestParam long maLopHocPhan) {
        List<LichHocTH> lichHocTHList = giangVienLopHocPhanService.findGiangVienLopHocPhanByMaLopHP(maLopHocPhan);
        if (lichHocTHList != null) {
            System.out.println("lich hoc thuc hanh list: " + lichHocTHList);
            List<GiangVienLopHocPhan_DTO> giangVienLopHocPhan_dtoList = new ArrayList<>();
            GiangVien_DTO giangVien_dto = new GiangVien_DTO();
            GiangVienLopHocPhan_DTO giangVienLopHocPhan_dto = new GiangVienLopHocPhan_DTO();
            LichHocTH_DTO lichHocTH_dto = new LichHocTH_DTO();
            String loaiLichHoc = "";
            List<LichHocTH_DTO> lichHocTHDtoList = new ArrayList<>();
            for (LichHocTH lichHocTH : lichHocTHList) {
                lichHocTH_dto = new LichHocTH_DTO(
                        lichHocTH.getMaLichHocTH(),
                        lichHocTH.getTenNhomLichHocTH(),
                        lichHocTH.getViTri(),
                        lichHocTH.getLichHoc(),
                        lichHocTH.getGiangVienLopHocPhan().getLopHocPhan().getMaLopHocPhan()
                );
                lichHocTHDtoList.add(lichHocTH_dto);
            }
            for (LichHocTH lichHocTH : lichHocTHList) {
                switch (lichHocTH.getGiangVienLopHocPhan().getLoaiLichHoc().getValue()) {
                    case 0 -> loaiLichHoc = "LT";
                    case 1 -> loaiLichHoc = "TH";
                }
                giangVien_dto = new GiangVien_DTO(
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getMaGiangVien(),
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getTenGiangVien(),
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getChucVu(),
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getSoDienThoai(),
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getDiaChi(),
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getGioiTinh(),
                        lichHocTH.getGiangVienLopHocPhan().getGiangVien().getNgaySinh()
                );
                giangVienLopHocPhan_dto = new GiangVienLopHocPhan_DTO(
                        giangVien_dto,
                        lichHocTH.getGiangVienLopHocPhan().getLopHocPhan().getMaLopHocPhan(),
                        loaiLichHoc,
                        lichHocTH.getViTri(),
                        lichHocTH.getLichHoc(),
                        lichHocTHDtoList,
                        lichHocTH.getGiangVienLopHocPhan().getThoiGian()
                );
            }
            return ResponseEntity.ok(giangVienLopHocPhan_dto);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getLopHocPhanByMssvAndKihoc")
    private ResponseEntity<LopHocPhan_DTO> getLopHocPhanByMssvAndKihoc(@RequestParam long mssv, @RequestParam String kiHoc) {
        if (lopHocPhanService.findLopHocPhanByMsssAndKihoc(mssv, kiHoc).isPresent()) {
            LopHocPhan lopHocPhan = lopHocPhanService.findLopHocPhanByMsssAndKihoc(mssv, kiHoc).get();
            String trangThaiLop = "";
            switch (lopHocPhan.getTrangThaiLop().getValue()) {
                case 0 -> trangThaiLop += "Đã khóa";
                case 1 -> trangThaiLop += "Chờ sinh viên đăng ký";
            }
            MonHoc_DTO monHoc_dto = new MonHoc_DTO(
                    lopHocPhan.getMonHoc().getMaMonHoc(),
                    lopHocPhan.getMonHoc().getTenMonHoc(),
                    lopHocPhan.getMonHoc().getKhoa().getMaKhoa()
            );
            LocalDateTime ngayDangKy = null;
            for (int i = 0; i < lopHocPhan.getBangDiems().size(); i++) {
                if (lopHocPhan.getBangDiems().get(i).getSinhVien().getMssv() == mssv) {
                    ngayDangKy = lopHocPhan.getBangDiems().get(i).getNgayDangKy();
                }
            }
            LopHocPhan_DTO lopHocPhan_dto = new LopHocPhan_DTO(
                    lopHocPhan.getMaLopHocPhan(),
                    lopHocPhan.getTenLopHocPhan(),
                    lopHocPhan.getSoLuongToiDa(),
                    trangThaiLop,
                    lopHocPhan.getKiHoc(),
                    monHoc_dto,
                    lopHocPhan.getHocPhiTCTH(),
                    lopHocPhan.getHocPhiTCLT(),
                    lopHocPhan.getSoTinChiTH(),
                    lopHocPhan.getSoTinChiLT(),
                    lopHocPhan.getSoLuongDaDangKy(),
                    ngayDangKy
            );
            return ResponseEntity.ok(lopHocPhan_dto);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/addBangDiem")
    private ResponseEntity<?> taoBangDiem(@RequestBody BangDiem bangDiem) {
        try {
            BangDiem bangDiemAddToDB = bangDiemService.taoBangDiem(bangDiem);
            LopHocPhan lopHocPhan = lopHocPhanRepository.findById(bangDiemAddToDB.getLopHocPhan().getMaLopHocPhan()).get();
            lopHocPhan.setSoLuongDaDangKy(lopHocPhan.getSoLuongDaDangKy() + 1);
            lopHocPhanRepository.save(lopHocPhan);
            BangDiem_DTO bangDiem_dto = new BangDiem_DTO(
                    bangDiemAddToDB.getDiemGK(),
                    bangDiemAddToDB.getDiemChuyenCan(),
                    bangDiemAddToDB.getDiemTK(),
                    bangDiemAddToDB.getDiemTH(),
                    bangDiemAddToDB.getDiemCK(),
                    bangDiemAddToDB.getDiemTongKet(),
                    bangDiemAddToDB.getDiemThang4(),
                    bangDiemAddToDB.getDiemChu(),
                    bangDiemAddToDB.getXepLoai(),
                    bangDiemAddToDB.getGhiChu(),
                    bangDiemAddToDB.getTrangThai(),
                    bangDiemAddToDB.getNgayDangKy(),
                    bangDiemAddToDB.getTrangThaiHocPhi(),
                    bangDiemAddToDB.getNhomTH(),
                    bangDiemAddToDB.getSinhVien().getMssv(),
                    bangDiemAddToDB.getLopHocPhan().getMaLopHocPhan()
            );
            return ResponseEntity.ok(bangDiem_dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi khi tạo bảng điểm!");
        }
    }

    @GetMapping("/getLHPDaDK")
    private ResponseEntity<?> getLopHPSauKhiDK(@RequestParam long mssv, @RequestParam String kiHoc) {
        List<BangDiem> bangDiemList = bangDiemService.getLHPSauKhiDkMH(mssv, kiHoc);
        if (!bangDiemList.isEmpty()) {
            List<LopHocPhan_DTO> lopHocPhanDtoList = new ArrayList<>();
            for (BangDiem bangDiem : bangDiemList) {
                MonHoc_DTO monHoc_dto = new MonHoc_DTO(
                        bangDiem.getLopHocPhan().getMonHoc().getMaMonHoc(),
                        bangDiem.getLopHocPhan().getMonHoc().getTenMonHoc()
                );
                String trangThaiLop = "";
                switch (bangDiem.getLopHocPhan().getTrangThaiLop().getValue()) {
                    case 0 -> trangThaiLop += "Đã khóa";
                    case 1 -> trangThaiLop += "Chờ sinh viên đăng ký";
                }
                LopHocPhan_DTO lopHocPhan_dto = new LopHocPhan_DTO(
                        bangDiem.getLopHocPhan().getMaLopHocPhan(),
                        bangDiem.getLopHocPhan().getTenLopHocPhan(),
                        bangDiem.getLopHocPhan().getSoLuongToiDa(),
                        trangThaiLop,
                        bangDiem.getLopHocPhan().getKiHoc(),
                        monHoc_dto,
                        bangDiem.getLopHocPhan().getHocPhiTCTH(),
                        bangDiem.getLopHocPhan().getHocPhiTCLT(),
                        bangDiem.getLopHocPhan().getSoTinChiTH(),
                        bangDiem.getLopHocPhan().getSoTinChiLT(),
                        bangDiem.getLopHocPhan().getSoLuongDaDangKy(),
                        bangDiem.getNgayDangKy(),
                        bangDiem.getNhomTH()
                );
                lopHocPhanDtoList.add(lopHocPhan_dto);
            }
            return ResponseEntity.ok(lopHocPhanDtoList);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi khi lấy môn học đã đăng ký!");
    }

    @GetMapping("/getCTK")
    private ResponseEntity<?> getCTKOfStudent(@RequestParam long mssv) {
        List<MonHocChuongTrinhKhung> monHocChuongTrinhKhungList = monHocCTKService.findChuongTrinhKhung(mssv);
        if (!monHocChuongTrinhKhungList.isEmpty()) {
            List<MonHocCTK_DTO> monHocCTKDtoList = new ArrayList<>();
            for (MonHocChuongTrinhKhung monHocChuongTrinhKhung : monHocChuongTrinhKhungList) {
                MonHoc_DTO monHoc_dto = new MonHoc_DTO(
                        monHocChuongTrinhKhung.getMonHoc().getMaMonHoc(),
                        monHocChuongTrinhKhung.getMonHoc().getTenMonHoc()
                );
//                for(MonHocTienQuyet monHocTienQuyet : monHocChuongTrinhKhung.getMonHoc().getMonHocTienQuyets()){
//                    System.out.println("Môn học tiên quyết: " + monHocTienQuyet);
//                }
                BangDiem bangDiem = new BangDiem();
                Optional<BangDiem> bangDiemOptional = bangDiemRepository.findBangDiemBySinhVien_Mssv(mssv);
                if (bangDiemOptional.isPresent()) {
                    bangDiem = bangDiemOptional.get();
                }
                String trangThai = "";
                if (bangDiem.getTrangThai() != null) {
                    switch (bangDiem.getTrangThai().getValue()) {
                        case 0 -> trangThai += "Đạt";
                        case 1 -> trangThai += "Không đạt";
                    }
                }

                MonHocCTK_DTO monHocCTK_dto = new MonHocCTK_DTO(
                        monHoc_dto,
                        monHocChuongTrinhKhung.getHocKy(),
                        null,
                        monHocChuongTrinhKhung.getSoTinChiLyThuyet(),
                        monHocChuongTrinhKhung.getSoTinChiThucHanh(),
                        trangThai
                );
                monHocCTKDtoList.add(monHocCTK_dto);
            }
            return ResponseEntity.ok(monHocCTKDtoList);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi khi lấy chương trình khung của sinh viên!");
    }

    @GetMapping("/getLichHoc")
    private ResponseEntity<?> getLichHoc(@RequestParam long mssv) {
        List<GiangVienLopHocPhan> giangVienLopHocPhanList = giangVienLopHocPhanService.getLichHoc(mssv);
        if (!giangVienLopHocPhanList.isEmpty()) {
            List<GiangVienLopHocPhan_DTO> giangVienLopHocPhan_dtoList = new ArrayList<>();
            for (GiangVienLopHocPhan giangVienLopHocPhan : giangVienLopHocPhanList) {
                MonHoc_DTO monHoc_dto = new MonHoc_DTO(
                        giangVienLopHocPhan.getLopHocPhan().getMonHoc().getMaMonHoc(),
                        giangVienLopHocPhan.getLopHocPhan().getMonHoc().getTenMonHoc()
                );
                GiangVien_DTO giangVien_dto = new GiangVien_DTO(
                        giangVienLopHocPhan.getGiangVien().getMaGiangVien(),
                        giangVienLopHocPhan.getGiangVien().getTenGiangVien()
                );
                String loaiLichHoc = "";
                switch (giangVienLopHocPhan.getLoaiLichHoc().getValue()) {
                    case 0 -> loaiLichHoc += "LT";
                    case 1 -> loaiLichHoc += "TH";
                }
                List<LichHocTH_DTO> lichHocTHDtoList = new ArrayList<>();
                for (int i = 0; i < giangVienLopHocPhan.getLichHocTHList().size(); i++) {
                    LichHocTH lichHocTH = giangVienLopHocPhan.getLichHocTHList().get(i);
                    LichHocTH_DTO lichHocTH_dto = new LichHocTH_DTO(
                            lichHocTH.getMaLichHocTH(),
                            lichHocTH.getTenNhomLichHocTH(),
                            lichHocTH.getViTri(),
                            lichHocTH.getLichHoc()
                    );
                    lichHocTHDtoList.add(lichHocTH_dto);
                }
                GiangVienLopHocPhan_DTO giangVienLopHocPhan_dto = new GiangVienLopHocPhan_DTO(
                        giangVien_dto,
                        giangVienLopHocPhan.getLopHocPhan().getMaLopHocPhan(),
                        loaiLichHoc,
                        giangVienLopHocPhan.getViTri(),
                        giangVienLopHocPhan.getLichHocLT(),
                        lichHocTHDtoList,
                        giangVienLopHocPhan.getThoiGian()
                );
                giangVienLopHocPhan_dtoList.add(giangVienLopHocPhan_dto);
            }
            return ResponseEntity.ok(giangVienLopHocPhan_dtoList);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi khi lấy lịch học!");
    }
}
