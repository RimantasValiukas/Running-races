package lt.code.academy.runningracesapi.races.service;

import lt.code.academy.runningracesapi.races.dto.Competitor;
import lt.code.academy.runningracesapi.races.entity.CompetitorEntity;
import lt.code.academy.runningracesapi.races.exception.CompetitorNotExistRuntimeException;
import lt.code.academy.runningracesapi.races.repository.CompetitorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CompetitorService {
    private final CompetitorRepository competitorRepository;

    public CompetitorService(CompetitorRepository competitorRepository) {
        this.competitorRepository = competitorRepository;
    }

    public void saveCompetitor(Competitor competitor) {
        competitorRepository.save(CompetitorEntity.convert(competitor));
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

    public void deleteCompetitor(UUID competitorId) {
        competitorRepository.deleteById(competitorId);
    }
}
