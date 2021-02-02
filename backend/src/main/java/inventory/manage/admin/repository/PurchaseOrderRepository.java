package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.admin.entity.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Integer> {
	
}
