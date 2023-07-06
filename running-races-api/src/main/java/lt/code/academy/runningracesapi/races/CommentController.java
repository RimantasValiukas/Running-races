package lt.code.academy.runningracesapi.races;

import lt.code.academy.runningracesapi.races.dto.Comment;
import lt.code.academy.runningracesapi.races.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value = "/{raceId}/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comment> getComments(@PathVariable UUID raceId) {
        return commentService.getCommentsByRaceId(raceId);
    }

    @GetMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Comment getCommentById(@PathVariable UUID commentId) {
        return commentService.getComment(commentId);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createComment(@RequestBody Comment comment) {
        commentService.createComment(comment);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
    }

}
