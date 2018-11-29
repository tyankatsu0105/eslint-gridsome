"use strict"

const prettier = require("prettier");
const prettierParser = 'graphql'

module.exports = {
  meta: {
    description: ""
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    return {
      // Program ノード (AST のルート) で呼ばれる
      Program(node) {

        if (!node.templateBody) {
          return
        }
        // <template>の兄弟タグから <page-query> を探す
        const topLevelNodes = node.templateBody.parent.children
        for (const node of topLevelNodes) {
          if (node.type === "VElement" && node.name === "page-query") {

            // <page-query>の中のstringの取得
            const value = node.children[0].value

            function reportIssue(node) {
              context.report({
                loc: node.loc,
                message: `format is incorrect`,

                fix() {
                  // prettierで整形済みのstring
                  const formattedValue = prettier.format(value, {
                    parser: prettierParser
                  });
                  return formattedValue
                }
              })
            }
            reportIssue(node)
          }
        }
      }
    }
  }
}