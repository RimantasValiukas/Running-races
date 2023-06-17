package lt.code.academy.runningracesapi.users.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
@Getter
public class UserNotFoundRuntimeException extends RuntimeException{
    private final UUID userId;
}
