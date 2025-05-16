package fit.iuh.edu.vn.dkhp_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MonHocCTK_DTO {
    private MonHoc_DTO monHoc;
    private ChuongTrinhKhung_DTO chuongTrinhKhung;
    //    private List<MonHoc_DTO> monHocs;
//    private List<ChuongTrinhKhung_DTO> chuongTrinhKhungs;
    private int hocKy;
    private String loaiMonHoc;
    private int soTinChiLyThuyet;
    private int soTinChiThucHanh;
    private String trangThai;

    public MonHocCTK_DTO(MonHoc_DTO monHoc, int hocKy, String loaiMonHoc, int soTinChiLyThuyet, int soTinChiThucHanh) {
        this.monHoc = monHoc;
        this.hocKy = hocKy;
        this.loaiMonHoc = loaiMonHoc;
        this.soTinChiLyThuyet = soTinChiLyThuyet;
        this.soTinChiThucHanh = soTinChiThucHanh;
    }

    public MonHocCTK_DTO(MonHoc_DTO monHoc, int hocKy, String loaiMonHoc, int soTinChiLyThuyet, int soTinChiThucHanh, String trangThai) {
        this.monHoc = monHoc;
        this.hocKy = hocKy;
        this.loaiMonHoc = loaiMonHoc;
        this.soTinChiLyThuyet = soTinChiLyThuyet;
        this.soTinChiThucHanh = soTinChiThucHanh;
        this.trangThai = trangThai;
    }

    public MonHocCTK_DTO(MonHoc_DTO monHoc, ChuongTrinhKhung_DTO chuongTrinhKhung, int hocKy, String loaiMonHoc, int soTinChiLyThuyet, int soTinChiThucHanh) {
        this.monHoc = monHoc;
        this.chuongTrinhKhung = chuongTrinhKhung;
        this.hocKy = hocKy;
        this.loaiMonHoc = loaiMonHoc;
        this.soTinChiLyThuyet = soTinChiLyThuyet;
        this.soTinChiThucHanh = soTinChiThucHanh;
    }
}
