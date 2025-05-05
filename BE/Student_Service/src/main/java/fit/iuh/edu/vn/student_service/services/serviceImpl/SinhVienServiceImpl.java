package fit.iuh.edu.vn.student_service.services.serviceImpl;

import fit.iuh.edu.vn.student_service.entities.LopHocDanhNghia;
import fit.iuh.edu.vn.student_service.entities.SinhVien;
import fit.iuh.edu.vn.student_service.repositories.SinhVienRepository;
import fit.iuh.edu.vn.student_service.services.SinhVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SinhVienServiceImpl implements SinhVienService {
    private final SinhVienRepository sinhVienRepository;

    @Override
    public Optional<LopHocDanhNghia> findSinhVienByMssvAndMatkhau(long mssv, String matkhau) {
        return sinhVienRepository.findByMssvAndMatKhau(mssv, matkhau);
    }

    @Override
    public List<SinhVien> findAllSinhVien() {
        return List.of();
    }
}
