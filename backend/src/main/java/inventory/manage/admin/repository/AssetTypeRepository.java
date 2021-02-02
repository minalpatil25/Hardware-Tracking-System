package inventory.manage.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.admin.entity.AssetType;

public interface AssetTypeRepository extends JpaRepository<AssetType, Integer> {

	
}
