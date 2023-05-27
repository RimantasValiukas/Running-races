package lt.code.academy.runningracesapi.races.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.entity.RaceEntity;

import java.time.LocalDateTime;
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
    private LocalDateTime dateTime;
    private List<Integer> distances;

    public static Race convert(RaceEntity raceEntity) {
        return new Race(
                raceEntity.getRaceId(),
                raceEntity.getName(),
                raceEntity.getAddress(),
                raceEntity.getDescription(),
                raceEntity.getOrganizer(),
                raceEntity.getDateTime(),
                raceEntity.getDistances()
        );
    }

}
