export function relativeDay(first,passTime){
  const days=Math.round((Date.parse(first+'T00:00:00Z')-Date.parse(passTime.slice(0,10)+'T00:00:00Z'))/86400000);
  return {days,kind:days===0?'Same day':days<0?'Before':'After'};
}
export const km=au=>au*149597870.7;
