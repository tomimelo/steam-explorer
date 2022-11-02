<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tomimelo/steam-explorer">
    <img src="https://cdn.freebiesupply.com/images/large/2x/steam-logo-transparent.png" alt="Steam logo" width="80" height="80">
  </a>

<h3 align="center">Steam Explorer</h3>

  <p align="center">
    An API to search on Steam with extended functionalities
    <br />
    <a href="https://github.com/tomimelo/steam-explorer"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/tomimelo/steam-explorer">View Demo</a>
    ·
    <a href="https://github.com/tomimelo/steam-explorer/issues">Report Bug</a>
    ·
    <a href="https://github.com/tomimelo/steam-explorer/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#methods">Methods</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

API to search on Steam Community. This is not an official Steam Application and it has no connection with Steam nor its developers

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Built With

* [![Node][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

You need to follow some steps to get this running.

## Prerequisites

You need to acquire an API key from Steam. You can acquire one [by filling out this form](https://steamcommunity.com/dev/apikey).

## Installation

Install the package using your package manager of choice.
   ```sh
   npm install steam-explorer --save
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
# Usage

You may then import `SteamExplorer` into your project.

```js
// ES Modules
import { SteamExplorer } from 'steam-explorer';

// CommonJS
const { SteamExplorer } = require('steam-explorer');
```

After that, you need to instantiate the class providing the Steam API key in the config and you're ready to use it!

```js
const steamExplorer = new SteamExplorer({ apiKey: 'YOUR-API-KEY' });

const usersResults = await steamExplorer.findUsers('johndoe')
```

## Methods

### `new SteamExplorer(config) ===> SteamExplorer object`

Constructor to create a new `SteamExplorer` object. You need to provide a `config` object

1.  Constructor Arguments

    -   **config:** {SteamExplorerConfig}. Config object that contains the API key

2.  Example Use

```js

const config = {
  apiKey: 'YOUR-API-KEY'
}

const steamExplorer = new SteamExplorer(config);

```

### `findUsers(q, options) ===> Promise<FindResults<SteamUser>>`
Find users in Steam Community

1.  Method Arguments

    -   **q:** {string}. Username to be searched
    -   **options:** {FindOptions}. Search options. 
    Default values: **page** = 1

2.  Example Use

```js

const config = {
  apiKey: 'YOUR-API-KEY'
}

const steamExplorer = new SteamExplorer(config);

const usersResults = await steamExplorer.findUsers('johndoe')

const moreUsersResults = await steamExplorer.findUsers('johndoe', { page: 2 })
```

<!-- CONTRIBUTING -->
# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
# License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
# Contact

Tomas Melone - [@tomzdotjs](https://twitter.com/tomzdotjs)

Project Link: [https://github.com/tomimelo/steam-explorer](https://github.com/tomimelo/steam-explorer)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/tomimelo/steam-explorer.svg?style=for-the-badge
[contributors-url]: https://github.com/tomimelo/steam-explorer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tomimelo/steam-explorer.svg?style=for-the-badge
[forks-url]: https://github.com/tomimelo/steam-explorer/network/members
[stars-shield]: https://img.shields.io/github/stars/tomimelo/steam-explorer.svg?style=for-the-badge
[stars-url]: https://github.com/tomimelo/steam-explorer/stargazers
[issues-shield]: https://img.shields.io/github/issues/tomimelo/steam-explorer.svg?style=for-the-badge
[issues-url]: https://github.com/tomimelo/steam-explorer/issues
[license-shield]: https://img.shields.io/github/license/tomimelo/steam-explorer.svg?style=for-the-badge
[license-url]: https://github.com/tomimelo/steam-explorer/blob/master/LICENSE.txt
[Node.js]: https://img.shields.io/badge/-Node.js-3C873A?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/
