package fit.iuh.edu.vn.auth_service.models;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginRequest {
    private long mssv;
    private String matKhau;
}
