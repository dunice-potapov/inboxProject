# Very Simple Inbox

This project is a simple inbox that get emails list from Gmail using users Google account for it.

## Getting Started

To get you started you can simply clone the Very Simple Inbox repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

Npm is installed as part of node.

Also you need to install Bower as front-end package manager [https://bower.io/](https://bower.io/)

You need GULP to run the project using GULP

```
npm install --global gulp-cli
```
[https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Clone Very Simple Inbox

```
git clone https://dunice-potapov@bitbucket.org/dunice-potapov/inboxproject.git
cd inboxproject
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

```
gulp webserver
```

It will open the app at `http://localhost:8000`.

or

```
npm start
```

Now browse to the app at `http://localhost:5000`.

*Please be sure that you allow popups in your browser for sing in to Google account*

You will see the list of latest emails from your Gmail account divided by categories: Today, Yesterday, This week, This year, Before this year

If you want to see more emails please scroll down it will autoload next 15 emails.

## Docker using

Please install Docker into your system - [https://www.docker.com/products/overview](https://www.docker.com/products/overview)

and Docker Compose - [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

After it just run

```
docker-compose up
```

When building would be finished please browse to the app at `http://localhost:49160`.

*Please be sure that you allow popups in your browser for sing in to Google account*