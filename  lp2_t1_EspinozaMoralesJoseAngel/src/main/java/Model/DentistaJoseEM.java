package Model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_dentista")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DentistaJoseEM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	@Column(name = "id_dentista" ,nullable = false)
	private int idDentista;
	@Column(name = "cop",nullable = false)
	private String cop;
	@Column(name = "nombre_completo",nullable = false)
	private String nombreCompleto;
	@Column(name = "fecha_inicio_contrato",nullable = false)
	private LocalDate fechaInicioContrato;
	@Column(name = "turno",nullable = false)
	private String turno;
	@Column(name = "correo",nullable = false)
	private String correo;
	@ManyToOne
	@JoinColumn(name = "id_especialidad",nullable = false)
	private EspecialidadJoseEM especialista;
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return nombreCompleto;
	}
}
