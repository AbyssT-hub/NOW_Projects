package fit.iuh.edu.vn.dkhp_service.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;

import fit.iuh.edu.vn.dkhp_service.enums.TrangThai;
import fit.iuh.edu.vn.dkhp_service.enums.TrangThaiHocPhi;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor

@Getter
@Setter
public class BangDiem_DTO {
    private double diemGK;
    private double diemChuyenCan;
    private double diemTK;
    private double diemTH;
    private double diemCK;
    private double diemTongKet;
    private double diemThang4;
    private String diemChu;
    private String xepLoai;
    private String ghiChu;
    private TrangThai trangThai;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    private LocalDateTime ngayDangKy;
    private TrangThaiHocPhi trangThaiHocPhi;
    private String nhomTH;
    private long maSinhVien;
    private long maLopHocPhan;

    public BangDiem_DTO(double diemGK, double diemChuyenCan, double diemTK, double diemTH, double diemCK, double diemTongKet, double diemThang4, String diemChu, String xepLoai, String ghiChu, TrangThai trangThai, LocalDateTime ngayDangKy, TrangThaiHocPhi trangThaiHocPhi, String nhomTH, long maSinhVien, long maLopHocPhan) {
        this.diemGK = diemGK;
        this.diemChuyenCan = diemChuyenCan;
        this.diemTK = diemTK;
        this.diemTH = diemTH;
        this.diemCK = diemCK;
        this.diemTongKet = diemTongKet;
        this.diemThang4 = diemThang4;
        this.diemChu = diemChu;
        this.xepLoai = xepLoai;
        this.ghiChu = ghiChu;
        this.trangThai = trangThai;
        this.ngayDangKy = ngayDangKy;
        this.trangThaiHocPhi = trangThaiHocPhi;
        this.nhomTH = nhomTH;
        this.maSinhVien = maSinhVien;
        this.maLopHocPhan = maLopHocPhan;
    }
}
