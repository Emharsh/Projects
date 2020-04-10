/*****************************************************************************
 *********************************STRUCTURE***********************************
 *****************************************************************************/

/********************************Structure 1***********************************/
//data strucure definition
struct qnode
{
  //node data
  int level;
  double xy[2];
  struct qnode *child[4];
  struct qnode *nextLeaf;

};
//data type definition
typedef struct qnode Node;

/******************************************************************************/


/**********************************Structure 2*********************************/

//data structure definition
struct QuadtreeGrid
{
	Node *leafHead;

};
//data type definition
typedef struct QuadtreeGrid LeafList;

/******************************************************************************/
