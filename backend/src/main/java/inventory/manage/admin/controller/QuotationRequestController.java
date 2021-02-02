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

import inventory.manage.admin.entity.QuotationRequest;
import inventory.manage.admin.entity.QuotationRequestSearch;
import inventory.manage.admin.repository.QuotationRequestRepository;

@CrossOrigin
@RestController
public class QuotationRequestController {
	
	@Autowired
	private QuotationRequestRepository qrRepo;
	
	@GetMapping("/quotationrequest")
	List<QuotationRequest> getAll() {
	    return qrRepo.findAll();
	}
	
	@GetMapping("/quotationrequest/{id}")
	QuotationRequest get(@PathVariable Integer id) {
		return qrRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}
	
	@PostMapping("/quotationrequest")
	QuotationRequest createQuotationRequest(@RequestBody QuotationRequest newQr) {
		return qrRepo.save(newQr);
	}

	@DeleteMapping("/quotationrequest/{id}")
	void deleteQuotationRequest(@PathVariable Integer id) {
		qrRepo.deleteById(id);
	}
	
	@PostMapping("/quotationrequest/searchbyvendor")
	List<QuotationRequest> searchByVendor(@RequestBody QuotationRequestSearch quotationRequestSearch) {
		List<QuotationRequest> quotationRequestList = qrRepo.findAll();
		
		return quotationRequestList.stream().filter(ele -> ele.getVendor().contains(quotationRequestSearch.getVendor())).collect(Collectors.toList());
	}
}
