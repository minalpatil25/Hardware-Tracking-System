package inventory.manage.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.user.entity.Maintenance;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Integer> {

}
