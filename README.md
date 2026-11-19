# Flyby Files

Check which asteroids were observed before their closest approach to Earth. [Open Flyby Files](https://coolcode.ca/flybyfiles/).

<!-- coolcode:guide -->
Choose 2020 QG and compare the date-only orbit record with JPL’s account of the discovery image. Then select After to find 2020 VT4, whose first observation in the present orbit is dated the following day.
<!-- /coolcode:guide -->

## Data and interpretation

Each of six reviewed Earth passes is fetched from the [JPL Close Approach Data API](https://ssd-api.jpl.nasa.gov/doc/cad.html) and matched by designation with the [Small-Body Database](https://ssd-api.jpl.nasa.gov/doc/sbdb.html). Distances are centre-to-centre, converted at 149,597,870.7 km per au. The reported limits are 3σ encounter-distance estimates. Encounter times are TDB. The app compares calendar dates only. First observation is the earliest measurement used in today’s orbit solution, which may include pre-discovery observations. Discovery metadata can be absent. This curated sample supports comparison and does not cover every flyby. [JPL’s QG discovery account](https://www.jpl.nasa.gov/news/tiny-asteroid-buzzes-by-earth-the-closest-flyby-on-record/) supplies independent timing.

## Reproducing the edition

Run `python3 scripts/refresh.py` from the repository. The monthly GitHub Action checks the sources, validates the offline build and publishes changes. A failed retrieval leaves the previous release available. The retrieval date is separate from the observation period. Results are calculated locally in the browser from the bundled edition. Visitor selections are not uploaded.

Run `node --test tests/*.test.mjs`, `python3 -m unittest discover -s tests` and `python3 scripts/build.py`. Serve `dist/` to preview the standalone site. The Pages workflow also exercises the main interaction and responsive layout in Chromium.
