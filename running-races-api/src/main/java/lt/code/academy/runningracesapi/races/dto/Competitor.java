package lt.code.academy.runningracesapi.races.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.entity.CompetitorEntity;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Competitor {
    private UUID id;
    private UUID raceId;
    private UUID userId;
    private String name;
    private String surname;
    private Timestamp dateOfBirth;
    private String city;
    private String club;
    private Double distance;
    private Timestamp result;

    public static Competitor convert(CompetitorEntity entity) {
        return new Competitor(
                entity.getCompetitorId(),
                entity.getRaceId(),
                entity.getUserId(),
                entity.getName(),
                entity.getSurname(),
                entity.getDateOfBirth(),
                entity.getCity(),
                entity.getClub(),
                entity.getDistance(),
                entity.getResult()
        );
    }

}
