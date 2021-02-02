package inventory.manage.user.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Maintenance {
	
	@Id 
	@GeneratedValue
	  private int id;
	
	  private String assetName;
	  private String assetType;
	  private String productSerialNo;
	  private String problem;
	  private String newPart;
	  private String serviceName;
	  private float cost;
	  private String venue;
	  private LocalDate inwordDate;
	  private LocalDate outwordDate;
	  private boolean isVerified;
	  
	  
	public Maintenance() {
		super();
		// TODO Auto-generated constructor stub
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setAssetName(String assetName) {
		this.assetName = assetName;
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
	public String getProblem() {
		return problem;
	}
	public void setProblem(String problem) {
		this.problem = problem;
	}
	public String getNewPart() {
		return newPart;
	}
	public void setNewPart(String newPart) {
		this.newPart = newPart;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public float getCost() {
		return cost;
	}
	public void setCost(float cost) {
		this.cost = cost;
	}
	public String getVenue() {
		return venue;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}
	public LocalDate getInwordDate() {
		return inwordDate;
	}
	public void setInwordDate(LocalDate inwordDate) {
		this.inwordDate = inwordDate;
	}
	public LocalDate getOutwordDate() {
		return outwordDate;
	}
	public void setOutwordDate(LocalDate outwordDate) {
		this.outwordDate = outwordDate;
	}
	public boolean getIsVerified() {
		return isVerified;
	}
	public void setIsVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}
	  
	  
	  
	
}
