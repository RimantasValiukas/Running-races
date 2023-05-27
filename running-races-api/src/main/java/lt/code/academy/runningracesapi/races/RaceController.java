package lt.code.academy.runningracesapi.races;

import lt.code.academy.runningracesapi.races.dto.Race;
import lt.code.academy.runningracesapi.races.service.RaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/races")
public class RaceController {

    private final RaceService raceService;

    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Race> getRaces() {
        return raceService.getRaces();
    }

    @GetMapping(value = "/{raceId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Race getRace(@PathVariable("raceId") UUID raceId) {
        return raceService.getRace(raceId);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createRace(@RequestBody Race race) {
        raceService.saveRace(race);
    }

    @PutMapping(value = "/{raceId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateRace(@RequestBody Race race, @PathVariable("raceId") UUID raceId) {
        race.setId(raceId);
        raceService.saveRace(race);
    }

    @DeleteMapping(value = "/{raceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRace(@PathVariable("raceId") UUID raceId) {
        raceService.deleteRace(raceId);
    }

}
