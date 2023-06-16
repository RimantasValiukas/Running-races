package lt.code.academy.runningracesapi.races.service;

import lt.code.academy.runningracesapi.races.dto.Race;
import lt.code.academy.runningracesapi.races.entity.CompetitorEntity;
import lt.code.academy.runningracesapi.races.entity.RaceEntity;
import lt.code.academy.runningracesapi.races.exception.RaceNotExistRuntimeException;
import lt.code.academy.runningracesapi.races.repository.RaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RaceService {

    private final RaceRepository raceRepository;

    public RaceService(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    public void saveRace(Race race) {
        raceRepository.save(RaceEntity.convert(race));
    }

    public Race getRace(UUID raceId) {
        return raceRepository.findById(raceId)
                .map(Race::convert)
                .orElseThrow(() -> new RaceNotExistRuntimeException(raceId));
    }

    public List<Race> getRaces() {
        return raceRepository.findAll()
                .stream()
                .map(Race::convert)
                .toList();
    }

    public void deleteRace(UUID raceId) {
        raceRepository.deleteById(raceId);
    }
}
