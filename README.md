# maple

> Mapping tool for Leeds

## Generating wardnames.json

    jq -c '[.features[] | .properties.wd16nm]' static/wards.json > assets/wardnames.json

## Generating postcodes.json

    ruby script/convert_postcodes.rb /path/to/postcodes.csv > assets/postcodes.json

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
