package inventory.manage.admin.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import inventory.manage.admin.entity.PurchaseOrder;
import inventory.manage.admin.entity.PurchaseOrderSearch;
import inventory.manage.admin.repository.PurchaseOrderRepository;
import inventory.manage.vendor.entity.QuotationResponse;
import inventory.manage.vendor.repository.QuotationResponseRepository;

@CrossOrigin
@RestController
public class PurchaseOrderController {
	
	@Autowired
	private PurchaseOrderRepository poRepo;
	
	@Autowired
	private QuotationResponseRepository qrRepo;
	
	@GetMapping("/purchaseorder")
	List<PurchaseOrder> getAll() {
	    return poRepo.findAll();
	}
	
	@PostMapping("/purchaseorder")
	PurchaseOrder createPurchaseOrder(@RequestBody PurchaseOrder newPurchaseOrder) {
		return poRepo.save(newPurchaseOrder);
	}

	@GetMapping("/purchaseorder/{id}")
	PurchaseOrder get(@PathVariable Integer id) {
		return poRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/purchaseorder/{id}")
	void deletePurchaseOrder(@PathVariable Integer id) {
		poRepo.deleteById(id);
	}
	
	@PostMapping("/purchaseorder/searchbyvendor")
	List<PurchaseOrder> searchByVendor(@RequestBody PurchaseOrderSearch purchaseOrderSearch) {
		List<PurchaseOrder> purchaseOrderList = poRepo.findAll();
		
		return purchaseOrderList.stream().filter(ele -> { 
			QuotationResponse qRes = qrRepo.findById(ele.getQuotationResponseId()).get();
			if (qRes.getVendor().equals(purchaseOrderSearch.getVendor())) {
				return true;
			}
			return false;
		}).collect(Collectors.toList());
	}
}
