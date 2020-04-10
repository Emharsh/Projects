/*****************************************************************************
 *******************************function.c************************************
 *****************************************************************************/

//Standard I/O library
//include the stdio.h
#include <stdio.h>
//include the stdlib.h
#include <stdlib.h>
//include the math.h
#include <math.h>
//include the node_structure.h
#include "node_structure.h"
//include the node_function.h
#include "node_function.h"

//Create the function which delete the node
void destroyNode(Node *node)
{//open the function
  //initialise the function
  int i;
  //Using if statement, if child 0 is null
  if (node->child[0] == NULL)
  {
    //Free the node
    free(node);
  }
  //Using else statement
  else
  {//open else statement

    //for loop, to walk through four children
    for ( i = 0; i < 4; ++i)
    {//open for loop

      //Delete the node
      destroyNode(node->child[i]);
      //free(node);

    }//close for loop

  }//close else statement

  //return nothing
  return;

}//close function destroyNode()
