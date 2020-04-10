/*****************************************************************************
 *******************************function.c************************************
 *****************************************************************************/

//Standard I/O library

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "node_structure.h"
#include "node_function.h"

//create the function which make the children
void makeChildren(Node *parent)
{//open the function makeChildren()

  //parent data
  double x = parent->xy[0];
  double y =parent->xy[1];
  int level = parent->level;

  //chid edge length
  double hChild = pow(2.0, -(level+1));

  //create children at level+1
  parent->child[0] = makeNode( x, y, level+1);
  parent->child[1] = makeNode( x+hChild, y, level+1);
  parent->child[2] = makeNode( x+hChild, y+hChild, level+1);
  parent->child[3] = makeNode( x, y+hChild, level+1);

  //return nothing
  return;
}//close the function makeChildren()

/******************************************************************************/
