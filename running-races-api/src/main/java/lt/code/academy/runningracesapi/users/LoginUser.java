package lt.code.academy.runningracesapi.users;

import lombok.Getter;
import lt.code.academy.runningracesapi.users.dto.Role;
import lt.code.academy.runningracesapi.users.dto.User;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class LoginUser {
    private final String fullName;
    private final String username;
    private final Set<String> roles;

    public LoginUser(User user) {
        fullName = user.getFullName();
        username = user.getUsername();
        roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }
}
