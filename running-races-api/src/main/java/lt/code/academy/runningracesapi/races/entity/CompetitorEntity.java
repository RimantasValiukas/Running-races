package lt.code.academy.runningracesapi.races.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.code.academy.runningracesapi.races.dto.Competitor;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "competitors")
public class CompetitorEntity {
    @Id
    @GeneratedValue
    @Column(updatable = false)
    private UUID competitorId;
    @Column(insertable = false, updatable = false)
    private UUID raceId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Column(nullable = false)
    private Timestamp dateOfBirth;
    @Column(nullable = false)
    private String city;
    @Column
    private String club;
    @Column(nullable = false)
    private Double distance;
    @Column
    private Timestamp result;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "raceId")
    private RaceEntity raceEntity;

    public static CompetitorEntity convert(Competitor competitor) {
        return new CompetitorEntity(
                competitor.getId(),
                competitor.getRaceId(),
                competitor.getName(),
                competitor.getSurname(),
                competitor.getDateOfBirth(),
                competitor.getCity(),
                competitor.getClub(),
                competitor.getDistance(),
                competitor.getResult(),
                null
        );
    }

}
