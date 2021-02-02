package inventory.manage.admin.controller;

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

import inventory.manage.admin.entity.AssetType;
import inventory.manage.admin.repository.AssetTypeRepository;

@CrossOrigin
@RestController
public class AssetTypeController {
	
	
	@Autowired
	private AssetTypeRepository assetTypeRepo;
	
	
	@GetMapping("/assettypes")
	List<AssetType> getAll() {
	    return assetTypeRepo.findAll();
	}
	
	@PostMapping("/assettypes")
	AssetType createAssetType(@RequestBody AssetType newAssetType) {
		return assetTypeRepo.save(newAssetType);
	}

	@GetMapping("/assettypes/{id}")
	AssetType get(@PathVariable Integer id) {
		return assetTypeRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/assettypes/{id}")
	AssetType updateAssetType(@RequestBody AssetType newAssetType, @PathVariable Integer id) {

		return assetTypeRepo.findById(id)
				.map(assetType -> {
					assetType.setType(newAssetType.getType());
					assetType.setCode(newAssetType.getCode());
					assetType.setDepriciation(newAssetType.getDepriciation());
					return assetTypeRepo.save(assetType);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/assettypes/{id}")
	void deleteAssetType(@PathVariable Integer id) {
		assetTypeRepo.deleteById(id);
	}
}
