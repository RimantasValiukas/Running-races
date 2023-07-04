package lt.code.academy.runningracesapi.races.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.dto.Comment;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "comments")
public class CommentEntity {
    @Id
    @GeneratedValue
    @Column(updatable = false)
    private UUID commentId;
    @Column(insertable = false, updatable = false)
    private UUID raceId;
    @Column(insertable = false, updatable = false)
    private UUID userId;
    @Column(nullable = false, length = 1000)
    private String comment;
    @Column(nullable = false)
    private Timestamp dateTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "raceId")
    private RaceEntity raceEntity;

    public static CommentEntity convert (Comment comment) {
        return new CommentEntity(
                comment.getCommentId(),
                comment.getRaceId(),
                comment.getUserId(),
                comment.getComment(),
                comment.getDateTime(),
                null
        );
    }

}
