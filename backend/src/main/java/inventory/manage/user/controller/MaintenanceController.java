package inventory.manage.user.controller;

import java.util.List;
import java.util.Optional;

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

import inventory.manage.user.entity.Maintenance;
import inventory.manage.user.repository.MaintenanceRepository;



@CrossOrigin
@RestController
public class MaintenanceController {

	@Autowired
	private MaintenanceRepository maintenanceRepo;
	
	@GetMapping("/maintenance")
	List<Maintenance> getAll() {
	    return maintenanceRepo.findAll();
	}
	
	@PostMapping("/maintenance")
	Maintenance createMaintenance(@RequestBody Maintenance newMaintenance) {
		return maintenanceRepo.save(newMaintenance);
	}

	@PutMapping("isVerifiedmaintenance/{id}")
	Maintenance EditMaintenance(@RequestBody Maintenance newMaintenance,@PathVariable Integer id) {
		return maintenanceRepo.findById(id)
				.map(maintenance ->{
					maintenance.setIsVerified(newMaintenance.getIsVerified());
					return maintenanceRepo.save(maintenance);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	
	}
	
	@GetMapping("/maintenance/{id}")
	Maintenance get(@PathVariable Integer id) {
		return maintenanceRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/maintenance/{id}")
	Maintenance updateMaintenance(@RequestBody Maintenance newMaintenance, @PathVariable Integer id) {

		return maintenanceRepo.findById(id)
				.map(maintenence -> {
					maintenence.setAssetName(newMaintenance.getAssetName());
					maintenence.setAssetType(newMaintenance.getAssetType());
					maintenence.setProductSerialNo(newMaintenance.getProductSerialNo());
					maintenence.setProblem(newMaintenance.getProblem());
					maintenence.setNewPart(newMaintenance.getNewPart());
					maintenence.setServiceName(newMaintenance.getServiceName());
					maintenence.setCost(newMaintenance.getCost());
					maintenence.setVenue(newMaintenance.getVenue());
					maintenence.setInwordDate(newMaintenance.getInwordDate());
					maintenence.setOutwordDate(newMaintenance.getOutwordDate());
					maintenence.setIsVerified(newMaintenance.getIsVerified());
					return maintenanceRepo.save(maintenence);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/maintenance/{id}")
	void deleteMaintenance(@PathVariable Integer id) {
		maintenanceRepo.deleteById(id);
	}
}
