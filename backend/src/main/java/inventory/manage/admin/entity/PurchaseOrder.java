package inventory.manage.admin.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class PurchaseOrder {

	@Id 
	@GeneratedValue
	private int id;
	
	private Date date;
	private int quotationResponseId;
	private String senderName;
	private String deliveryAddr;
	private String remarks;

	public PurchaseOrder() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getQuotationResponseId() {
		return quotationResponseId;
	}

	public void setQuotationResponseId(int quotationResponseId) {
		this.quotationResponseId = quotationResponseId;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getDeliveryAddr() {
		return deliveryAddr;
	}

	public void setDeliveryAddr(String deliveryAddr) {
		this.deliveryAddr = deliveryAddr;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
