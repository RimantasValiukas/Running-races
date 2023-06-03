package lt.code.academy.runningracesapi.races.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.dto.Race;

import java.sql.Timestamp;
import java.util.ArrayList;
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
    @Column(nullable = false, length = 2000)
    private String description;
    @Column(nullable = false)
    private String organizer;
    @Column(nullable = false)
    private String imageURL;
    @Column(nullable = false)
    private Timestamp dateTime;
    @ElementCollection
    @CollectionTable(name = "distances",joinColumns = @JoinColumn(name = "raceId"))
    @Column(name = "distance", nullable = false)
    private List<Double> distances;
    @OneToMany(mappedBy = "raceEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompetitorEntity> competitors;

    public static RaceEntity convert(Race race) {
        return new RaceEntity(
                race.getId(),
                race.getName(),
                race.getAddress(),
                race.getDescription(),
                race.getOrganizer(),
                race.getImageURL(),
                race.getDateTime(),
                race.getDistances(),
                new ArrayList<>()
        );
    }

}
