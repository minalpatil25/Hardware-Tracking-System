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

import inventory.manage.admin.entity.Vender;
import inventory.manage.admin.repository.VenderRepository;

@CrossOrigin
@RestController
public class VenderController {
	
	@Autowired
	private VenderRepository venderRepo;
	
	@GetMapping("/venders")
	List<Vender> getAll() {
	    return venderRepo.findAll();
	}
	
	@PostMapping("/venders")
	Vender createVender(@RequestBody Vender newVender) {
		return venderRepo.save(newVender);
	}

	@GetMapping("/venders/{id}")
	Vender get(@PathVariable Integer id) {
		return venderRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/venders/{id}")
	Vender updateVender(@RequestBody Vender newVender, @PathVariable Integer id) {

		return venderRepo.findById(id)
				.map(vender -> {
					vender.setvCode(newVender.getvCode());
					vender.setvName(newVender.getvName());
					vender.setcName(newVender.getcName());
					vender.setcMobile(newVender.getcMobile());
					vender.setcAddress(newVender.getcAddress());
					vender.setcCity(newVender.getcCity());
					vender.setcPIN(newVender.getcPIN());
					vender.setcState(newVender.getcState());
					vender.setcFAX(newVender.getcFAX());
					vender.setcTelephone(newVender.getcTelephone());
					vender.setcEmail(newVender.getcEmail());
					vender.setcWebsite(newVender.getcWebsite());
					vender.setoCSTNo(newVender.getoCSTNo());
					vender.setoMSTNo(newVender.getoMSTNo());
					vender.setoTINNo(newVender.getoTINNo());
					vender.setoPAN(newVender.getoPAN());
					vender.setoServiceTaxNo(newVender.getoServiceTaxNo());
					vender.setoExciseRegNo(newVender.getoExciseRegNo());
					vender.setbName(newVender.getbName());
					vender.setbAccountNo(newVender.getbAccountNo());
					vender.setbIFSCCode(newVender.getbIFSCCode());
					
					return venderRepo.save(vender);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/venders/{id}")
	void deleteVender(@PathVariable Integer id) {
		venderRepo.deleteById(id);
	}
}
