export class StatsCalculator {
  constructor(atBats, pitching) {
    this.atBats = atBats || [];
    this.pitching = pitching || [];

    // batting
    this.H = 0;
    this.Do = 0;
    this.Tr = 0;
    this.HR = 0;
    this.XBH = 0;
    this.TB = 0;
    this.PA = 0;
    this.AB = 0;
    this.Out = 0;
    this.R = 0;
    this.RBI = 0;
    this.BB = 0;
    this.IBB = 0;
    this.HBP = 0;
    this.K = 0;
    this.KL = 0;
    this.KS = 0;
    this.GIDP = 0;
    this.SB = 0;
    this.CS = 0;
    this.SF = 0;
    this.E = 0;
    this.SAC = 0;

    this.AVG = 0.0;
    this.OBP = 0.0;
    this.SLG = 0.0;
    this.OPS = 0.0;
    this.BABIP = 0.0;
    this.ISO = 0.0;
    this.BBpK = 0.0;
    this.BBper = 0.0;
    this.Kper = 0.0;

    // pitching
    this.IP = 0;
    this.BF = 0;
    this.G = 0;
    this.GS = 0;
    this.CG = 0;
    this.QS = 0;
    this.ER = 0;
    this.RA = 0;
    this.BBA = 0;
    this.IBBA = 0;
    this.HBPA = 0;
    this.PK = 0;
    this.EA = 0;
    this.KA = 0;
    this.HA = 0;
    this.W = 0;
    this.L = 0;

    this.ERA = 0.0;
    this.WHIP = 0.0;
    this.BAA = 0.0;
    this.K7 = 0.0;
    this.BB7 = 0.0;
    this.H7 = 0.0;
    this.KpBB = 0.0;
    this.BABIPA = 0.0;

    // fielding
    this.PO = 0;
    this.A = 0;
    this.E = 0;

    this.processData();
  }

  processData() {
    this.calculateBattingTotals();
    this.pitching.length === 0
      ? this.calculateSinglePitchingTotals()
      : this.calculateMultiplePitchingTotals();
    this.calculateAggregateTotals();
  }

  calculateAggregateTotals() {
    this.AVG = this.getAVG();
    this.OBP = this.getOBP();
    this.SLG = this.getSLG();
    this.OPS = this.getOPS();
    this.BABIP = this.getBABIP();
    this.ISO = this.getISO();
    this.BBpK = this.getBBperK();
    this.BBper = this.getBBpercent();
    this.Kper = this.getKpercent();

    this.ERA = this.getERA();
    this.WHIP = this.getWHIP();
    this.BAA = this.getBAA();
    this.K7 = this.getK7();
    this.BB7 = this.getBB7();
    this.H7 = this.getH7();
    this.KpBB = this.getKperBB();
    this.BABIPA = this.getBABIPA();
  }

  calculateBattingTotals() {
    const resultMap = {
      "1B": { H: 1, Si: 1, AB: 1, TB: 1 },
      "2B": { H: 1, Do: 1, AB: 1, TB: 2, XBH: 1 },
      "3B": { H: 1, Tr: 1, AB: 1, TB: 3, XBH: 1 },
      HR: { H: 1, HR: 1, AB: 1, TB: 4, XBH: 1 },
      BB: { BB: 1 },
      IBB: { IBB: 1 },
      Out: { AB: 1 },
      SF: { PA: 1 },
      SAC: { PA: 1 },
      HBP: { HBP: 1 },
      KS: { K: 1, KS: 1, AB: 1 },
      KL: { K: 1, KL: 1, AB: 1 },
      GIDP: { GIDP: 1, AB: 1 },
      E: { E: 1, AB: 1 },
    };

    this.atBats.forEach((atBat) => {
      this.PA++;

      if (atBat.result in resultMap) {
        const updates = resultMap[atBat.result];
        for (const field in updates) {
          this[field] += updates[field];
        }
      }

      this.R += atBat.runScored ? 1 : 0;
      this.RBI += atBat.RBI;
      this.SB += atBat.stolenBases;
      this.CS += atBat.caughtStealing;
    });
  }

  calculateSinglePitchingTotals() {
    this.IP = this.pitching.inningsPitched;
    this.BP =
      this.pitching.inningsPitched * 3 +
      this.pitching.walks +
      this.pitching.intentionalWalks +
      this.pitching.hitByPitch +
      this.pitching.hits +
      this.pitching.errorsAgainst;
    this.G = this.pitching.inningsPitched > 0 ? 1 : 0;
    this.GS = this.pitching.started ? 1 : 0;
    this.CG = this.pitching.completeGame ? 1 : 0;
    this.QS =
      this.pitching.inningsPitched > 4 && this.pitching.earnedRuns < 3 ? 1 : 0;
    this.ER = this.pitching.earnedRuns;
    this.RA = this.pitching.runsAllowed;
    this.BBA = this.pitching.walks;
    this.IBBA = this.pitching.intentionalWalks;
    this.HBPA = this.pitching.hitByPitch;
    this.PK = this.pitching.pickoffs;
    this.EA = this.pitching.errorsAgainst;
    this.KA = this.pitching.strikeouts;
    this.HA = this.pitching.hits;
    this.W = this.pitching.win ? 1 : 0;
    this.L = this.pitching.lose ? 1 : 0;
  }

