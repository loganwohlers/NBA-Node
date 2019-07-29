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
    pos VARCHAR(255),
    age VARCHAR(255),
    g VARCHAR(255),
    gs VARCHAR(255),
    mp_per_g VARCHAR(255),
    fg_per_g VARCHAR(255),
    fga_per_g VARCHAR(255),
    fg_pct VARCHAR(255),
    fg3_per_g VARCHAR(255),
    fg3a_per_g VARCHAR(255),
    fg3_pct VARCHAR(255),
    fg2_per_g VARCHAR(255),
    fg2a_per_g VARCHAR(255),
    fg2_pct VARCHAR(255),
    efg_pct VARCHAR(255),
    ft_per_g VARCHAR(255),
    fta_per_g VARCHAR(255),
    ft_pct VARCHAR(255),
    orb_per_g VARCHAR(255),
    drb_per_g VARCHAR(255),
    trb_per_g VARCHAR(255),
    ast_per_g VARCHAR(255),
    stl_per_g VARCHAR(255),
    blk_per_g VARCHAR(255),
    tov_per_g VARCHAR(255),
    pf_per_g VARCHAR(255),
    pts_per_g VARCHAR(255),
    FOREIGN KEY(player_id) REFERENCES players(player_id)
)`
// { player: 'Álex Abrines',
//   pos: 'SG',
//   age: '25',
//   team_id: 'OKC',
//   g: '31',
//   gs: '2',
//   mp_per_g: '19.0',
//   fg_per_g: '1.8',
//   fga_per_g: '5.1',
//   fg_pct: '.357',
//   fg3_per_g: '1.3',
//   fg3a_per_g: '4.1',
//   fg3_pct: '.323',
//   fg2_per_g: '0.5',
//   fg2a_per_g: '1.0',
//   fg2_pct: '.500',
//   efg_pct: '.487',
//   ft_per_g: '0.4',
//   fta_per_g: '0.4',
//   ft_pct: '.923',
//   orb_per_g: '0.2',
//   drb_per_g: '1.4',
//   trb_per_g: '1.5',
//   ast_per_g: '0.6',
//   stl_per_g: '0.5',
//   blk_per_g: '0.2',
//   tov_per_g: '0.5',
//   pf_per_g: '1.7',
//   pts_per_g: '5.3' }



module.exports = { teams_table, seasons_table, players_table, player_seasons_table }