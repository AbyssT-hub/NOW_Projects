package fit.iuh.edu.vn.dkhp_service.repositories;


import fit.iuh.edu.vn.dkhp_service.entities.BangDiem;
import fit.iuh.edu.vn.dkhp_service.pks.BangDiemPKs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BangDiemRepository extends JpaRepository<BangDiem, BangDiemPKs> {
    @Query("select bd from MonHoc  mh \n" +
            " join LopHocPhan lhp on lhp.monHoc.maMonHoc = mh.maMonHoc \n" +
            " join BangDiem bd on bd.lopHocPhan.maLopHocPhan = lhp.maLopHocPhan \n" +
            " where mh.maMonHoc in (select lhp.monHoc.maMonHoc from BangDiem bd \n" +
            " join LopHocPhan lhp on bd.lopHocPhan.maLopHocPhan = lhp.maLopHocPhan \n" +
            " where bd.sinhVien.mssv = ?1 and lhp.kiHoc = ?2)")
    List<BangDiem> getLHPSauKhiDkMH(long mssv, String kiHoc);

    Optional<BangDiem> findBangDiemBySinhVien_Mssv(long mssv);
}