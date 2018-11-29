'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/page-query')
var RuleTester = require('eslint').RuleTester;

var tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2015
  }
})
tester.run('page-query', rule, {
  valid: [{
    code: `
        <page-query>
        query Blog {
          allWordPressPost (limit: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
        </page-query>
    `
  }],
  invalid: [{
    code: `
        <page-query>
        query Blog {
                      allWordPressPost(limit: 5) {
                  edges{
              node {
                id
                title
            }
            }
          }
        }
        </page-query>
    `,
    output: `
        <page-query>
        query Blog {
          allWordPressPost (limit: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
        </page-query>
    `,
    errors: ["format is incorrect"]
  }],
})