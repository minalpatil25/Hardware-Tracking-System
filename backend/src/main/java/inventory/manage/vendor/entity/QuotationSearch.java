package inventory.manage.vendor.entity;

public class QuotationSearch {

	private	Integer quotationId;
	private String vendor;
	
	public QuotationSearch() {
		super();
	}

	public Integer getQuotationId() {
		return quotationId;
	}

	public void setQuotationId(Integer quotationId) {
		this.quotationId = quotationId;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}
}
