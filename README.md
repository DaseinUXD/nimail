Nimail | Responsive Email Starterkit
====================

**Nimail** is a starterkit base on the [unofficial Sass port of Ink](https://github.com/faustgertz/sassy-ink) of Zurb's excellent [Ink](http://zurb.com/ink/) responsive email template system. Nimail is integrated into a **Gulp** and **Sass** workflow for automated CSS inlining, editing template with includes partials, uploads assets and easy email testing with [Mailgun](http://www.mailgun.com/).


##### Features :
- BrowserSync livereload development
- Zurb’s Ink template system
- Sass compilation
- Templates compilation using partials includes
- CSS inlining
- FTP uploads
- Sending test email using Mailgun


## Installation

##### Download this repository as a ZIP file or clone it to your local machine :

	git clone git@github.com:hellodeloo/nimail.git


##### You'll also need the following tools :

- [Node.js](http://nodejs.org/)
- [Gulp](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Mailgun](http://www.mailgun.com/) *[API Key]*


##### At the root of your local repository :

1. Duplicate the directory `/nimail-sassy-ink/`  (or nimail-saucy-ink *) and give it the name of your new email
2. Adjust some **vars** and **paths** in the `gulpfile.js` file
3. Add your partial files in the `/partials/` directory
4. Work your html structure in the `index.temp.html` file
5. Add your specific styles in the `/stylesheets/scss/styles.scss` file

##### In the directory structure :
- `index.temp.html` is your main html working file
- `index.html` is the html file that is launched in the livereload server
- `mail.html` is the delivery file with inline styles
- `test.html` is the test sending file with inline styles and absolute images links

```
├── your-new-nimail-sassy-ink/
│   ├── index.html
│   ├── index.temp.html
│   ├── mail.html
│   ├── test.html
│   ├── partials/
│   │   ├── *_.part.html
│   ├── stylesheets/
│   │   ├── css
│   │   ├── scss
```



## Usage

##### First, adjust some vars and paths in the in the `gulpfile.js` file :
- The name of the working directory of your email
- The absolute url where the email images from the test will be accessible
- The FTP directory where the email will be transferred files
- Host of your FTP
- Login of your FTP
- Password of your FTP
- The API Key of your Mailgun account
- The email address of the sender of the email test
- The email address of the email recipient test (can be the email address of your [Litmus](http://www.litmus.com/) ou [Email on acid](http://www.emailonacid.com/) account)
- The subject of your email test


##### Development with `gulp serve`

To compile your assets during development, run `gulp serve` in the command line.  This will do the following :

- Run the BrowserSync livereload development server, it will refresh your browser window with any changes
- Compile the Sass files within the `/scss/` folder and render them in the `/css/` folder
- Compile all partials in the `index.html` file and launch it in the server


##### Deployment with `gulp build`

When you're ready to build your changes, run `gulp build` to do everything the standard command does, with it more:

- Inline the CSS styles in the `mail.html` and `test.html` files
- Insert the media queries styles in the document <head> of the `mail.html` and `test.html` files (so the media queries don't get stripped)
- Replace all images relative links with absolute links in the `test.html` file
- Uploads the files on the ftp folder you use


##### Email Sending with `gulp send`

We use [Mailgun](http://www.mailgun.com/) service to send a test email with your template via the  `gulp send` command line.
You need to register on Mailgun to have an account and an API Key number.


## Notes
*nimail-saucy-ink is a modified [sassy-ink](https://github.com/faustgertz/sassy-ink) containing some ajustememnet as :
- Changing the horizontal gutter widths applied to the grids
- Added support for the visibility classes on Gmail
- Adding a fluid block-grid
- Adding a tiny-only medias-queries
You should find them by searching  /* Saucy Ink custom */ in the scss files (yes i know, i must use a additionnal scss file to put my ajustememnet)

You should see [Email on acid](http://www.emailonacid.com/) tests for **nimail-sassy--ink** [here](https://www.emailonacid.com/app/acidtest/display/summary/Ia7wGO09xB8rsk1u6J8KsxqpQw0Of2s6bf9i2SagmBy1i/shared) and for **nimail-saucy-ink** [here](https://www.emailonacid.com/app/acidtest/display/summary/vntH4QaOytAOSSMrQGQY3DCxuZkdIjOEfzUdzjRPqN4dS/shared).


## Inspired By…
- [Generator Gulp Ink Email](https://github.com/lightingbeetle/generator-gulp-ink-email)
- [Responsive Email Kit](https://github.com/itsahappymedium/responsive-email-kit)