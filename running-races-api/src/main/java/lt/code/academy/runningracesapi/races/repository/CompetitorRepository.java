package lt.code.academy.runningracesapi.races.repository;

import lt.code.academy.runningracesapi.races.entity.CompetitorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CompetitorRepository extends JpaRepository<CompetitorEntity, UUID> {
}
