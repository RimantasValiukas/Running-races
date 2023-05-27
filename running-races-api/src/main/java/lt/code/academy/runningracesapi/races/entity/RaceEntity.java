package lt.code.academy.runningracesapi.races.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.dto.Race;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "races")
public class RaceEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID raceId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String organizer;
    @Column(nullable = false)
    private LocalDateTime dateTime;
    @ElementCollection
    @CollectionTable(name = "distances",joinColumns = @JoinColumn(name = "raceId"))
    @Column(name = "distance", nullable = false)
    private List<Integer> distances;

    public static RaceEntity convert(Race race) {
        return new RaceEntity(
                race.getId(),
                race.getName(),
                race.getAddress(),
                race.getDescription(),
                race.getOrganizer(),
                race.getDateTime(),
                race.getDistances()
        );
    }

}