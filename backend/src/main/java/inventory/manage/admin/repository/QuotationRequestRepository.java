package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.admin.entity.QuotationRequest;

public interface QuotationRequestRepository extends JpaRepository<QuotationRequest, Integer> {
	
}
