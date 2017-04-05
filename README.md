fx-u-like
=========

Installation
------------

Using [Bundler](http://bundler.io/):

```
$ bundle install
```

(Pre-)fetching rates
--------------------

Rates are provided by

Use the following command to fetch the latest version of that file:

```
$ bundle exec rake rates:update
```

This should ideally be run on a daily schedule e.g., `cron`
