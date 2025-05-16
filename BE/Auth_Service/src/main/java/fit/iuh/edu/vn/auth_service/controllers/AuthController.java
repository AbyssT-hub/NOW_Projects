package fit.iuh.edu.vn.auth_service.controllers;

import fit.iuh.edu.vn.auth_service.models.LoginRequest;
import fit.iuh.edu.vn.auth_service.models.LoginResponse;
import fit.iuh.edu.vn.auth_service.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
//    @Autowired
//    private AuthenticationManager authenticationManager;

//    @GetMapping("/")
//    public String greeting() {
//        return "Hello World!";
//    }

//    @PostMapping("/auth/token")
//    public String getToken(@RequestBody LoginRequest loginRequest) {
//        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getMssv(), loginRequest.getMatKhau()));
//        if (authenticate.isAuthenticated()) {
//            return authService.generateToken(loginRequest.getMssv());
//        } else {
//            throw new RuntimeException("invalid access");
//        }
//    }

//    @GetMapping("/auth/validate")
//    public String validateToken(@RequestParam("token") String token) {
//        authService.validateToken(token);
//        return "Token is valid";
//    }
}
