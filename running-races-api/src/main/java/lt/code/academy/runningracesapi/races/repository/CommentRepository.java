package lt.code.academy.runningracesapi.races.repository;

import lt.code.academy.runningracesapi.races.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<CommentEntity, UUID> {
    List<CommentEntity> findCommentEntitiesByRaceId(UUID raceId);
}
