package fit.iuh.edu.vn.auth_service.configs;

import fit.iuh.edu.vn.auth_service.entities.SinhVien;
import fit.iuh.edu.vn.auth_service.repositories.SinhVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor

public class DataSampleConfig {
    private final SinhVienRepository sinhVienRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initData() {
        return args -> {
//            ma hoa mat khau
            String password1 = passwordEncoder.encode("123456");
            SinhVien sinhVien1 = new SinhVien();
            sinhVien1.setMssv(20111601);
            sinhVien1.setMatKhau(password1);
            sinhVien1.setRole("USER");
            sinhVienRepository.save(sinhVien1);

            String password2 = passwordEncoder.encode("123456");
            SinhVien sinhVien2 = new SinhVien();
            sinhVien2.setMssv(21082761);
            sinhVien2.setMatKhau(password2);
            sinhVien2.setRole("USER");
            sinhVienRepository.save(sinhVien2);
        };

    }

}
