/*****************************************************************************
 ***************************quickSortDynamic.c************** *****************
 *****************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "quickSort_header.h"

//Craete the function which test quick sorting of the randon numbers
//and then call the function in main.c
double testQuickSorting ( int n )
{
  int *data,*temp;

  //Allocate space for n integers
  data = (int *)calloc(n,sizeof(int));

  for (temp = data; temp < data+n; temp++)
  {
    *temp = rand() % n;
  }

  //printf("The %d random numbers before sorting :\n", n);
  //printQuickSorting(data,n);

  //Call the function to sort ou the unsoed numbes
  quickSorting(data,0,n);

  printf("\nThe %d random numbers after sorting : \n", n);
  printQuickSorting(data,n);

  //Decalare he time variable and intialise to quick sorting function
  double time_quickSort = quickSorting(data,0, n);

  printf(" %d random numbers sorted by using quick sorting algoritms.\n" , n);
  printf("\n\nTime taken for quick sort in seconds: %f\n", time_quickSort );

  //release the memory space
  free(data);
  //Return the time for quick sorting
  return time_quickSort;
}

//Create a function to swap two elements
void swapForQuickSort(int *x,int *y)
{
  int temporary_Array;
  temporary_Array = *x;
  *x = *y;
  *y = temporary_Array;
}

/* This function takes last element as pivot, places
the pivot element at its correct position in sorted
array, and places all smaller (smaller than pivot)
to left of pivot and all greater elements to right
of pivot */
int choose_pivot(int i,int j )
{
  return((i+j) /2);
}

/*The main function that implements QuickSort
list i.e Array to be sorted,
m  i.e Starting index,
n i.e Ending index */
double quickSorting(int *list,int m,int n)
{
  //Decalaring time variables
  clock_t start_t, end_t;
  start_t = clock();

  int *p,*q;

  int key,i,j,k;
  if( m < n)
  {
    k = choose_pivot(m,n);
    swapForQuickSort(&list[m],&list[k]);
    key = list[m];
    i = m+1;
    j = n;
    while(i <= j)
    {
      while((i <= n) && (list[i] <= key))
        i++;
      while((j >= m) && (list[j] > key))
        j--;
      if( i < j)
        swapForQuickSort(&list[i],&list[j]);
    }
    //swapForQuickSort two elements
    swapForQuickSort(&list[m],&list[j]);

    //recursively sort the lesser list
    quickSorting(list,m,j-1);
    quickSorting(list,j+1,n);
  }
  //end the time
  end_t = clock();
  //Return the time
  return (double)(end_t - start_t)/CLOCKS_PER_SEC;
}

//Create a funcion to print out the sorted lis
void printQuickSorting(int *list,int n)
{
  int i;
  for(i=0; i<n; i++)
  {
    printf("%d\t",list[i]);
  }
  printf("\n");

}
