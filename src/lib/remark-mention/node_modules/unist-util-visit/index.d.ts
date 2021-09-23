/**
 * Visit children of tree which pass a test
 *
 * @param tree Abstract syntax tree to walk
 * @param test Test, optional
 * @param visitor Function to run for each node
 * @param reverse Fisit the tree in reverse, defaults to false
 */
export const visit: (<
  Tree extends import('unist').Node<import('unist').Data>,
  Check extends import('unist-util-is').Test
>(
  tree: Tree,
  test: Check,
  visitor: Visitor<
    import('unist-util-visit-parents/complex-types').Matches<
      import('unist-util-visit-parents/complex-types').InclusiveDescendant<
        Tree,
        void
      >,
      Check
    >
  >,
  reverse?: boolean | undefined
) => void) &
  (<Tree_1 extends import('unist').Node<import('unist').Data>>(
    tree: Tree_1,
    visitor: Visitor<
      import('unist-util-visit-parents/complex-types').InclusiveDescendant<
        Tree_1,
        void
      >
    >,
    reverse?: boolean | undefined
  ) => void)
export type Node = import('unist').Node
export type Parent = import('unist').Parent
export type Test = import('unist-util-is').Test
export type VisitorResult = import('unist-util-visit-parents').VisitorResult
/**
 * Called when a node (matching test, if given) is found.
 * Visitors are free to transform node.
 * They can also transform the parent of node (the last of ancestors).
 * Replacing node itself, if `SKIP` is not returned, still causes its descendants to be visited.
 * If adding or removing previous siblings (or next siblings, in case of reverse) of node,
 * visitor should return a new index (number) to specify the sibling to traverse after node is traversed.
 * Adding or removing next siblings of node (or previous siblings, in case of reverse)
 * is handled as expected without needing to return a new index.
 * Removing the children property of an ancestor still results in them being traversed.
 */
export type Visitor<V extends import('unist').Node<import('unist').Data>> = (
  node: V,
  index: number | null,
  parent: Parent | null
) => VisitorResult
import {CONTINUE} from 'unist-util-visit-parents'
import {SKIP} from 'unist-util-visit-parents'
import {EXIT} from 'unist-util-visit-parents'
export {CONTINUE, SKIP, EXIT}
