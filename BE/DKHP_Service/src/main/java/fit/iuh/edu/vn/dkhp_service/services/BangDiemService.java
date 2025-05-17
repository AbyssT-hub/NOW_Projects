package fit.iuh.edu.vn.dkhp_service.services;


import fit.iuh.edu.vn.dkhp_service.entities.BangDiem;

import java.util.List;

public interface BangDiemService {
    BangDiem taoBangDiem(BangDiem bangDiem) throws Exception;
    List<BangDiem> getLHPSauKhiDkMH(long mssv, String kiHoc);
}
