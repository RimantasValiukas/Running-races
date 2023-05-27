package lt.code.academy.runningracesapi.races.repository;

import lt.code.academy.runningracesapi.races.entity.RaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RaceRepository extends JpaRepository<RaceEntity, UUID> {

}
