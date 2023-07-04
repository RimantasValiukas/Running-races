package lt.code.academy.runningracesapi.races.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.entity.CommentEntity;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    private UUID commentId;
    private UUID raceId;
    private UUID userId;
    private String comment;
    private Timestamp dateTime;

    public static Comment convert(CommentEntity entity) {
        return new Comment(
                entity.getCommentId(),
                entity.getRaceId(),
                entity.getUserId(),
                entity.getComment(),
                entity.getDateTime()
        );
    }

}
