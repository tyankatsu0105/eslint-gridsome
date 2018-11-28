"use strict"

module.exports = {
  meta: {
    description: ""
  },
  create(context) {
    const sourceCode = context.getSourceCode()
    return {
      // Program ノード (AST のルート) で呼ばれる
      Program(node) {
        console.log(node);

        // if (!node.templateBody) {
        //   return
        // }

        // // <template>の兄弟タグから <page-query> を探す
        // const topLevelNodes = node.templateBody.parent.children
        // for (const node of topLevelNodes) {
        //   if (node.type === "VElement" && node.name === "page-query") {
        //     // Do checking on the node.
        //   }
        // }
      }
    }
  }
}