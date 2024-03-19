# Grafana DOT Diagram Panel Plugin

[![License](https://img.shields.io/github/license/briangann/briangann-dotdiagram-panel)](LICENSE)
[![Twitter Follow](https://img.shields.io/twitter/follow/jepetlefeu.svg?style=social)](https://twitter.com/jepetlefeu)
![Release](https://github.com/briangann/briangann-dotdiagram-panel/workflows/Release/badge.svg)
[![Build](https://github.com/briangann/briangann-dotdiagram-panel/workflows/CI/badge.svg)](https://github.com/briangann/briangann-dotdiagram-panel/actions?query=workflow%3A%22CI%22)
[![Known Vulnerabilities](https://snyk.io/test/github/briangann/briangann-dotdiagram-panel/badge.svg)](https://snyk.io/test/github/briangann/briangann-dotdiagram-panel)
[![Maintainability](https://api.codeclimate.com/v1/badges/6990a726f92be6f2e470/maintainability)](https://codeclimate.com/github/briangann/briangann-dotdiagram-panel/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6990a726f92be6f2e470/test_coverage)](https://codeclimate.com/github/briangann/briangann-dotdiagram-panel/test_coverage)

# Screenshots

![Panel Example](https://raw.githubusercontent.com/briangann/briangann-dotdiagram-panel/master/src/screenshots/panel-example.png)

# Configuration Editor

# Overrides

# Composites

# Link Notation

### Docker Support

A docker-compose.yml file is include for easy development and testing, just run
```
docker-compose up
```

Then browse to http://localhost:3000

## External Dependencies

* Grafana 10.3.x

## TODO

## Build Dependencies

* yarn v4 (berry)
* Node v20

## Building

```
yarn
yarn build
```

For development, you can run:
```
yarn dev
```

## Acknowledgements

- This plugin is based on another excellent D3 example by Mike Bostock [Graph-o-Matic](https://beta.observablehq.com/@mbostock/graph-o-matic)
- React integration is based on this tutorial by [Oliver Caldwell](https://oli.me.uk/d3-within-react-the-right-way/)
- Addition React ideas derived from this example by [Thibaut Tiberghien](https://codesandbox.io/s/github/tibotiber/rfd-animate-example/tree/master/)
