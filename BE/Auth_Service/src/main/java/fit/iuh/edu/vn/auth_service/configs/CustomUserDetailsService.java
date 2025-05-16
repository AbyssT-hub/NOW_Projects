package fit.iuh.edu.vn.auth_service.configs;

import fit.iuh.edu.vn.auth_service.entities.SinhVien;
import fit.iuh.edu.vn.auth_service.services.SinhVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
//@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private SinhVienService sinhVienService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<SinhVien> sinhVien = sinhVienService.findByMssv(Long.parseLong(username));
        return sinhVien.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with mssv: " + username));
    }
}
