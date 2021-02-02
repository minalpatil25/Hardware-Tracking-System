package inventory.manage.admin.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class QuotationRequest {

	@Id 
	@GeneratedValue
	private int id;
	
	@ElementCollection
    @CollectionTable(name = "qreq_product")
    private List<QreqProduct> product;
	
	@ElementCollection
    @CollectionTable(name = "qreq_vendor")
    private List<String> vendor;
	
	private Date date;

	public QuotationRequest() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<QreqProduct> getProduct() {
		return product;
	}

	public void setProduct(List<QreqProduct> product) {
		this.product = product;
	}

	public List<String> getVendor() {
		return vendor;
	}

	public void setVendor(List<String> vendor) {
		this.vendor = vendor;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
