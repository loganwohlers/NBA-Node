const teams_table = `
CREATE TABLE teams
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
CREATE TABLE seasons
(
    season_id SERIAL UNIQUE PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    description VARCHAR(255) UNIQUE NOT NULL,
)`

module.exports = { teams_table, seasons_table }