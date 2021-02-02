package inventory.manage.vendor.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.vendor.entity.QuotationResponse;

public interface QuotationResponseRepository extends JpaRepository<QuotationResponse, Integer> {
	Optional<QuotationResponse> findByQuotationRequestIdAndVendor(Integer quotationId, String vendor);
	
	Optional<List<QuotationResponse>> findByQuotationRequestId(Integer quotationId);
}
