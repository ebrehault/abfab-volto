# abfab-volto

This is the frontent add-on implementing AbFab for Plone.

It requires https://github.com/ebrehault/abfab.plone to be installed on the server side.

# Why? What for?

The main objective behind AbFab is to provide a way to make frontend easy, fun, and pleasant.

Client-side technics do improve the user experience, nevertheless they should not damage the developer experience. Bundling is not scalable, adding a new page to an existing app should not involve to re-deploy the entire thing.

AbFab is not meant to be a gigantic framework covering thousands of use cases. It targets small features that could probably be implemented in more classical ways, but you just do not want to deploy too many things (like a database, a bunch of backend endpoints, a security layer, a frontend app, etc.), or maybe you do not want to pollute your existing stack with extra dependencies just to achieve a small widget in one given page of your entire app.

AbFab is an all-in-one platform allowing to develop simple frontend components that can be published anywhere.

## Description

AbFab is a web application publication environment. It provides the essential services any web application needs:

- a secured and fast backend storage,
- a minimalistic yet powerful frontend component framework (Svelte),
- a light JavaScript runtime offering routing and backend connectivity.

Components are written in Svelte, they are compiled in the browser (you do not need a local NPM), stored in the Plone site (in a soup, see [https://pypi.org/project/souper.plone/](https://pypi.org/project/souper.plone/)), and can be published to any page as a web component.

## Simple things must be simple

**No bundle and no static files**: You will not have to use NPM, you will not need to bundle your code. All the components and data are on the server, there is no need to generate and deploy static files.

**Code-splitting**: Each component is compiled automatically and independently, and each page of your app will load only the needed components.

**Client-side navigation**: Navigation from one page to another is performed by loading only the missing data and the application renders it on the client-side, so the application is always fast. It behaves as a Single-Page-App, but it's not.

**Component approach**: Components are an efficient way to structure an app (HTML is built that way actually). You should be able use them outside the SPA pattern.

## Do you need to learn a new technology? NO :)

**LOW CODE**: To develop an AbFab app, you will just need HTML, CSS and (simple) JavaScript. Svelte could be considered as a templating layer, it is very simple to learn and to use and will not be a blocker.

**LOW DEPLOYMENT**: AbFab is not just a frontend solution, it comes with backend capabilities, your component are stored in the site directly.

**LOW BUILD**: Components can be developed directly from the AbFab online interface. No NPM, no bundling.

## Installation

- Install abfab.plone with `pip`:

  ```
      $ pip install abfab.plone
  ```

  Or using buildout:

  ```
      [buildout]

      ...

      eggs =
          abfab.plone
  ```

  and then running `bin/buildout`

- Raise the upload max size limit in `zope.conf`:

  ```
    <dos_protection>
        form-memory-limit 4MB
    </dos_protection>
  ```

- In Volto, add abfab-volto to your `package.json`:

  ```js
      {
        "name": "my-nice-volto-project",
        ...
        "addons": [
          "abfab-volto",
          ...
        ],
        ...
      }
  ```

Then, restart your Plone server and Volto, go to the Site settings and install the AbFab add-on.

Before using AbFab, you need to upload the Svelte library and the AbFab editor implementation (the AbFab editor is based on AbFab itself, it is not Volto-based, it must be uploaded to your server). Go to your Volto project, and run the following commands:

```
npx abfab-upload --path ./svelte
npx abfab-upload --local-root node_modules/abfab-volto/client --path ./abfab --target-path /
```

The `abfab-upload` script allows to upload local source to your AbFab instance. It accepst the following parameters:

- `--path`: The folder (or file) path to upload
- `--local-root`: The root from where relatives paths will be computed locally. Default is `./node_modules`.
- `--target-root`: The root from where relatives paths will be computed locally. Default is `/node_modules`.
- `--server`: The Plone server url. Default is `http://localhost:8080/Plone`.
- `--username`: The admin username. Default is `admin`.
- `--password`: The admin password. Default is `secret`.

## Author

Eric Bréhault

## Inspiration

Dawn French, Jennifer Saunders and Joanna Lumley.

## Contribute

- Issue Tracker: https://github.com/ebrehault/abfab.plone/issues
- Source Code: https://github.com/ebrehault/abfab.plone

## License

The project is licensed under the MIT.
