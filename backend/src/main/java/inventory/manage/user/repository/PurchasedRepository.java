package inventory.manage.user.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.user.entity.Purchased;

public interface PurchasedRepository extends JpaRepository<Purchased,Integer> {

	
}
