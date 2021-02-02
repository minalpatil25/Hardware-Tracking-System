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


import inventory.manage.user.entity.Scrap;

import inventory.manage.user.repository.ScrapRepository;

@CrossOrigin
@RestController
public class ScrapController {

	@Autowired
	private ScrapRepository ScrapRepo;
	
	@GetMapping("/scrap")
	List<Scrap> getAll() {
	    return ScrapRepo.findAll();
	}
	
	@PostMapping("/scrap")
	Scrap createScrap(@RequestBody Scrap newScrap) {
		return ScrapRepo.save(newScrap);
	}

	@GetMapping("/scrap/{id}")
	Scrap get(@PathVariable Integer id) {
		return ScrapRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/scrap/{id}")
	Scrap updateScrap(@RequestBody Scrap newScrap, @PathVariable Integer id) {

		return ScrapRepo.findById(id)
				.map(scrap -> {
					scrap.setProductSerialNo(newScrap.getProductSerialNo());
					scrap.setAssetType(newScrap.getAssetType());
					scrap.setSdate(newScrap.getSdate());
					scrap.setReason(newScrap.getReason());
					scrap.setBranch(newScrap.getBranch());
					scrap.setVerified(newScrap.isVerified());
					return ScrapRepo.save(scrap);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/scrap/{id}")
	void deleteScrap(@PathVariable Integer id) {
		ScrapRepo.deleteById(id);
	}
}