const teams_table = `
CREATE TABLE IF NOT EXISTS teams
(
    team_id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) UNIQUE NOT NULL,
    city VARCHAR(255) NOT NULL,
    conference VARCHAR(255) NOT NULL,
    division VARCHAR(255) NOT NULL,
    team_code VARCHAR(255) UNIQUE NOT NULL
)`

const seasons_table = `
CREATE TABLE IF NOT EXISTS seasons
(
    season_id SERIAL UNIQUE PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL
)`

const players_table = `
CREATE TABLE IF NOT EXISTS players
(
    player_id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
)`

const player_seasons_table = `
CREATE TABLE IF NOT EXISTS player_seasons
(
    player_season_id SERIAL UNIQUE PRIMARY KEY,
    player_id INTEGER,
    name VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY(player_id) REFERENCES players(player_id)
)`


// team: {
//     type: mongoose.Schema.Types.ObjectId,
//         ref: 'Team',
//     },
// season: {
//     type: mongoose.Schema.Types.ObjectId,
//         ref: 'Season',
//     },
//age
// g
// gs
// pos
// fg2_per_g
// fg2a_per_g
// fg2_pct
// trb_per_g
// mp_per_g
// fg_per_g
// fga_per_g
// fg_pct
// fg3_per_g
// fg3a_per_g
// fg3_pct
// efg_pct
// ft_per_g
// fta_per_g
// ft_pct
// orb_per_g
// drb_per_g
// ast_per_g
// stl_per_g
// blk_per_g
// tov_per_g
// pf_per_g
// pts_per_g


module.exports = { teams_table, seasons_table, players_table, player_seasons_table }