# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove `pm2` from dependencies since it's currently only used inside Docker.

## [0.1.8] - 2021-02-21

### Changed

- Move `pm2` back to `devDependencies`.

## [0.1.7] - 2021-02-21

### Changed

- Make `pm2` a non-dev dependency.

### Security

- Upgrade `axios`, `ini`, `object-path`, and all other upgradable packages.

## [0.1.6] - 2020-10-04

### Changed

- Update package.json's `browserslist`.

### Security

- Upgrade `lodash` and all other upgradable packages.

## [0.1.5] - 2020-10-04

### Fixed

- Type errors.

### Security

- Upgrade the dependencies with known vulnerabitilies and all other upgradable ones.

## [0.1.4] - 2020-03-15

### Security

- Upgrade `acorn` and all other upgradable packages.

## [0.1.3] - 2020-01-08

### Changed

- Use the `--force` flag when deploying to Heroku.

## [0.1.2] - 2020-01-08

### Changed

- Dockerfile's Node image (v12, LTS) and global npm packages (remove Yarn, already installed).

## [0.1.1] - 2020-01-08

### Changed

- Remove `-a` flag from `lintLocales`'s `intl-equalizer` command.

### Security

- Upgrade `serialize-javascript` and all other upgradable packages.

## [0.1.0] - 2019-10-01

### Added

- Initial files.
