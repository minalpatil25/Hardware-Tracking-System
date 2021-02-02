package inventory.manage.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.user.entity.Transfer;

public interface TransferRepository extends JpaRepository<Transfer,Integer> {

}
