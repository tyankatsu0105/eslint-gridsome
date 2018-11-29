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
    filename: 'test.vue',
    code: `
        <template>
          <div>aaaa</div>
        </template>
        <script>
          const script = 111;
        </script>
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
        <style lang="scss" scoped>
        div {
          font-size: 2rem;
          padding: 10px;
        }
        </style>`
  }],
  invalid: [{
    filename: 'test.vue',
    code: `
        <template>
          <div>aaaa</div>
        </template>
        <script>
          const script = 111;
        </script>
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
        <style lang="scss" scoped>
        div {
          font-size: 2rem;
          padding: 10px;
        }
        </style>`
  }],
})