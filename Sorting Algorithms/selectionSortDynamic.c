/*****************************************************************************
 ***************************selectionSortDynamic.c****************************
 *****************************************************************************/

//Standard I/O Libraries
#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include "selectionSort_header.h"

//Create the function 'swapForBubbleSort' to swap the two different elements
void swapForSelectionSort(int *first_element, int *second_element)
{
  //Create temporary array
  //Initialise the variable and assign to pointer p
  int temp = *first_element;
  *first_element = *second_element;
  *second_element = temp;
}

//Create a function whic implements the sorting method i.e selecion
double selectionSort(int *data, int n)
{
  //Decalare time
  //And initialise the start_t and end_t
  clock_t start_t, end_t;
  start_t = clock();

  //Decalare the vairiables
  int i, j, min_idx;

  // Using for loop to move one by one every boundary of unsorted subarray
  for (i = 0; i < n-1; i++)
  {
    //Find the minimum element in unsorted array
    min_idx = i;
    for (j = i+1; j < n; j++)
    {
      if (data[j] < data[min_idx])
      {
        min_idx = j;
      }
    }
    //Swap the found minimum element with the first element
    swapForSelectionSort(&data[min_idx], &data[i]);
  }
  //End the time
  end_t = clock();
  //Return the time
  return (double)(end_t - start_t)/CLOCKS_PER_SEC;
}

//Create the function to print an array
void printSelectionSorting(int *data, int numberOfElements)
{
    int i;
    for (i=0; i < numberOfElements; i++)
    {
      printf("%d\t", data[i]);
    }
    printf("\n");
}

//Craete the function which test selecion sorting of the randon numbers
//and then call the function in main.c
double testSelectionSorting(int n)
{
  //Decalaring the variable. data is pointer to integer
  //temporary array because of swapping
  int *data,*temp_array;

  //Allocate space for n integers
  data = (int *)calloc(n,sizeof(int));

  //Using for loop
  //to generate the random numbers
  for (temp_array = data; temp_array < data+n; temp_array++)
  {
    *temp_array = rand() % n;
  }

  //printf("The %d random numbers before sorting :\n", n);
  //printSelectionSorting(data,n);

  //call the function to sort out the array and print out the sorte on o terminal
  selectionSort(data,n);

  printf("\nThe %d random numbers after sorting : \n", n);
  printSelectionSorting(data,n);

  //Decalare he time variable and intialise to selection sorting function
  double time_selectionSort = selectionSort(data,n);

  printf(" %d random numbers sorted by using selection sorting algoritms.\n", n);
  printf("\nTime taken for selection sort in seconds: %f\n", time_selectionSort );

  //release the memory space
  free(data);
  //Return the time for selection sorting
  return time_selectionSort;
}
