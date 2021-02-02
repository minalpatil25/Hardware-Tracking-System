package inventory.manage.user.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Transfer {

	@Id
	@GeneratedValue
	  private int id;
	
	
	  private String assetType;
	  private String productSerialNo;
	  private String fromBranch;
	  private String toBranch;
	  private LocalDate date;
	  private boolean isVerified;
	  
	  
	  
	public Transfer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAssetType() {
		return assetType;
	}
	public void setAssetType(String assetType) {
		this.assetType = assetType;
	}
	public String getProductSerialNo() {
		return productSerialNo;
	}
	public void setProductSerialNo(String productSerialNo) {
		this.productSerialNo = productSerialNo;
	}
	public String getFromBranch() {
		return fromBranch;
	}
	public void setFromBranch(String fromBranch) {
		this.fromBranch = fromBranch;
	}
	public String getToBranch() {
		return toBranch;
	}
	public void setToBranch(String toBranch) {
		this.toBranch = toBranch;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public boolean isVerified() {
		return isVerified;
	}
	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}
	  
	  
}
