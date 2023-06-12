package lt.code.academy.runningracesapi.users.dto;

import lombok.AllArgsConstructor;
import lt.code.academy.runningracesapi.users.entity.RoleEntity;
import org.springframework.security.core.GrantedAuthority;

import java.util.UUID;

@AllArgsConstructor
public class Role implements GrantedAuthority {
    private static final String ROLE_PREFIX = "ROLE_";
    private UUID id;
    private String name;

    @Override
    public String getAuthority() {
        return ROLE_PREFIX + name;
    }

    public static Role convert(RoleEntity entity) {
        return new Role(entity.getId(), entity.getName());
    }
}

