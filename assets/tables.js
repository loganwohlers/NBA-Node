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

module.exports = { teams_table, seasons_table, players_table, player_seasons_table }