package lt.code.academy.runningracesapi.races.service;

import lt.code.academy.runningracesapi.races.dto.Comment;
import lt.code.academy.runningracesapi.races.entity.CommentEntity;
import lt.code.academy.runningracesapi.races.repository.CommentRepository;
import lt.code.academy.runningracesapi.races.repository.RaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final RaceRepository raceRepository;

    public CommentService(CommentRepository commentRepository, RaceRepository raceRepository) {
        this.commentRepository = commentRepository;
        this.raceRepository = raceRepository;
    }

    public void createComment(Comment comment) {
        CommentEntity commentEntity = CommentEntity.convert(comment);
        commentEntity.setRaceEntity(raceRepository.getReferenceById(comment.getRaceId()));
        commentRepository.save(commentEntity);
    }

    public List<Comment> getCommentsByRaceId(UUID raceId) {
        return commentRepository.findCommentEntitiesByRaceId(raceId)
                .stream()
                .map(Comment::convert)
                .toList();
    }

    public Comment getComment(UUID commentId) {
        return Comment.convert(commentRepository.getReferenceById(commentId));
    }

    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }
}
