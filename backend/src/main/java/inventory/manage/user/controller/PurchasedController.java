package inventory.manage.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import inventory.manage.user.entity.Purchased;
import inventory.manage.user.repository.PurchasedRepository;

@CrossOrigin
@RestController
public class PurchasedController {

	@Autowired
	private PurchasedRepository PurchasedRepo;
	
	@GetMapping("/purchase")
	List<Purchased> getAll() {
	    return PurchasedRepo.findAll();
	}
	
	@PostMapping("/purchase")
	Purchased createPurchased(@RequestBody Purchased newPurchase) {
		return PurchasedRepo.save(newPurchase);
	}

	@GetMapping("/purchase/{id}")
	Purchased get(@PathVariable Integer id) {
		return PurchasedRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/purchase/{id}")
	Purchased updatePurchased(@RequestBody Purchased newPurchase, @PathVariable Integer id) {

		return PurchasedRepo.findById(id)
				.map(purchase -> {
					purchase.setAssetName(newPurchase.getAssetName());
					purchase.setAssetType(newPurchase.getAssetType());
					purchase.setProductSerialNo(newPurchase.getProductSerialNo());
					purchase.setVendorCode(newPurchase.getVendorCode());
					purchase.setCost(newPurchase.getCost());
					purchase.setBranch(newPurchase.getBranch());
					purchase.setCost(newPurchase.getCost());
					purchase.setDate(newPurchase.getDate());
					purchase.setVerified(newPurchase.isVerified());
					return PurchasedRepo.save(purchase);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/purchase/{id}")
	void deletePurchased(@PathVariable Integer id) {
		PurchasedRepo.deleteById(id);
	}
}
