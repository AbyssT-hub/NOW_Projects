package fit.iuh.edu.vn.auth_service.configs;

import fit.iuh.edu.vn.auth_service.entities.SinhVien;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {
    private long mssv;
    private String matKhau;

    public CustomUserDetails(SinhVien sinhVien) {
        this.mssv = sinhVien.getMssv();
        this.matKhau = sinhVien.getMatKhau();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return matKhau;
    }

    @Override
    public String getUsername() {
        return String.valueOf(mssv);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
