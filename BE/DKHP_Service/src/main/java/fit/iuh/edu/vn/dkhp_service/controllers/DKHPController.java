package fit.iuh.edu.vn.dkhp_service.controllers;


import fit.iuh.edu.vn.dkhp_service.dtos.*;
import fit.iuh.edu.vn.dkhp_service.entities.*;
import fit.iuh.edu.vn.dkhp_service.repositories.BangDiemRepository;
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
            List<GiangVienLopHocPhan_DTO> giangVienLopHocPhan_dtoList = new ArrayList<>();
            GiangVien_DTO giangVien_dto = new GiangVien_DTO();
            GiangVienLopHocPhan_DTO giangVienLopHocPhan_dto = new GiangVienLopHocPhan_DTO();
            LichHocTH_DTO lichHocTH_dto = new LichHocTH_DTO();
            String loaiLichHoc = "";
            for (LichHocTH lichHocTH : lichHocTHList) {
                switch (lichHocTH.getGiangVienLopHocPhan().getLoaiLichHoc().getValue()) {
                    case 0 -> loaiLichHoc += "LT";
                    case 1 -> loaiLichHoc += "TH";
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
                lichHocTH_dto = new LichHocTH_DTO(
                        lichHocTH.getMaLichHocTH(),
                        lichHocTH.getTenNhomLichHocTH(),
                        lichHocTH.getViTri(),
                        lichHocTH.getLichHoc(),
                        lichHocTH.getGiangVienLopHocPhan().getLopHocPhan().getMaLopHocPhan()
                );
                giangVienLopHocPhan_dto = new GiangVienLopHocPhan_DTO(
                        giangVien_dto,
                        lichHocTH.getGiangVienLopHocPhan().getLopHocPhan().getMaLopHocPhan(),
                        loaiLichHoc,
                        lichHocTH.getViTri(),
                        lichHocTH.getLichHoc(),
                        List.of(lichHocTH_dto),
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
}
