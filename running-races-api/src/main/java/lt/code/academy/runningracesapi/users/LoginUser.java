package lt.code.academy.runningracesapi.users;

import lombok.Getter;
import lt.code.academy.runningracesapi.users.dto.Role;
import lt.code.academy.runningracesapi.users.dto.User;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
public class LoginUser {
    private final String fullName;
    private final UUID userId;
    private final String username;
    private final String name;
    private final String surname;
    private final Timestamp dateOfBirth;
    private final Set<String> roles;

    public LoginUser(User user) {
        fullName = user.getFullName();
        userId = user.getId();
        username = user.getUsername();
        name = user.getName();
        surname = user.getSurname();
        dateOfBirth = user.getDateOfBirth();
        roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }
}
