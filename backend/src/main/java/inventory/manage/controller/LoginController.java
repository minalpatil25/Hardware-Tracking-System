package inventory.manage.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import inventory.manage.admin.entity.Branch;
import inventory.manage.admin.entity.Admin;
import inventory.manage.admin.entity.User;
import inventory.manage.admin.entity.Vender;
import inventory.manage.admin.repository.BranchRepository;
import inventory.manage.admin.repository.AdminRepository;
import inventory.manage.admin.repository.UserRepository;
import inventory.manage.admin.repository.VenderRepository;
import inventory.manage.entity.Login;

@CrossOrigin
@RestController
public class LoginController {
    
	@Autowired
	private AdminRepository loginrepo;
	@Autowired
	private BranchRepository branchrepo;
	@Autowired
	private VenderRepository venderrepo;
	@Autowired
	private UserRepository userrepo;
	
	
	@PostMapping("/login")
	public HashMap<String,String> loginPost(@RequestBody Login login) {
		HashMap<String,String> map=new HashMap<String,String>();
		Admin admin = loginrepo.findByUsername(login.getUsername());
		Branch branch = branchrepo.findByuserName(login.getUsername());
		Vender vender = venderrepo.findByuserName(login.getUsername());
		User user = userrepo.findByName(login.getUsername());
		
		if(admin != null && (login.getPassword().equals(admin.getPassword()))) {
			map.put("username",admin.getUsername());
			map.put("role", "admin");
			return map;
		} else if(branch != null && login.getPassword().equals(branch.getPassword())) {
			map.put("username",branch.getUserName());
			map.put("role", "branch");
			return map;
		} else if(vender != null && login.getPassword().equals(vender.getPassword())) {
			map.put("username",vender.getUserName());
			map.put("role", "vender");
			map.put("vCode", vender.getvCode());
			return map;
		} else if(user != null && login.getPassword().equals(user.getPassword())) {
			map.put("username",user.getName());
			map.put("role", "user");
			return map;
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find resource");
		}
	}
}
