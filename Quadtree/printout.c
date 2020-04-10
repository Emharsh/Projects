/*****************************************************************************
 *******************************printput.c************************************
 *****************************************************************************/
//Standard I/O library
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "node_structure.h"
#include "node_function.h"

//create the function to printout the node
void printOut( FILE *fp, Node *node ) {

  // node data
  double x = node->xy[0];
  double y = node->xy[1];
  int level = node->level;
  double h = pow(2.0,-level);

  // print out the corner points
  fprintf(fp, " %g %g\n",x,y);
  fprintf(fp, " %g %g\n",x+h,y);
  fprintf(fp, " %g %g\n",x+h,y+h);
  fprintf(fp, " %g %g\n",x,y+h);
  fprintf(fp, " %g %g\n\n",x,y);

  //return nothing
  return;
}

/******************************************************************************/
