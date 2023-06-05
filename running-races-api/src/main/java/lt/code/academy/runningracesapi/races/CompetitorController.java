package lt.code.academy.runningracesapi.races;

import lt.code.academy.runningracesapi.races.dto.Competitor;
import lt.code.academy.runningracesapi.races.service.CompetitorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/competitors")
public class CompetitorController {

    private final CompetitorService competitorService;

    public CompetitorController(CompetitorService competitorService) {
        this.competitorService = competitorService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Competitor> getCompetitors() {
        return competitorService.getAllCompetitors();
    }

    @GetMapping(value = "/{raceId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Competitor> getCompetitorsByRaceId(@PathVariable UUID raceId) {
        return competitorService.getCompetitorsByRaceId(raceId);
    }

//    @GetMapping(value = "/{competitorId}", produces = MediaType.APPLICATION_JSON_VALUE)
//    public Competitor getCompetitorById(@PathVariable UUID competitorId) {
//        return competitorService.getCompetitor(competitorId);
//    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void createCompetitor(@RequestBody Competitor competitor) {;
        competitorService.saveCompetitor(competitor);
    }

    @DeleteMapping(value = "/{competitorId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompetitor(@PathVariable UUID competitorId) {
        competitorService.deleteCompetitor(competitorId);
    }


}
