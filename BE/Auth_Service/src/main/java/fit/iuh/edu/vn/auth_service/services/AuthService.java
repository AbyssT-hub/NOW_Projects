package fit.iuh.edu.vn.auth_service.services;

import fit.iuh.edu.vn.auth_service.models.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;


    public String generateToken(long mssv) {
        return jwtService.generateToken(mssv);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
}
