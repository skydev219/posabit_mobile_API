# Mobile API architecture 🛡️

TODO

## Development

We use `node` version `14.9.0`

```
nvm install 14.9.0
```

```
nvm use 14.9.0
```

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```

It uses nodemon for livereloading :peace-fingers:

## Online one-click setup

You can use Gitpod for the one click online setup. With a single click it will launch a workspace and automatically:

- clone the `mobile-api` repo.
- install the dependencies.
- run `cp .env.example .env`.
- run `npm run start`.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

# API Validation

By using [celebrate](https://github.com/arb/celebrate), the req.body schema becomes cleary defined at route level, so even frontend devs can read what an API endpoint expects without needing to write documentation that can get outdated quickly.

```js
route.post(
  '/signup',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  controller.signup,
);
```

**Example error**

```json
{
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
}
```

## API Documentation

To simplify documenting your API, we have included [Optic](https://useoptic.com). To use it, you will need to [install the CLI tool](https://useoptic.com/document/#add-an-optic-specification-to-your-api-project), and then you can use `api exec "npm start"` to start capturing your endpoints as you create them. Once you want to review and add them to your API specification run: `api status -- review`.
