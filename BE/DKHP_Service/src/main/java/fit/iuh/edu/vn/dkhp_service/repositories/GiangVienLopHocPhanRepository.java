package fit.iuh.edu.vn.dkhp_service.repositories;


import fit.iuh.edu.vn.dkhp_service.entities.GiangVienLopHocPhan;
import fit.iuh.edu.vn.dkhp_service.entities.LichHocTH;
import fit.iuh.edu.vn.dkhp_service.pks.GiangVienLopHocPhanPKs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GiangVienLopHocPhanRepository extends JpaRepository<GiangVienLopHocPhan, GiangVienLopHocPhanPKs> {
    @Query("select lhth from GiangVienLopHocPhan  gvlhp \n" +
            " join LichHocTH  lhth on lhth.giangVienLopHocPhan.lopHocPhan.maLopHocPhan = gvlhp.lopHocPhan.maLopHocPhan\n" +
            " where gvlhp.lopHocPhan.maLopHocPhan = ?1")
    List<LichHocTH> findGiangVienLopHocPhanAndLichHocTH(long maLopHocPhan);

    @Query("select gvlhp from BangDiem bd \n" +
            " join LopHocPhan lhp on lhp.maLopHocPhan = bd.lopHocPhan.maLopHocPhan \n" +
            " join GiangVienLopHocPhan gvlhp on gvlhp.lopHocPhan.maLopHocPhan = lhp.maLopHocPhan \n" +
            " where bd.sinhVien.mssv = ?1")
    List<GiangVienLopHocPhan> getLichHoc(long mssv);
}