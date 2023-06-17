package lt.code.academy.runningracesapi.users;

import jakarta.validation.Valid;
import lt.code.academy.runningracesapi.users.dto.User;
import lt.code.academy.runningracesapi.users.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
    }
}