  calculateMultiplePitchingTotals() {
    this.pitching.forEach((appearance) => {
      this.IP += appearance.inningsPitched;
      this.BP +=
        appearance.inningsPitched * 3 +
        appearance.walks +
        appearance.intentionalWalks +
        appearance.hitByPitch +
        appearance.hits +
        appearance.errorsAgainst;
      this.G += appearance.inningsPitched > 0 ? 1 : 0;
      this.GS += appearance.started ? 1 : 0;
      this.CG += appearance.completeGame ? 1 : 0;
      this.QS +=
        appearance.inningsPitched > 4 && appearance.earnedRuns < 3 ? 1 : 0;
      this.ER += appearance.earnedRuns;
      this.RA += appearance.runsAllowed;
      this.BBA += appearance.walks;
      this.IBBA += appearance.intentionalWalks;
      this.HBPA += appearance.hitByPitch;
      this.PK += appearance.pickoffs;
      this.EA += appearance.errorsAgainst;
      this.KA += appearance.strikeouts;
      this.HA += appearance.hits;
      this.W += appearance.win ? 1 : 0;
      this.L += appearance.lose ? 1 : 0;
    });
  }

  /************/
  /* Hitting */
  /************/

  getH() {
    return this.H || 0;
  }

  get1B() {
    return this.Si || 0;
  }

  get2B() {
    return this.Do || 0;
  }

  get3B() {
    return this.Tr || 0;
  }

  getHR() {
    return this.HR || 0;
  }

  getXBH() {
    return this.XBH || 0;
  }

  getTB() {
    return this.TB || 0;
  }

  getPA() {
    return this.PA || 0;
  }

  getAB() {
    return this.AB || 0;
  }

  getR() {
    return this.R || 0;
  }

  getRBI() {
    return this.RBI || 0;
  }

  getBB() {
    return this.BB || 0;
  }

  getIBB() {
    return this.IBB || 0;
  }

  getHBP() {
    return this.HBP || 0;
  }

  getK() {
    return this.K || 0;
  }

  getGIDP() {
    return this.GIDP || 0;
  }

  getSB() {
    return this.SB || 0;
  }

  getCS() {
    return this.CS || 0;
  }

  getSF() {
    return this.SF || 0;
  }

  getE() {
    return this.E || 0;
  }

  getSAC() {
    return this.SAC || 0;
  }

  getAVG() {
    return this.AB === 0 ? 0 : this.H / this.AB;
  }

  getOBP() {
    return this.PA === 0
      ? 0
      : (this.H + this.BB + this.HBP) /
          (this.AB + this.BB + this.HBP + this.SF);
  }

  getSLG() {
    return this.AB === 0 ? 0 : this.TB / this.AB;
  }

  getOPS() {
    return this.OBP + this.SLG || 0;
  }

  getBABIP() {
    return this.AB === 0
      ? 0
      : (this.H - this.HR) / (this.AB - this.K - this.HR);
  }

  getISO() {
    return this.AB === 0 ? 0 : this.SLG - this.AVG;
  }

  getBBperK() {
    return this.K === 0 ? 0 : this.BB / this.K;
  }

  getBBpercent() {
    return this.PA === 0 ? 0 : this.BB / this.PA;
  }

  getKpercent() {
    return this.PA === 0 ? 0 : this.K / this.PA;
  }

  /************/
  /* Pitching */
  /************/

  getIP() {
    return this.IP;
  }

  getBF() {
    return this.BF;
  }

  getG() {
    return this.G;
  }

  getGS() {
    return this.GS;
  }

  getCG() {
    return this.CG;
  }

  getQS() {
    return this.QS;
  }

  getER() {
    return this.ER;
  }

  getRA() {
    return this.RA;
  }

  getBBA() {
    return this.BBA;
  }

  getIBBA() {
    return this.IBBA;
  }

  getHBPA() {
    return this.HBPA;
  }

  getPK() {
    return this.PK;
  }

  getEA() {
    return this.EA;
  }

  getKA() {
    return this.KA;
  }

  getHA() {
    return this.HA;
  }

  getW() {
    return this.W;
  }

  getL() {
    return this.L;
  }

  getERA() {
    return this.IP === 0 ? 0 : (this.ER * 9) / this.IP;
  }

  getWHIP() {
    return this.IP === 0 ? 0 : (this.BBA + this.HA) / this.IP;
  }

  getBAA() {
    return this.IP === 0 ? 0 : (this.HA * 7) / this.IP;
  }

  getK7() {
    return this.IP === 0 ? 0 : (this.KA * 7) / this.IP;
  }

  getBB7() {
    return this.IP === 0 ? 0 : (this.BBA * 7) / this.IP;
  }

  getH7() {
    return this.IP === 0 ? 0 : (this.HA * 7) / this.IP;
  }

  getKperBB() {
    return this.BBA === 0 ? 0 : this.KA / this.BBA;
  }

  getBABIPA() {
    return this.IP === 0 ? 0 : (this.HA - this.HRA) / (this.IP - this.KA);
  }
}
