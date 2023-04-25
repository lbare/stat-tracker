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
    this.R = 0;
    this.RBI = 0;
    this.BB = 0;
    this.IBB = 0;
    this.HBP = 0;
    this.K = 0;
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
    this.K9 = 0.0;
    this.BB9 = 0.0;
    this.H9 = 0.0;
    this.KpBB = 0.0;
    this.BABIPA = 0.0;

    // fielding
    this.PO = 0;
    this.A = 0;
    this.E = 0;

    this.calculateBattingTotals();
    pitching.length === 0
      ? this.calculateSinglePitchingTotals()
      : this.calculateAggregatePitchingTotals();
  }

  calculateBattingTotals() {
    const resultMap = {
      "1B": { H: 1, AB: 1, TB: 1, PA: 1 },
      "2B": { Do: 1, AB: 1, TB: 2, XBH: 1, PA: 1 },
      "3B": { Tr: 1, AB: 1, TB: 3, XBH: 1, PA: 1 },
      HR: { HR: 1, AB: 1, TB: 4, XBH: 1, PA: 1 },
      BB: { BB: 1, PA: 1 },
      IBB: { IBB: 1, PA: 1 },
      SF: { PA: 1 },
      SAC: { PA: 1 },
      HBP: { HBP: 1, PA: 1 },
      K: { K: 1, AB: 1, PA: 1 },
      GIDP: { GIDP: 1, AB: 1, PA: 1 },
      E: { E: 1, AB: 1, PA: 1 },
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

  calculateAggregatePitchingTotals() {
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

  calculateHits() {
    return this.atBats.reduce((totalHits, atBat) => {
      if (["1B", "2B", "3B", "HR"].includes(atBat.result)) {
        return totalHits + 1;
      } else {
        return totalHits;
      }
    }, 0);
  }

  calculateNumAtBats() {
    return this.atBats.reduce((totalAtBats, atBat) => {
      if (
        atBat.result !== "BB" ||
        atBat.result !== "HBP" ||
        atBat.result !== "SF" ||
        atBat.result !== "SAC"
      ) {
        return totalAtBats + 1;
      } else {
        return totalAtBats;
      }
    }, 0);
  }

  calculateRuns() {
    return this.atBats.reduce((totalRuns, atBat) => {
      if (atBat.runScored) {
        return totalRuns + 1;
      } else {
        return totalRuns;
      }
    }, 0);
  }

  calculateRBI() {
    return this.atBats.reduce((totalRBI, atBat) => {
      return totalRBI + atBat.RBI;
    }, 0);
  }

  calculateWalks() {
    return this.atBats.reduce((totalWalks, atBat) => {
      if (atBat.result === "BB") {
        return totalWalks + 1;
      } else {
        return totalWalks;
      }
    }, 0);
  }

  calculateStolenBases() {
    return this.atBats.reduce((totalSB, atBat) => {
      return totalSB + atBat.stolenBases;
    }, 0);
  }

  calculateCaughtStealing() {
    return this.atBats.reduce((totalCS, atBat) => {
      return totalCS + atBat.caughtStealing;
    }, 0);
  }

  getAVG() {
    return this.atBats === 0 ? 0 : this.hits / this.atBats;
  }

  getOBP() {
    return this.atBats === 0 ? 0 : (this.hits + this.walks) / this.atBats;
  }

  getSLG() {
    return this.atBats === 0
      ? 0
      : (this.hits + this.doubles + this.triples * 2 + this.homeRuns * 3) /
          this.atBats;
  }

  getOPS() {
    return this.atBats === 0
      ? 0
      : (this.hits +
          this.doubles +
          this.triples * 2 +
          this.homeRuns * 3 +
          this.walks) /
          this.atBats;
  }

  getERA() {
    return this.inningsPitched === 0
      ? 0
      : (this.earnedRuns * 9) / this.inningsPitched;
  }

  getWHIP() {
    return this.inningsPitched === 0
      ? 0
      : (this.walks + this.hits) / this.inningsPitched;
  }

  getKPer7() {
    return this.inningsPitched === 0
      ? 0
      : (this.strikeouts * 7) / this.inningsPitched;
  }

  getBBPer7() {
    return this.inningsPitched === 0
      ? 0
      : (this.walks * 7) / this.inningsPitched;
  }

  getHPer7() {
    return this.inningsPitched === 0
      ? 0
      : (this.hits * 7) / this.inningsPitched;
  }

  getKPerBB() {
    return this.walks === 0 ? 0 : this.strikeouts / this.walks;
  }

  getBABIP() {
    return this.atBats === 0
      ? 0
      : (this.hits - this.homeRuns) /
          (this.atBats - this.strikeouts - this.homeRuns + this.sacFlies);
  }

  getISO() {
    return this.atBats === 0
      ? 0
      : (this.doubles + this.triples * 2 + this.homeRuns * 3) / this.atBats;
  }
}
