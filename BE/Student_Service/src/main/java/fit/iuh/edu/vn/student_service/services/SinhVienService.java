package fit.iuh.edu.vn.student_service.services;

import fit.iuh.edu.vn.student_service.entities.LopHocDanhNghia;
import fit.iuh.edu.vn.student_service.entities.SinhVien;
import fit.iuh.edu.vn.student_service.repositories.LopHocDanhNghiaRepository;
import fit.iuh.edu.vn.student_service.repositories.SinhVienRepository;

import java.util.List;
import java.util.Optional;

public interface SinhVienService {
    Optional<LopHocDanhNghia> findSinhVienByMssvAndMatkhau(long mssv, String matKhau);

    List<SinhVien> findAllSinhVien();
}
