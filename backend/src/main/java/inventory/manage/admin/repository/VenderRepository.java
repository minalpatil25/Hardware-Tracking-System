package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import inventory.manage.admin.entity.Vender;

public interface VenderRepository extends JpaRepository<Vender, Integer> {

	
	Vender findByuserName(String name);
}
