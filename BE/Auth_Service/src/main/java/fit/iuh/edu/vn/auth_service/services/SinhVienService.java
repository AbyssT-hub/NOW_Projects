package fit.iuh.edu.vn.auth_service.services;

import fit.iuh.edu.vn.auth_service.entities.SinhVien;
import fit.iuh.edu.vn.auth_service.repositories.SinhVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SinhVienService {
    private final SinhVienRepository sinhVienRepository;

    public Optional<SinhVien> findByMssv(long mssv) {
        if (sinhVienRepository.findSinhVienByMssv(mssv).isEmpty()) return Optional.empty();
        SinhVien sinhVien = sinhVienRepository.findSinhVienByMssv(mssv).get();
        return Optional.of(sinhVien);
    }
}
