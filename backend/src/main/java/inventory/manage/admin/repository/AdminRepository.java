package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import inventory.manage.admin.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

	Admin findByUsername(String name);
}
