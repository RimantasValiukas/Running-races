package lt.code.academy.runningracesapi.races.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class RaceNotExistRuntimeException extends RuntimeException{
    private final UUID raceId;
}
