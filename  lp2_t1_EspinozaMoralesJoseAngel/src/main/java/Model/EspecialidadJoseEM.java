package Model;

import javax.persistence.*;

import lombok.*;
@Entity
@Table(name = "tbl_especialidad")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadJoseEM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
    @Column(name = "id_especialidad")	
  private int idEspecialista;
	
    @Column(name = "titulo" ,nullable = false)	
   private String titulo;
    
    @Override
    public String toString() {
    	// TODO Auto-generated method stub
    	return titulo;
    }
}
