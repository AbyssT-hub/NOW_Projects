package fit.iuh.edu.vn.auth_service.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "SinhVien")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SinhVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Column(name = "mssv", nullable = false)
    private long mssv;
    @JsonIgnore
    @Column(name = "matKhau", nullable = false)
    private String matKhau;
    private String role;

    public SinhVien(long mssv, String matKhau) {
        this.mssv = mssv;
        this.matKhau = matKhau;
    }

    public SinhVien(long mssv, String matKhau, String role) {
        this.mssv = mssv;
        this.matKhau = matKhau;
        this.role = role;
    }
}
