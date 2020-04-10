/*****************************************************************************
 *******************************Linked List***********************************
 *****************************************************************************/
//Standard I/O library
//include the stdio.h
#include <stdio.h>
//include the stdlib.h
#include <stdlib.h>
//include the math.h
#include <math.h>
//include the stdbool.h
#include "stdbool.h"
//include the  node_structure.h
#include "node_structure.h"
//include the node_function.h
#include "node_function.h"

//the #define directive allows the definition of macros within your source code
#define MAX(a,b) ( ((a)>(b)) ? (a):(b) )
#define MIN(a,b) ( ((a)<(b)) ? (a):(b) )

//Global Variables
//Assign falsecounter to 1
int falseCounter = 1;

////////////////////////////////////////////////////////////////////////////////
//                               Part_01                                      //
////////////////////////////////////////////////////////////////////////////////

//Create the function which initialise the list for the leaf
void initialiseTheList(LeafList *leaf)
{//open the function
	leaf->leafHead = NULL;
}//close the function

//Create the function to add the nodes
void addNode(LeafList *leaf, Node *node)
{//open the function
	node->nextLeaf = leaf->leafHead;
	leaf->leafHead = node;
}//close the function

//Create the function LinkedList for list of leaf nodes
void LinkedList(LeafList *leaf, Node *node)
{//open the function LinkedList()

	//initialise the nLeafs to integer and assign to 0
	int nLeafs = 0;

  //Using if statement, if child[0] is NULL
	if(node->child[0] == NULL)
	{//open if statement

    //call the function to add nodes
		addNode(leaf, node);

	}//close if statement

  //Using else statement
	else
	{//open else statement

    //for loop, walk through every leafs
		for(nLeafs = 0; nLeafs < 4; ++nLeafs)
		{//open for loop

      //call the function
			LinkedList(leaf, node->child[nLeafs]);

		}//close for loop

	}//close else statement

	//return nothing
	return;
}//close the function LinkedList()

//Create the function writeLinkedTree
//which open a file and write in it
void writeLinkedTree(LeafList *leaf, Node *node)
{//open the function writeLinkedTree()

	//fp is pointer to FILE
	//And open the file and write in it
  FILE *fp = fopen("quad.out", "w+");
	//LinkedList(leaf, node);

	//using while loop, if falseCounter is not equal to zero
  while(falseCounter != 0)
  {//open the while loop

		//call the function computeQuadtree
		generateQuadtree(leaf);
    //falseCounter = 0;
    //printf("False processing : %d \n", falseCounter );
		//Assign leafHead to null
    leaf->leafHead = NULL;
		//call the function LinkedList to create the leafs
    LinkedList(leaf, node);
		//decrement of falseCounter
		falseCounter--;
  }//close while loop

	//call the function writeLinkedNode which write the leaf
  writeLinkedNode(fp, leaf);
	//close the file
  fclose(fp);
	//return nothing
  return;
}//close the function writeLinkedTree()

//Create the function writeLinkedNode
//which recursively search for leaf nodes
void writeLinkedNode(FILE *fp, LeafList *leaf)
{//open the function writeLinkedNode()

	//walkTOleaf is the pointer to Node and assign to leafHead
  Node *walkTOleaf = leaf->leafHead;
	//using while loop, if walkTOleaf is not equal to null
  while(walkTOleaf != NULL)
  {//open while loop
		//call the function printOut which print the leaf in the file
  	printOut(fp, walkTOleaf);
		//And assign the walkTOleaf to nextLeaf
    walkTOleaf = walkTOleaf->nextLeaf;
  }//close while loop

	//return nothing
  return;
}//close the function walkLinkedNode()


////////////////////////////////////////////////////////////////////////////////
//                               Part_02                                      //
////////////////////////////////////////////////////////////////////////////////

//Create the function
void growTree(LeafList *leaf)
{//open the function i.e growTree()
  Node *walkTOleaf = leaf->leafHead;
  //using while loop, if walkTOleaf is not null
  while(walkTOleaf != NULL)
  {//open while statement

		//Call the function makeChildren which increases the children
    makeChildren(walkTOleaf);
		//And assign walkTOleaf to nextLeaf
    walkTOleaf = walkTOleaf->nextLeaf;
  }
	//return nothing
  return;
}//close the function i.e growTree()


////////////////////////////////////////////////////////////////////////////////
//                               Part_03                                     //
////////////////////////////////////////////////////////////////////////////////

// Define a function that is computed
// on the quadtree grid
//
// Given a location (x,y) return a value
//
// Choice allows different functions
// to be selected

//function returns a value at a physical location in the quadtree.
double dataFunction( double x, double y, int choice )
{//open the function dataFunction()
  double value;

  if( choice == 0 )
    value = exp(-(y-x)*(y-x)/0.01) + exp(-(x-y)*(x-y)/0.01);

  else if( choice == 1 )
    value = exp(-(x-0.5)*(x-0.5)/0.01) + exp(-(y-0.5)*(y-0.5)/0.01);

  else if( choice == 2 )
    value = exp(-((x-0.72)*(x-0.72)+(y-0.23)*(y-0.23))/0.01);

  // default uniform data
  else
    value = 1.0;

	//return the value
  return value;
}//open the function dataFunction()

// Compute the max and min values
// of the data on the quadtree node
//
// If the difference is too big request
// the node is split into children

bool indicator( Node *node, double tolerance, int choice )
{//open the function indicator()

  double v[4],vmin,vmax;
  double h = pow(2,-node->level);

  v[0] = dataFunction(node->xy[0],node->xy[1], choice);
  v[1] = dataFunction(h+node->xy[0],node->xy[1], choice);
  v[2] = dataFunction(node->xy[0],h+node->xy[1], choice);
  v[3] = dataFunction(h+node->xy[0],h+node->xy[1], choice);

  vmin = MIN( MIN( MIN(v[0],v[1]), v[2]), v[3]);
  vmax = MAX( MAX( MAX(v[0],v[1]), v[2]), v[3]);

  if( (vmax-vmin) < tolerance )
    return true;
  else
    return false;
}//close the function indicator()


//Create the function which generate a data dependent quadtree
void generateQuadtree(LeafList *leaf)
{//open the function computeQuadtree()

	//walkTOleaf is pointer to Node and assign to leafHead
  Node *walkTOleaf = leaf->leafHead;
	//using while loop, if walkTOleaf is not null
  while(walkTOleaf != NULL)
  {//open the while loop

		//printf("---------Indicator Function------------------\n");
		//using if statement, if indicator function is equal to false
    if(indicator(walkTOleaf, 0.8, 0) == false)
    {
			//call the function makechildren
      makeChildren(walkTOleaf);
			//increment the falseCounter
			falseCounter++;
    }
		//otherwise walkTOleaf to nextLeaf
		walkTOleaf = walkTOleaf->nextLeaf;
	}//close the while loop

}//close the function computeQuadtree()

/******************************************************************************/
