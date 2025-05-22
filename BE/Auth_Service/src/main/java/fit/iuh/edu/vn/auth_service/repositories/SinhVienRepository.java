package fit.iuh.edu.vn.auth_service.repositories;

import fit.iuh.edu.vn.auth_service.entities.SinhVien;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SinhVienRepository extends JpaRepository<SinhVien, Long> {
    Optional<SinhVien> findSinhVienByMssv(long mssv);
}