package fit.iuh.edu.vn.dkhp_service.services.serviceImpl;


import fit.iuh.edu.vn.dkhp_service.entities.BangDiem;
import fit.iuh.edu.vn.dkhp_service.enums.TrangThaiHocPhi;
import fit.iuh.edu.vn.dkhp_service.repositories.BangDiemRepository;
import fit.iuh.edu.vn.dkhp_service.services.BangDiemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BangDiemServiceImpl implements BangDiemService {
    private final BangDiemRepository bangDiemRepository;


    @Override
    public BangDiem taoBangDiem(BangDiem bangDiem) throws Exception {
        try {
            BangDiem bangDiemAddToDB = new BangDiem();
            bangDiemAddToDB.setSinhVien(bangDiem.getSinhVien());
            bangDiemAddToDB.setLopHocPhan(bangDiem.getLopHocPhan());
            bangDiemAddToDB.setNgayDangKy(bangDiem.getNgayDangKy());
            bangDiemAddToDB.setTrangThaiHocPhi(TrangThaiHocPhi.CHUA_DONG);
            bangDiemAddToDB.setNhomTH(bangDiem.getNhomTH());
            return bangDiemRepository.save(bangDiemAddToDB);
        } catch (Exception e) {
            throw new Exception("Lỗi khi lưu bảng điểm: " + e.getMessage());
        }
    }
}
