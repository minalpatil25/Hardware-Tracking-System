package inventory.manage.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import inventory.manage.user.entity.Scrap;

public interface  ScrapRepository extends JpaRepository<Scrap,Integer> {

}
