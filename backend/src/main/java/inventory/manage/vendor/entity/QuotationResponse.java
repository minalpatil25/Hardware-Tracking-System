package inventory.manage.vendor.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class QuotationResponse {

	@Id 
	@GeneratedValue
	private int id;
	
	@ElementCollection
    @CollectionTable(name = "qres_product")
    private List<QresProduct> product;
	
	private Date date;
	private int quotationRequestId;
	private String vendor;
	private float subtotal;
	private float tax;
	private float total;
	private float paymentAdvance;
	private float paymentAfterDelivery;
	private String modeOfTransport;
	
	@Column(name = "description")
	private String desc;

	public QuotationResponse() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<QresProduct> getProduct() {
		return product;
	}

	public void setProduct(List<QresProduct> product) {
		this.product = product;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getQuotationRequestId() {
		return quotationRequestId;
	}

	public void setQuotationRequestId(int quotationRequestId) {
		this.quotationRequestId = quotationRequestId;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public float getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(float subtotal) {
		this.subtotal = subtotal;
	}

	public float getTax() {
		return tax;
	}

	public void setTax(float tax) {
		this.tax = tax;
	}

	public float getTotal() {
		return total;
	}

	public void setTotal(float total) {
		this.total = total;
	}

	public float getPaymentAdvance() {
		return paymentAdvance;
	}

	public void setPaymentAdvance(float paymentAdvance) {
		this.paymentAdvance = paymentAdvance;
	}

	public float getPaymentAfterDelivery() {
		return paymentAfterDelivery;
	}

	public void setPaymentAfterDelivery(float paymentAfterDelivery) {
		this.paymentAfterDelivery = paymentAfterDelivery;
	}

	public String getModeOfTransport() {
		return modeOfTransport;
	}

	public void setModeOfTransport(String modeOfTransport) {
		this.modeOfTransport = modeOfTransport;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
}
