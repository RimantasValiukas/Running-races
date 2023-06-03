package lt.code.academy.runningracesapi.races.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@RequiredArgsConstructor
public class CompetitorNotExistRuntimeException extends RuntimeException{
    private final UUID competitorId;
}
