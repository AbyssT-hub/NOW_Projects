package fit.iuh.edu.vn.dkhp_service.services;


import fit.iuh.edu.vn.dkhp_service.entities.GiangVienLopHocPhan;
import fit.iuh.edu.vn.dkhp_service.entities.LichHocTH;

import java.util.List;

public interface GiangVienLopHocPhanService {
    List<LichHocTH> findGiangVienLopHocPhanByMaLopHP(long maLopHocPhan);
    List<GiangVienLopHocPhan> getLichHoc(long mssv);
}
