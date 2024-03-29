package lt.code.academy.runningracesapi.races.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.entity.RaceEntity;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Race {

    private UUID id;
    private String name;
    private String address;
    private String description;
    private String organizer;
    private String imageURL;
    private Timestamp dateTime;
    private List<Double> distances;

    public static Race convert(RaceEntity raceEntity) {
        return new Race(
                raceEntity.getRaceId(),
                raceEntity.getName(),
                raceEntity.getAddress(),
                raceEntity.getDescription(),
                raceEntity.getOrganizer(),
                raceEntity.getImageURL(),
                raceEntity.getDateTime(),
                raceEntity.getDistances()
        );
    }

}
