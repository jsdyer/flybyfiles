"""Join one reviewed Earth encounter to one JPL orbit solution per object."""
from datetime import datetime
import json
from time import sleep
from urllib.parse import urlencode
from source import fetch, store

CAD = 'https://ssd-api.jpl.nasa.gov/cad.api?'
SBDB = 'https://ssd-api.jpl.nasa.gov/sbdb.api?'
CASES = [('2020 QG','2020-08-15','2020-08-17'), ('2020 VT4','2020-11-12','2020-11-15'),
         ('2023 BU','2023-01-25','2023-01-28'), ('2004 FH','2004-03-17','2004-03-20'),
         ('2019 OK','2019-07-24','2019-07-27'), ('2024 MK','2024-06-28','2024-07-01')]
DISCOVERY_ACCOUNT = 'https://www.jpl.nasa.gov/news/tiny-asteroid-buzzes-by-earth-the-closest-flyby-on-record/'

def collect():
    rows = []
    for name, start, end in CASES:
        u = CAD + urlencode({'des':name,'date-min':start,'date-max':end,'body':'Earth','dist-max':'0.02'})
        obj_url = SBDB + urlencode({'sstr':name,'discovery':'true'})
        near = json.loads(fetch(u))
        sleep(1)
        body = json.loads(fetch(obj_url))
        sleep(1)
        if int(near['count']) != 1:
            raise ValueError('Review encounter window for '+name)
        case = dict(zip(near['fields'],near['data'][0],strict=True))
        when = datetime.strptime(case['cd'],'%Y-%b-%d %H:%M')
        orbit = body['orbit']
        if not orbit['first_obs'] or not body['object']['neo']:
            raise ValueError('Missing orbit information for '+name)
        rows.append(dict(name=name,spkid=body['object']['spkid'],passTime=when.isoformat(timespec='minutes'),
                         distance=float(case['dist']),low=float(case['dist_min']),high=float(case['dist_max']),
                         speed=float(case['v_rel']),timeUncertainty=case['t_sigma_f'],first=orbit['first_obs'],
                         solution=orbit['soln_date'],discovery=body.get('discovery',{}).get('date'),
                         cad=u,orbit=obj_url))
    store(dict(coverage='Selected Earth encounters · 2004–2024',count=len(rows),rows=rows,account=DISCOVERY_ACCOUNT))

if __name__ == '__main__':
    collect()
