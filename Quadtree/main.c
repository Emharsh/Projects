/*******************************************
 ***********Programming Project*************
 *************Quadtree Exercise*************
 *************Harshit Verma*****************
 **************ID: 200978548****************
 *******************************************/

/*****************************************************************************
 *********************************Main.c**************************************
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
//include the node_structure header
#include "node_structure.h"
//include the node_function header
#include "node_function.h"

//Main routine
int main(int argc, char **argv)
{//open main()

  //create the head node: level 0
  Node *head = makeNode(0.0, 0.0, 0);

  //Split to level 1
  makeChildren(head);

  //Call the function
  //destroyNode(head);

  //Split one node to level 2
  makeChildren(head->child[0]);
  makeChildren(head->child[1]);
  makeChildren(head->child[2]);
  makeChildren(head->child[3]);


  LeafList myList;
  //Call the function
  initialiseTheList(&myList);

  //Call the function
  LinkedList(&myList, head);
  //Call the function
  //growTree(&myList);
  //call the function
  //LinkedList(&myList, head);
  writeLinkedTree(&myList, head);
  //Call the function
  destroyNode(head);
  //Print command
  printf("/****************************************************/\n");
  printf("/*       Coursework_1: Programming Project          */\n");
  printf("/*                Harshit Verma                     */\n");
  printf("/*                ID: 200978548                     */\n");
  printf("/*                   QUADTREE                       */\n");
  printf("/****************************************************/\n");

  //Return 0
  return 0;

}// close  main()

/******************************************************************************/
