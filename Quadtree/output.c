/*****************************************************************************
 ********************************output.c*************************************
 *****************************************************************************/

//Standard I/O library
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "node_structure.h"
#include "node_function.h"

////////////////////////////////////////////////////////////////////////////////
//                             EXERCISE PART                                  //
////////////////////////////////////////////////////////////////////////////////

//create the function writeTree
//open a file and prepare to write
void writeTree(Node *head) {
  FILE *fp = fopen("quad.out", "w+");
  writeNode(fp, head);
  fclose(fp);
  return;
}

//Create the function writeNode
//and recursively search for leaf nodes
void writeNode(FILE *fp, Node *node)
{//open the function writeNode()

  //initialise i
  int i;
  //Using if statement, if statement is equal to null
  if (node->child[0] == NULL)
  {//open the if statement

    //Call the function printOut and print in file
    printOut(fp, node);

  }//close the if statement

  //Using else statement
  else
  {//open else statement

    //using for loop to walk through every leafs
    for ( i = 0; i < 4; ++i)
    {//open for loop

      //call the writeNode function to write in file
      writeNode(fp, node->child[i]);

    }//close for loop

  }//close else statement

  //return nothing
  return;
}//close the function writeNode()

/******************************************************************************/
