/*****************************************************************************
 *********************************Node.c**************************************
 *****************************************************************************/
//Standard I/O library
//include the stdio.h
#include <stdio.h>
//include the stdlib.h
#include <stdlib.h>
//include the math.h
#include <math.h>
//include the node_structure header
#include "node_structure.h"
//include the node function header
#include "node_function.h"

//Create the function
//which make the nodes
Node *makeNode( double x, double y, int level)
{//open the function makeNode()
  //initialise i
  int i;

  //allocate the data structure
  Node *node = (Node *)malloc(sizeof(Node));

  //Set the node data
  node->level = level;
  node->xy[0] = x;
  node->xy[1] = y;

  //set children to NULL
  for(i = 0; i < 4; ++i)
  {//open for loop

    //Assign child to NULL
    node->child[i] = NULL;

  }//close for loop

  //return node
  return node;

}//close the function makeNode()

/******************************************************************************/
