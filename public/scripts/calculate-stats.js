calcGameStats() {
    if (this.scoredPoints) {
        this.team1Score = this.scoredPoints.filter(sp => sp.scored === this.team1Name).length;
        this.team2Score = this.scoredPoints.filter(sp => sp.scored === this.team2Name).length;

        this.team1OTurns = this.scoredPoints.reduce((count, sp) => { return count = sp.team1OorD === 'O' ? count + sp.team1Turnovers : count }, 0);
        this.team1DTurns = this.scoredPoints.reduce((count, sp) => { return count = sp.team1OorD === 'D' ? count + sp.team1Turnovers : count }, 0);
        this.team2OTurns = this.scoredPoints.reduce((count, sp) => { return count = sp.team2OorD === 'O' ? count + sp.team2Turnovers : count }, 0);
        this.team2DTurns = this.scoredPoints.reduce((count, sp) => { return count = sp.team2OorD === 'D' ? count + sp.team2Turnovers : count }, 0);

        this.team1OPointsPlayed = this.scoredPoints.filter(sp => sp.team1OorD === 'O').length;
        this.team1DPointsPlayed = this.scoredPoints.filter(sp => sp.team1OorD === 'D').length;
        this.team2OPointsPlayed = this.scoredPoints.filter(sp => sp.team2OorD === 'O').length;
        this.team2DPointsPlayed = this.scoredPoints.filter(sp => sp.team2OorD === 'D').length;

        this.team1OConversions = this.scoredPoints.filter(sp => sp.team1OorD === 'O' && sp.scored === this.team1Name).length;
        this.team1DConversions = this.scoredPoints.filter(sp => sp.team1OorD === 'D' && sp.scored === this.team1Name).length;
        this.team2OConversions = this.scoredPoints.filter(sp => sp.team2OorD === 'O' && sp.scored === this.team2Name).length;
        this.team2DConversions = this.scoredPoints.filter(sp => sp.team2OorD === 'D' && sp.scored === this.team2Name).length;

        this.team1DHadDiscPoints = this.scoredPoints.filter(sp => sp.team1OorD === 'D' && sp.team2Turnovers >= 1).length;
        this.team2DHadDiscPoints = this.scoredPoints.filter(sp => sp.team2OorD === 'D' && sp.team1Turnovers >= 1).length;

        this.team1OPerfectConversions = this.scoredPoints.filter(sp => sp.team1OorD === 'O' && sp.team1Turnovers === 0 && sp.scored === this.team1Name).length;
        this.team1DPerfectConversions = this.scoredPoints.filter(sp => sp.team1OorD === 'D' && sp.team1Turnovers === 0 && sp.scored === this.team1Name).length;
        this.team2OPerfectConversions = this.scoredPoints.filter(sp => sp.team2OorD === 'O' && sp.team2Turnovers === 0 && sp.scored === this.team2Name).length;
        this.team2DPerfectConversions = this.scoredPoints.filter(sp => sp.team2OorD === 'D' && sp.team2Turnovers === 0 && sp.scored === this.team2Name).length;

        this.team1ORecoveredPoints = this.scoredPoints.filter(sp => sp.team1OorD === 'O' && sp.team1Turnovers >= 1 && sp.scored === this.team1Name).length;
        this.team1DRecoveredPoints = this.scoredPoints.filter(sp => sp.team1OorD === 'D' && sp.team1Turnovers >= 1 && sp.scored === this.team1Name).length;
        this.team2ORecoveredPoints = this.scoredPoints.filter(sp => sp.team2OorD === 'O' && sp.team2Turnovers >= 1 && sp.scored === this.team2Name).length;
        this.team2DRecoveredPoints = this.scoredPoints.filter(sp => sp.team2OorD === 'D' && sp.team2Turnovers >= 1 && sp.scored === this.team2Name).length;

        this.team1OPotentialRecoveredPoints = this.scoredPoints.filter(sp => sp.team1OorD === 'O' && sp.team1Turnovers >= 1).length;
        this.team1DPotentialRecoveredPoints = this.scoredPoints.filter(sp => sp.team1OorD === 'D' && sp.team1Turnovers >= 1).length;
        this.team2OPotentialRecoveredPoints = this.scoredPoints.filter(sp => sp.team2OorD === 'O' && sp.team2Turnovers >= 1).length;
        this.team2DPotentialRecoveredPoints = this.scoredPoints.filter(sp => sp.team2OorD === 'D' && sp.team2Turnovers >= 1).length;

        this.team1OTotalPasses = this.scoredPoints.reduce((count, sp) => { return count = sp.team1OorD === 'O' ? count + sp.team1Passes : count }, 0);
        this.team1DTotalPasses = this.scoredPoints.reduce((count, sp) => { return count = sp.team1OorD === 'D' ? count + sp.team1Passes : count }, 0);
        this.team2OTotalPasses = this.scoredPoints.reduce((count, sp) => { return count = sp.team2OorD === 'O' ? count + sp.team2Passes : count }, 0);
        this.team2DTotalPasses = this.scoredPoints.reduce((count, sp) => { return count = sp.team2OorD === 'D' ? count + sp.team2Passes : count }, 0);

        this.game.team1Players.forEach(player => {
            player.scores = this.scoredPoints.filter(sp => sp.scoredBy === player.playerId).length;
            player.assists = this.scoredPoints.filter(sp => sp.assistBy === player.playerId).length;
            player.blocks = this.scoredPoints.reduce((count, sp) => {
                if (sp.blockPlayers) { // need to check that there is a blockPlayers object before working on it for backwards compatibility
                    return count = count + sp.blockPlayers.filter(bp => bp === player.playerId).length
                } else {
                    return count = 0
                }
            }, 0);
            player.turnovers = this.scoredPoints.reduce((count, sp) => {
                if (sp.turnoverPlayers) { // need to check that there is a turnoverPlayers object before working on it for backwards compatibility
                    return count = count + sp.turnoverPlayers.filter(tp => tp === player.playerId).length
                } else {
                    return count = 0
                }
            }, 0);
        });
        this.game.team2Players.forEach(player => {
            player.scores = this.scoredPoints.filter(sp => sp.scoredBy === player.playerId).length;
            player.assists = this.scoredPoints.filter(sp => sp.assistBy === player.playerId).length;
            player.blocks = this.scoredPoints.reduce((count, sp) => {
                if (sp.blockPlayers) { // need to check that there is a blockPlayers object before working on it for backwards compatibility
                    return count = count + sp.blockPlayers.filter(bp => bp === player.playerId).length
                } else {
                    return count = 0
                }
            }, 0);
            player.turnovers = this.scoredPoints.reduce((count, sp) => {
                if (sp.turnoverPlayers) { // need to check that there is a turnoverPlayers object before working on it for backwards compatibility
                    return count = count + sp.turnoverPlayers.filter(tp => tp === player.playerId).length
                } else {
                    return count = 0
                }
            }, 0);
        });
    }
}
