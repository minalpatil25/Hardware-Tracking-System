package inventory.manage.admin.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AssetType {

	@Id 
	@GeneratedValue
	private int id;
	
	private String code;
	private String type;
	private float depriciation;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getCode() {
		return code;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public float getDepriciation() {
		return depriciation;
	}
	
	public void setDepriciation(float depriciation) {
		this.depriciation = depriciation;
	}
}
