# Flyby Files

Check which asteroids were observed before their closest approach to Earth. [Open Flyby Files](https://coolcode.ca/flybyfiles/).

<!-- coolcode:guide -->
Choose 2024 MK. Its present orbit uses a measurement from 2014, while JPL dates its discovery to thirteen days before the 2024 flyby. For 2020 QG, the discovery image came about six hours after closest approach. All six cases link to a NASA or ESA discovery account.
<!-- /coolcode:guide -->

## Data and interpretation

Each of six reviewed Earth passes is fetched from the [JPL Close Approach Data API](https://ssd-api.jpl.nasa.gov/doc/cad.html) and matched by designation with the [Small-Body Database](https://ssd-api.jpl.nasa.gov/doc/sbdb.html). Distances are centre-to-centre, converted at 149,597,870.7 km per au. The reported limits are 3σ encounter-distance estimates. Encounter times are TDB. The app compares calendar dates only. First observation is the earliest measurement used in today’s orbit solution, which may include pre-discovery observations. Discovery metadata can be absent. This curated sample supports comparison and does not cover every flyby. [JPL’s QG discovery account](https://www.jpl.nasa.gov/news/tiny-asteroid-buzzes-by-earth-the-closest-flyby-on-record/) supplies independent timing.

## Reproducing the edition

Run `python3 scripts/refresh.py` from the repository. The monthly GitHub Action checks the sources, validates the offline build and publishes changes. A failed retrieval leaves the previous release available. The retrieval date is separate from the observation period. Results are calculated locally in the browser from the bundled edition. Visitor selections are not uploaded.

Run `node --test tests/*.test.mjs`, `python3 -m unittest discover -s tests` and `python3 scripts/build.py`. Serve `dist/` to preview the standalone site. The Pages workflow also exercises the main interaction and responsive layout in Chromium.

<!-- schedule-reliability -->
## Schedule reliability

Public GitHub repositories can have scheduled workflows disabled after 60 days of inactivity. A separate weekly [schedule guard](.github/workflows/schedule-guard.yml) calls GitHub's enable-workflow API for an explicit list of refresh workflows and itself. It can restore workflows disabled for inactivity, preserves manually disabled workflows, and runs independently of collection failures.

This is an interim mitigation, not a scheduling guarantee: GitHub does not document active-workflow renewal as a permanent exemption, and scheduled runs can be delayed or dropped. A scheduler on our own Linux server is the planned independent trigger. The guard does not collect data, create dummy commits, or change source/check timestamps; successful collection and published data freshness still need monitoring.
<!-- /schedule-reliability -->
