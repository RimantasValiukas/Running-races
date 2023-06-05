package lt.code.academy.runningracesapi.races.service;

import lt.code.academy.runningracesapi.races.dto.Competitor;
import lt.code.academy.runningracesapi.races.entity.CompetitorEntity;
import lt.code.academy.runningracesapi.races.exception.CompetitorNotExistRuntimeException;
import lt.code.academy.runningracesapi.races.repository.CompetitorRepository;
import lt.code.academy.runningracesapi.races.repository.RaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompetitorService {
    private final CompetitorRepository competitorRepository;
    private final RaceRepository raceRepository;

    public CompetitorService(CompetitorRepository competitorRepository, RaceRepository raceRepository) {
        this.competitorRepository = competitorRepository;
        this.raceRepository = raceRepository;
    }

    public void saveCompetitor(Competitor competitor) {
        CompetitorEntity competitorEntity = CompetitorEntity.convert(competitor);
        competitorEntity.setRaceEntity(raceRepository.getReferenceById(competitor.getRaceId()));
        competitorRepository.save(competitorEntity);
    }

    public Competitor getCompetitor(UUID competitorId) {
        return competitorRepository.findById(competitorId)
                .map(Competitor::convert)
                .orElseThrow(() -> new CompetitorNotExistRuntimeException(competitorId));
    }

    public List<Competitor> getAllCompetitors() {
        return competitorRepository
                .findAll()
                .stream()
                .map(Competitor::convert)
                .toList();
    }

    public List<Competitor> getCompetitorsByRaceId(UUID raceId) {
       return competitorRepository
               .findCompetitorEntitiesByRaceId(raceId)
               .stream()
               .map(Competitor::convert)
               .toList();
    }

    public void deleteCompetitor(UUID competitorId) {
        competitorRepository.deleteById(competitorId);
    }
}
