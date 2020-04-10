/*****************************************************************************
 ***************************bubbleSortDynamic.c*******************************
 *****************************************************************************/

//Standard I/O Library
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "bubbleSort_header.h"

//Craete the function which test bubble sorting of the randon numbers
//and then call the function in main.c
double testBubbleSorting (int n )
{

  //Decalaring the variable. data is pointer to integer
  int *data,  *temp_array;


  //Allocate space for 'numberOfElements' integers
  data = (int *)calloc(n , sizeof(int));

  //Using for loop
  //to generate the random numbers
  for (temp_array = data; temp_array <data + n; temp_array++)
  {

    //rand function returns a pseudo-rando number.
    *temp_array = rand() % n;
  }

  //printf("The %d random numbers before sorting :\n", n);
  //printBubbleSorting(data,numberOfElements);

  //Call the bubbleSorting() function to sort out the unsorted numbers
  bubbleSorting(data,n);

  printf("The %d random numbers after sorting :\n", n);

  //Call the printBubbleSorting() to print out sorted list.
  printBubbleSorting(data,n);

  //Decalare he time variable and intialise to bubble sorting function
  double time_bubbleSort = bubbleSorting(data, n);

  printf(" %d random numbers sorted by using bubble sorting algoritms.\n", n);
  printf("\n\nTime taken for bubble sort in seconds: %f\n", time_bubbleSort );

  //Release the memory space
  free(data);
  //Return the time for the bubble sorting
  return time_bubbleSort;
}

//Create the function 'swapForBubbleSort' to swap the two different numbers
void swapForBubbleSort ( int *p, int *q)
{
  //Initialise the variable
  int temporaryArray = *p;
  *p = *q;
  *q = temporaryArray;
  return;
}

//The main function that implements QuickSort
double bubbleSorting ( int *data, int numberOfElements )
{
  //Decalare time
  //And initialise the start_t and end_t
  clock_t start_t, end_t;
  start_t = clock();

  //Decalare the vairiables
  int *p,*q;

  //Initialise i to integer and i is only used to print the step counter
  int i;

  //Using for loop
  //walk though every element of the array
  for (p = data, i = 0; p < data+numberOfElements-1; p++, i++)
  {
    //For loop, which checks and comapare the next two numbers
    for (q = data+numberOfElements-1; q > p; q--)
    {
      /*Now, if statement will compare the next to elements and swap them accorcing
      to which is smaaller*/
      if (*(q-1) > *q)
      {
        //compare adjacent numbers
        swapForBubbleSort(q-1,q);
      }
    }
  }
  end_t = clock();
  //Return the time
  return (double)(end_t - start_t)/CLOCKS_PER_SEC;
}

//Create a function which prints the sorted order i.e bubble sorting
void printBubbleSorting ( int *data, int numberOfElements )
{
   int *p;

   for (p = data; p < data +numberOfElements; p++)
   {
     printf("%d\t", *p);
   }
   printf("\n");
}
