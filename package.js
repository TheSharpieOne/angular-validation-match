/*global Package*/
// package metadata file for Meteor.js
var packageName = 'silintzir:angular-validation-match';
var where = 'client';
var version = '1.6.0';
var summary = 'Checks if one input matches another [Brought by TheSharpieOne]';
var gitLink = 'https://github.com/TheSharpieOne/angular-validation-match';
var documentationFile = 'README.md';

// Meta-data
Package.describe({
  name: packageName,
  version: version,
  summary: summary,
  git: gitLink,
  documentation: documentationFile
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']); // Meteor versions

  api.use('angular:angular@1.2.0', where); // Dependencies

  api.addFiles('dist/angular-validation-match.js', where); // Files in use
});
