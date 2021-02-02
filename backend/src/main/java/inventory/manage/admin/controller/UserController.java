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

import inventory.manage.admin.entity.User;
import inventory.manage.admin.repository.UserRepository;

@CrossOrigin
@RestController
public class UserController {
	
	@Autowired
	private UserRepository userRepo;
	
	@GetMapping("/users")
	List<User> getAll() {
	    return userRepo.findAll();
	}
	
	@PostMapping("/users")
	User createUser(@RequestBody User newUser) {
		return userRepo.save(newUser);
	}

	@GetMapping("/users/{id}")
	User get(@PathVariable Integer id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@PutMapping("/users/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Integer id) {

		return userRepo.findById(id)
				.map(user -> {
					user.setName(newUser.getName());
					user.setPassword(newUser.getPassword());
					return userRepo.save(user);
				})
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource"));
	}

	@DeleteMapping("/users/{id}")
	void deleteUser(@PathVariable Integer id) {
		userRepo.deleteById(id);
	}
}
