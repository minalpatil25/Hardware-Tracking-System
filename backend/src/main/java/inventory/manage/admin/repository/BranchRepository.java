package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.admin.entity.Branch;

public interface BranchRepository extends JpaRepository<Branch, Integer> {

	Branch findByuserName(String name);
}
