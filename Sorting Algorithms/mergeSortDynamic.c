/*****************************************************************************
 ****************************mergeSortDynamic.c*******************************
 *****************************************************************************/

//Standard I/O Libraries
#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include "mergeSort_header.h"

//Craete a function to merge the sub arrays or data
//Merges two sub-arrays/data of data.
void merge(int *data, int left, int middle, int right)
{

  //Decalaring the variables
  /*First subarray is First_Array
  Second subarray is Second_Array*/
  int i, j, k;
  int n1 = middle - left + 1;
  int n2 =  right - middle;

  //create temporary Array
  int First_Array[n1], Second_Array[n2];

  //Copy data to temporary arrays
  for (i = 0; i < n1; i++)
  {
    First_Array[i] = data[left + i];
  }
  for (j = 0; j < n2; j++)
  {
    Second_Array[j] = data[middle + 1+ j];
  }

  //Merge the temporary arrays back to the previous

  //Initial index of first data (i.e sub arrays)
  i = 0;
  //Initial index of second data
  j = 0;
  // Initial index of merged data
  k = left;

  //Using the while loop
  while (i < n1 && j < n2)
  {
    if (First_Array[i] <= Second_Array[j])
    {
      data[k] = First_Array[i];
      //Increment of initial index of first sub-array/data
      i++;
    }
    else
    {
      data[k] = Second_Array[j];
      //Increment of initial index of second sub-array/data
      j++;
    }
    //Increment of initial index of merged data (i.e sub-array)
    k++;
  }

  //Copy the remaining elements of First_Array
  while (i < n1)
  {
    data[k] = First_Array[i];
    //Increment of initial index of first sub-array/data
    i++;
    //Increment of initial index of merged data (i.e sub-array)
    k++;
  }

  //Copy the remaining elements of Second_Array[]
  while (j < n2)
  {
    data[k] = Second_Array[j];
    //Increment of initial index of second sub-array/data
    j++;
    //Increment of initial index of merged data (i.e sub-array)
    k++;
  }
}

//l is for left index and r is right index of the sub-array of data to be sorted
double mergeSort(int *data, int left, int right)
{
  clock_t start_t, end_t;
  start_t = clock();
  if (left < right)
  {
    // Same as (l+r)/2, but avoids overflow for
    // large l and h
    int middle = left+(right-left)/2;

    // Sort first and second halves
    mergeSort(data, left, middle);
    mergeSort(data, middle+1, right);
    merge(data, left, middle, right);
  }
  end_t = clock();
  //Return the time
  return (double)(end_t - start_t)/CLOCKS_PER_SEC;
}

//Create a function to print merge sorting
void printMergeSorting(int *list, int n)
{
  int i;
  for (i=0; i < n; i++)
  {
    printf("%d\t", list[i]);
  }
  printf("\n");
}

//Craete the function which test merge sorting of the randon numbers
//and then call the function in main.c
double testMergeSorting ( int n )
{
   int *data,*temp;

   //allocate space for n integers
   data = (int *)calloc(n,sizeof(int));

   for (temp = data; temp < data+n; temp++)
      *temp = rand() % n;

  //printf("The %d random numbers before sorting :\n", n);
  // print(a,n);

  mergeSort(data,0,n);

  printf("\nThe %d random numbers after sorting :\n", n);
  printMergeSorting(data,n);

  //Decalare he time variable and intialise to merge sorting function
  double time_mergeSort = mergeSort(data,0, n);

  printf(" %d random numbers sorted by using merge sorting algoritms.\n", n);
  printf("\n\nTime taken for merge sort in seconds: %f\n", time_mergeSort );

  //release the memory space
  free(data);
  //return the time of merge sorting
  return time_mergeSort;
}
