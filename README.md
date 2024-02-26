# privacyportal/landing-client

This repository contains the source code of the Privacy Portal Landing page & blog.

## Installing dependencies

```bash
npm install
```

## Developing

```bash
# start the server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Committing changes

```bash
# fix code styling prior to pushing changes
npm run format
```

## Building

```bash
# build dev
npm run build

# build staging
npm run build -- --mode staging

# build production
npm run build -- --mode production
```

## Creating a production release

```bash
# switch to production branch
git checkout production

# bump version
npm version patch

# push commit and tag to trigger the creation of a new release
git push origin production --tags
```
