# Scribes of the Cairo Geniza

The University of Pennsylvania Libraries, in partnership with the
Princeton Geniza Lab, the Library of the Jewish Theological Seminary, and the
Genizah Research Unit at Cambridge University Library share Cairo Geniza fragments
with the Zooniverse community for the first time!

## Usage

__Install the dependencies:__

`npm install`

__Test:__

```npm run test```

__Development mode with livereload:__

```npm run start```

__When you are done, create a production-ready version of the JS bundle:__

```npm run build```

## Deployment

Deployment is handled by Github Action. Both staging and production deployment can be run ad hoc in the actions tab as needed if you have the appropriate permissions on the repository.

### Staging

This app does not have a staging deployment.

### Production

Production deployments are triggered by an update to which commit the `production-release` tag is pointed to. This tag should be updated via chat ops and then a Github Action will run that builds and uploads the files to our cloud provider found at `https://www.scribesofthecairogeniza.org/`.

## Credits

Based on the [Zooniverse Redux starter template](https://github.com/zooniverse/zoo-reduxify/),
which in turn was based on the original [React Starterify](https://github.com/Granze/react-starterify)
(used under the [MIT License](http://opensource.org/licenses/MIT)).

## License

Copyright 2015 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
