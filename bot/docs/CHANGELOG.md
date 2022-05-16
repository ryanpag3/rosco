# [1.1.0-beta.58](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.57...v1.1.0-beta.58) (2022-05-16)


### Bug Fixes

* user keywords should now work properly ([8f21878](https://github.com/ryanpag3/guac-bot/commit/8f21878cf32818428f7d8920a7a7c1604170897c))

# [1.1.0-beta.57](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.56...v1.1.0-beta.57) (2022-04-30)


### Bug Fixes

* when a keyword already exists with a specified name, Rosco will now throw a descriptive error instead of an internal server error ([4e1e3fc](https://github.com/ryanpag3/guac-bot/commit/4e1e3fca3db18bf0256b78676eafc1e64179a4a0))

# [1.1.0-beta.56](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.55...v1.1.0-beta.56) (2022-04-30)


### Bug Fixes

* minor update to address crashes ([f9c642d](https://github.com/ryanpag3/guac-bot/commit/f9c642d8bebada876b144680885daffe6abfe21c))

# [1.1.0-beta.55](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.54...v1.1.0-beta.55) (2022-04-30)


### Bug Fixes

* fix database schema migration ([584a843](https://github.com/ryanpag3/guac-bot/commit/584a84334464782f5f24382b4387470e45a4848b))


### Reverts

* Revert "Revert "cut a release"" ([e461502](https://github.com/ryanpag3/guac-bot/commit/e4615028322b7e70a9cc98229264cec474a3b933))

# [1.1.0-beta.54](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.53...v1.1.0-beta.54) (2022-04-30)


### Bug Fixes

* get Rosco working again ([236ca0f](https://github.com/ryanpag3/guac-bot/commit/236ca0f2e2fbc08e82e634f40f56699f16a11cfe))

# [1.1.0-beta.53](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.52...v1.1.0-beta.53) (2022-04-29)


### Bug Fixes

* add a unique 'name' field to keywords allowing easier management of existing keywords ([8dc738e](https://github.com/ryanpag3/guac-bot/commit/8dc738ec1fe68253342a16629281b300bfaf1cba))


### Features

* add ability to announce when a keyword has been triggered ([7938768](https://github.com/ryanpag3/guac-bot/commit/7938768d5b4451698722abf5fb13bcb69e5c2d16))

# [1.1.0-beta.52](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.51...v1.1.0-beta.52) (2022-04-23)


### Bug Fixes

* [#130](https://github.com/ryanpag3/guac-bot/issues/130) when running  with several roles assigned to each command, the bot will no longer throw an internal server error ([db68c99](https://github.com/ryanpag3/guac-bot/commit/db68c996c84b8ce2aefcb506fed7354116f1cc4d))

# [1.1.0-beta.51](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.50...v1.1.0-beta.51) (2022-04-14)


### Bug Fixes

* If multiple keywords are defined, only the valid ones will trigger an action. ([0c158d3](https://github.com/ryanpag3/guac-bot/commit/0c158d3601a941d4be303bdd6d2cd41bc94a545e))

# [1.1.0-beta.50](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.49...v1.1.0-beta.50) (2022-04-14)


### Bug Fixes

* fix keyword command to filter on server ([7ab7774](https://github.com/ryanpag3/guac-bot/commit/7ab77746ce6dc6df05f444445e22df80d2784e51))

# [1.1.0-beta.49](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.48...v1.1.0-beta.49) (2022-04-13)


### Bug Fixes

* Fixed an internal server error getting thrown when permissions have been set on the bot-to-bot command ([e56e83a](https://github.com/ryanpag3/guac-bot/commit/e56e83a1e7cc00a9493a941ad55082c44f8b1685))

# [1.1.0-beta.48](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.47...v1.1.0-beta.48) (2022-04-13)


### Features

* Added support for creating multiple scores in one create command ([0e80a1d](https://github.com/ryanpag3/guac-bot/commit/0e80a1d433cb66a8f75183902cd3c98c8cf1f1fa))

# [1.1.0-beta.47](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.46...v1.1.0-beta.47) (2022-04-13)


### Bug Fixes

* the correct build version should now show on bot activity ([ae1bacb](https://github.com/ryanpag3/guac-bot/commit/ae1bacbfbc976e29047e1532d8725047fd66c8e0))

# [1.1.0-beta.46](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.45...v1.1.0-beta.46) (2022-04-12)


### Bug Fixes

* fix automated tests failing intermittently ([2dadd8e](https://github.com/ryanpag3/guac-bot/commit/2dadd8e86959819091d5aa6d6880a9eb084f0a41))

# [1.1.0-beta.45](https://github.com/ryanpag3/guac-bot/compare/v1.1.0-beta.44...v1.1.0-beta.45) (2022-04-12)


### Features

* Rosco will now announce new updates automatically with patch notes ([6aa2302](https://github.com/ryanpag3/guac-bot/commit/6aa23029977949aade6d4058e9ec30cb6fc8bf7b))
