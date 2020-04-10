################################################################################
#                                                                              #
#                               GNU FILE                                       #
#                                                                              #
################################################################################



set title 'Graph for Sorting'    #set title
set xlabel 'Length'               #set x axis
set ylabel 'Time in seconds'      #set y axis
plot 'graph.out' u 1:2 w lp t 'Quick Sort', 'graph.out' u 1:3 w lp t 'Merge Sort', 'graph.out' u 1:4 w lp t 'Selection Sort', 'graph.out' u 1:5 w lp t 'Bubble Sort'
