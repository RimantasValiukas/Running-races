package lt.code.academy.runningracesapi.races;

import lt.code.academy.runningracesapi.races.dto.Race;
import lt.code.academy.runningracesapi.races.service.RaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/races")
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

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createRace(@RequestBody Race race) {
        raceService.saveRace(race);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{raceId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateRace(@RequestBody Race race, @PathVariable("raceId") UUID raceId) {
        race.setId(raceId);
        raceService.saveRace(race);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{raceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRace(@PathVariable("raceId") UUID raceId) {
        raceService.deleteRace(raceId);
    }

}
