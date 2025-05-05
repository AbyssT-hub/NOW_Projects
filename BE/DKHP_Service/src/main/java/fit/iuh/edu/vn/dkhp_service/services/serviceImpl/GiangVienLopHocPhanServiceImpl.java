package fit.iuh.edu.vn.dkhp_service.services.serviceImpl;

import fit.iuh.edu.vn.dkhp_service.entities.LichHocTH;
import fit.iuh.edu.vn.dkhp_service.repositories.GiangVienLopHocPhanRepository;
import fit.iuh.edu.vn.dkhp_service.services.GiangVienLopHocPhanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GiangVienLopHocPhanServiceImpl implements GiangVienLopHocPhanService {
    private final GiangVienLopHocPhanRepository giangVienLopHocPhanRepository;

    @Override
    public List<LichHocTH> findGiangVienLopHocPhanByMaLopHP(long maLopHocPhan) {
        return giangVienLopHocPhanRepository.findGiangVienLopHocPhanAndLichHocTH(maLopHocPhan);
    }
}
