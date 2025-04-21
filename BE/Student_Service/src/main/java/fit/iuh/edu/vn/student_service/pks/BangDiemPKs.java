package fit.iuh.edu.vn.student_service.pks;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BangDiemPKs implements Serializable {
    private long sinhVien;
    private long lopHocPhan;

}
