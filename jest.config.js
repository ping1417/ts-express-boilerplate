module.exports = {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    "testRegex": "src/.*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "coveragePathIgnorePatterns": [
      ".*\\.interface\\.ts$",
      ".*\\.client\\.ts$",
      ".*\\.constants\\.ts$",
      ".*\\.mock\\.ts$",
      "/src/main\\.ts$",
      "/src/swagger/swagger-options\\.ts$",
      "/src/scripts/env\\.ts$"
    ],
    "collectCoverage": true,
    "coverageDirectory": "./coverage",
    "coverageReporters": ["html", "text", "text-summary"],
    "coverageThreshold": {
      "global": {
        "branches": 55,
        "functions": 75,
        "lines": 65,
        "statements": 65
      }
    },
    "testEnvironment": "node"
  };
  