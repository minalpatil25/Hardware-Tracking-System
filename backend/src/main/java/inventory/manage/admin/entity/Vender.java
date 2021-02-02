package inventory.manage.admin.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Vender {
	
	@Id 
	@GeneratedValue
	private int id;
	
	private String vCode;
	private String vName;
	private String cName;
	private String cMobile;
	private String cAddress;
	private String cCity;
	private String cPIN;
	private String cState;
	private String cFAX;
	private String cTelephone;
	private String cEmail;
	private String cWebsite;
	private String oCSTNo;
	private String oMSTNo;
	private String oTINNo;
	private String oPAN;
	private String oServiceTaxNo;
	private String oExciseRegNo;
	private String bName;
	private String bAccountNo;
	private String bIFSCCode;
	private String userName;
	private String password;
	
	public Vender() {
		super();
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getvCode() {
		return vCode;
	}
	
	public void setvCode(String vCode) {
		this.vCode = vCode;
	}
	public String getvName() {
		return vName;
	}
	
	public void setvName(String vName) {
		this.vName = vName;
	}
	
	public String getcName() {
		return cName;
	}
	
	public void setcName(String cName) {
		this.cName = cName;
	}
	
	public String getcMobile() {
		return cMobile;
	}
	
	public void setcMobile(String cMobile) {
		this.cMobile = cMobile;
	}
	
	public String getcAddress() {
		return cAddress;
	}
	
	public void setcAddress(String cAddress) {
		this.cAddress = cAddress;
	}
	
	public String getcCity() {
		return cCity;
	}
	
	public void setcCity(String cCity) {
		this.cCity = cCity;
	}
	
	public String getcPIN() {
		return cPIN;
	}
	
	public void setcPIN(String cPIN) {
		this.cPIN = cPIN;
	}
	
	public String getcState() {
		return cState;
	}
	
	public void setcState(String cState) {
		this.cState = cState;
	}
	
	public String getcFAX() {
		return cFAX;
	}
	
	public void setcFAX(String cFAX) {
		this.cFAX = cFAX;
	}
	
	public String getcTelephone() {
		return cTelephone;
	}
	
	public void setcTelephone(String cTelephone) {
		this.cTelephone = cTelephone;
	}
	
	public String getcEmail() {
		return cEmail;
	}
	
	public void setcEmail(String cEmail) {
		this.cEmail = cEmail;
	}
	
	public String getcWebsite() {
		return cWebsite;
	}
	
	public void setcWebsite(String cWebsite) {
		this.cWebsite = cWebsite;
	}
	
	public String getoCSTNo() {
		return oCSTNo;
	}
	
	public void setoCSTNo(String oCSTNo) {
		this.oCSTNo = oCSTNo;
	}
	
	public String getoMSTNo() {
		return oMSTNo;
	}
	
	public void setoMSTNo(String oMSTNo) {
		this.oMSTNo = oMSTNo;
	}
	
	public String getoTINNo() {
		return oTINNo;
	}
	
	public void setoTINNo(String oTINNo) {
		this.oTINNo = oTINNo;
	}
	
	public String getoPAN() {
		return oPAN;
	}
	
	public void setoPAN(String oPAN) {
		this.oPAN = oPAN;
	}
	
	public String getoServiceTaxNo() {
		return oServiceTaxNo;
	}
	
	public void setoServiceTaxNo(String oServiceTaxNo) {
		this.oServiceTaxNo = oServiceTaxNo;
	}
	
	public String getoExciseRegNo() {
		return oExciseRegNo;
	}
	
	public void setoExciseRegNo(String oExciseRegNo) {
		this.oExciseRegNo = oExciseRegNo;
	}
	
	public String getbName() {
		return bName;
	}
	
	public void setbName(String bName) {
		this.bName = bName;
	}
	
	public String getbAccountNo() {
		return bAccountNo;
	}
	
	public void setbAccountNo(String bAccountNo) {
		this.bAccountNo = bAccountNo;
	}
	
	public String getbIFSCCode() {
		return bIFSCCode;
	}
	
	public void setbIFSCCode(String bIFSCCode) {
		this.bIFSCCode = bIFSCCode;
	}
}
