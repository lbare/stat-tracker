export const getAVG = (hits, atBats) => (atBats === 0 ? 0 : hits / atBats);

export const getOBP = (hits, walks, atBats) =>
  atBats === 0 ? 0 : (hits + walks) / atBats;

export const getSLG = (hits, doubles, triples, homeRuns, atBats) =>
  atBats === 0 ? 0 : (hits + doubles + triples * 2 + homeRuns * 3) / atBats;

export const getOPS = (hits, doubles, triples, homeRuns, walks, atBats) =>
  atBats === 0
    ? 0
    : (hits + doubles + triples * 2 + homeRuns * 3 + walks) / atBats;

export const getERA = (earnedRuns, inningsPitched) =>
  inningsPitched === 0 ? 0 : (earnedRuns * 9) / inningsPitched;

export const getWHIP = (walks, hits, inningsPitched) =>
  inningsPitched === 0 ? 0 : (walks + hits) / inningsPitched;

export const getKPer7 = (strikeouts, inningsPitched) =>
  inningsPitched === 0 ? 0 : (strikeouts * 7) / inningsPitched;

export const getBBPer7 = (walks, inningsPitched) =>
  inningsPitched === 0 ? 0 : (walks * 7) / inningsPitched;

export const getHPer7 = (hits, inningsPitched) =>
  inningsPitched === 0 ? 0 : (hits * 7) / inningsPitched;

export const getKPerBB = (strikeouts, walks) =>
  walks === 0 ? 0 : strikeouts / walks;
