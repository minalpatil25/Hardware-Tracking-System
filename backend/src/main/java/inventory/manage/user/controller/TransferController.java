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


import inventory.manage.user.entity.Transfer;

import inventory.manage.user.repository.TransferRepository;

@CrossOrigin
@RestController
public class TransferController {

	@Autowired
	private TransferRepository TransferRepo;
	
	@GetMapping("/transfer")
	List<Transfer> getAll() {
	    return TransferRepo.findAll();
	}
	
	@PostMapping("/transfer")
	Transfer createScrap(@RequestBody Transfer newTransfer) {
		return TransferRepo.save(newTransfer);
	}

	@GetMapping("/transfer/{id}")
	Transfer get(@PathVariable Integer id) {
		return TransferRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/transfer/{id}")
	Transfer updateTransfer(@RequestBody Transfer newTransfer, @PathVariable Integer id) {

		return TransferRepo.findById(id)
				.map(transfer -> {
					transfer.setProductSerialNo(newTransfer.getProductSerialNo());
					transfer.setAssetType(newTransfer.getAssetType());
					transfer.setFromBranch(newTransfer.getFromBranch());
					transfer.setToBranch(newTransfer.getToBranch());
					transfer.setDate(newTransfer.getDate());
					transfer.setVerified(newTransfer.isVerified());
					return TransferRepo.save(transfer);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/transfer/{id}")
	void deleteTransfer(@PathVariable Integer id) {
		TransferRepo.deleteById(id);
	}
}
