package fit.iuh.edu.vn.dkhp_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LichHocTH_DTO {
    private long maLichHocTH;
    private String tenNhomLichHocTH;
    private String viTri;
    private List<String> lichHoc;
    private long maGiangVienLopHocPhan;

    public LichHocTH_DTO(long maLichHocTH, String tenNhomLichHocTH, String viTri, List<String> lichHoc) {
        this.maLichHocTH = maLichHocTH;
        this.tenNhomLichHocTH = tenNhomLichHocTH;
        this.viTri = viTri;
        this.lichHoc = lichHoc;
    }
}
