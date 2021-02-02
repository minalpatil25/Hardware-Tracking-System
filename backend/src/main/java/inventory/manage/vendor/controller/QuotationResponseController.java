package inventory.manage.vendor.controller;

import java.util.Comparator;
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

import inventory.manage.vendor.entity.QuotationResponse;
import inventory.manage.vendor.entity.QuotationSearch;
import inventory.manage.vendor.repository.QuotationResponseRepository;

@CrossOrigin
@RestController
public class QuotationResponseController {
	
	@Autowired
	private QuotationResponseRepository qrRepo;
	
	@GetMapping("/quotationresponse")
	List<QuotationResponse> getAll() {
	    return qrRepo.findAll();
	}
	
	@GetMapping("/quotationresponse/{id}")
	QuotationResponse get(@PathVariable Integer id) {
		return qrRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}
	
	@PostMapping("/quotationresponse")
	QuotationResponse createQuotationRequest(@RequestBody QuotationResponse newQr) {
		return qrRepo.save(newQr);
	}

	@DeleteMapping("/quotationresponse/{id}")
	void deleteQuotationRequest(@PathVariable Integer id) {
		qrRepo.deleteById(id);
	}
	
	@PostMapping("/quotationresponse/searchbyrequestidnvendor")
	QuotationResponse searchByQuotationRequestIdAndVendor(@RequestBody QuotationSearch quotationSearch) {
	    return qrRepo.findByQuotationRequestIdAndVendor(quotationSearch.getQuotationId(), quotationSearch.getVendor())
	    		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}
	
	@PostMapping("/quotationresponse/searchbyrequestid")
	List<QuotationResponse> searchByQuotationRequestId(@RequestBody QuotationSearch quotationSearch) {
	    return qrRepo.findByQuotationRequestId(quotationSearch.getQuotationId())
	    		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}
	
	@GetMapping("/quotationresponse/idlist")
	List<Integer> getAllIds() {
	    return qrRepo.findAll().stream().map(ele -> ele.getId()).sorted(Comparator.reverseOrder()).collect(Collectors.toList());
	}
}
