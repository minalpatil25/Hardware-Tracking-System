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

import inventory.manage.admin.entity.Branch;
import inventory.manage.admin.repository.BranchRepository;

@CrossOrigin
@RestController
public class BranchController {
	
	@Autowired
	private BranchRepository branchRepo;
	
	@GetMapping("/branches")
	List<Branch> getAll() {
	    return branchRepo.findAll();
	}
	
	@PostMapping("/branches")
	Branch createBranch(@RequestBody Branch newBranch) {
		return branchRepo.save(newBranch);
	}

	@GetMapping("/branches/{id}")
	Branch get(@PathVariable Integer id) {
		return branchRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/branches/{id}")
	Branch updateBranch(@RequestBody Branch newBranch, @PathVariable Integer id) {

		return branchRepo.findById(id)
				.map(branch -> {
					branch.setName(newBranch.getName());
					branch.setCode(newBranch.getCode());
					return branchRepo.save(branch);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/branches/{id}")
	void deleteBranch(@PathVariable Integer id) {
		branchRepo.deleteById(id);
	}
}
