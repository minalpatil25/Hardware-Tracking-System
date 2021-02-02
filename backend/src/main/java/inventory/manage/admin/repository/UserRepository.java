package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import inventory.manage.admin.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByName(String name);
}
