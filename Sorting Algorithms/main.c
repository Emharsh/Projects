/*******************************************
 ***********Programming Project*************
 ***********Benchmarking Algorithms*********
 *************Harshit Verma*****************
 **************ID: 200978548****************
 *******************************************/


/*****************************************************************************
 ************************************Main.c***********************************
 *****************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include "quickSort_header.h"
#include "selectionSort_header.h"
#include "bubbleSort_header.h"
#include "mergeSort_header.h"


int main ( void )
{
  printf("*************************************\n");
  printf("*      Benchmarking Algorithms      *\n");
  printf("*          Harshit Verma            *\n");
  printf("*          ID: 200978548            *\n");
  printf("*************************************\n");

  FILE *fp = fopen("graph.out", "w+");

  //Decalaring the variables
  double time_mergeSort;
  double time_selectionSort;
  double time_bubbleSort;
  double time_quickSort;

  //Decalaring the variables
  int counter = 1;
  int n;
  int choice;
  srand(time(NULL));

  printf("\nEnter the random numbrs: ");
  scanf("%d", &n);

  //Using while loop to keep selecting the number of elements
  while ( n != 0)
  {

    //Using while loop to choose the option for sorting
    while(1)
    {
      printf("\nChoose the sorting type:\n\n");
      printf("1. Quick sort\n");
      printf("2. Merge sort\n");
      printf("3. Selection sort\n");
      printf("4. Bubble sort\n");
      printf("5. Exit and run on gnuplot\n");
      printf("6. For another Number of Elements\n");

      scanf("%d", &choice);
      printf("Option: %d\n", choice);
      if ( choice > 0 && choice < 6)
      {
        switch (choice)
        {
          case 1:
            time_quickSort = testQuickSorting(n);
          break;
          case 2:
            time_mergeSort = testMergeSorting(n);
          break;
          case 3:
            time_quickSort = testSelectionSorting(n);
          break;
          case 4:
            time_bubbleSort = testBubbleSorting(n);
          break;
          case 5:
            printf("Exit!!!!!!!!!!\n");
            fclose(fp);
            exit(0);
        }
        fprintf(fp, "%d %f %f %f %f\n", n, time_quickSort, time_mergeSort, time_selectionSort, time_bubbleSort );
      }
      else if (choice == 6)
      {
        printf("\nGive the number of elements : ");
        scanf("%d", &n);
        counter++;
      }
      else
      {
        printf("Quitting program!\n");
        return 0;
      }
    }
  }
  fclose(fp);
  return 0;
}


/*******************************************************************************
*                                                                              *
*                              COMPLETED                                       *
*                                                                              *
/******************************************************************************/
