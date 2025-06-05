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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_equipo_dental")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class EquipoDentalJoseEM {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nro_equipo",nullable = false)
	@EqualsAndHashCode.Include
	private int nroEquipo;
	@Column(name = "nombre",nullable = false)
	private String nombre;
	@Column(name = "costo",nullable = false)
	private double costo;
	@Column(name = "fecha_adquisicion",nullable = false)
	private LocalDate fechaAdquirida=LocalDate.now();
	@Column(name = "estado",nullable = false)
	private String estado;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_dentista")
	private DentistaJoseEM dentista;

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return nombre;
	}
}
