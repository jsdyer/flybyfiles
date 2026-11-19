import {accounts} from './accounts.mjs';
import {el,fmt,options,source,table,start} from './ui.mjs';
import {relativeDay,km} from './model.mjs';
start(data=>{
  options('kind',['All','Before','Same day','After'].map(v=>[v,v]));
  const reviewed = data.rows.map(row => accounts[row.name]).filter(Boolean);
  const prior = reviewed.filter(account => account.timing === 'Before').length;
  const after = reviewed.filter(account => account.timing === 'After').length;
  el('sample-result').textContent = 'The discovery accounts place ' + prior + ' discoveries before closest approach and ' +
    after + ' after it across ' + reviewed.length + ' reviewed cases. The sample is selected and cannot estimate the detection rate for all asteroids.';
  function show(){
    const current=data.rows.find(r=>r.name===el('object').value);
    if(!current){el('result').textContent='No matching encounters.';return;}
    const timing=relativeDay(current.first,current.passTime);
    el('name').textContent=current.name;
    el('result').textContent=timing.days===0?'First observation and encounter on the same calendar day':
      'First observation '+fmt(Math.abs(timing.days),0)+' calendar '+(Math.abs(timing.days)===1?'day':'days')+' '+timing.kind.toLowerCase()+' the encounter';
    const account=accounts[current.name];
    el('evidence').textContent=account?.detail || 'This edition has no separate discovery account for this encounter.';
    el('discovery-report').hidden=!account;
    if(account) source('discovery-report',account.source);
    table('facts',['Record','Published value'],[
      ['Closest approach to Earth (TDB)',current.passTime.replace('T',' ')],
      ['Time uncertainty (JPL, ±)',current.timeUncertainty],['First observation used for orbit',current.first],
      ['Discovery date in SBDB',current.discovery??'Unreported'],['Orbit solution date (JPL)',current.solution],
      ['Nominal distance, centre to centre',fmt(km(current.distance),0)+' km'],
      ['3σ distance range',fmt(km(current.low),0)+'–'+fmt(km(current.high),0)+' km'],
      ['Relative speed at encounter',fmt(current.speed,2)+' km/s']]);
    source('cad',current.cad);source('orbit',current.orbit);
  }
  function filter(){
    const chosen=el('kind').value;
    const items=data.rows.filter(r=>chosen==='All'||relativeDay(r.first,r.passTime).kind===chosen);
    options('object',items.map(r=>[r.name,r.name]),el('object').value);
    table('rows',['Asteroid','Approach day (TDB)','First observation in orbit','Orbit date vs pass','Discovery vs pass'],items.map(r=>[r.name,r.passTime.slice(0,10),r.first,relativeDay(r.first,r.passTime).kind,accounts[r.name]?.timing ?? 'Unreviewed']));
    show();
  }
  el('kind').onchange=filter;el('object').onchange=show;filter();
});
