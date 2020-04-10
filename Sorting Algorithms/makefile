################################################################################
#                                                                              #
#                               MAKEFILE                                       #
#                                                                              #
################################################################################

# code details

EXE_DIR = .
EXE = $(EXE_DIR)/sortingAlgorithms

SRC=	main.c	bubbleSortDynamic.c	quickSortDynamic.c	selectionSortDynamic.c	mergeSortDynamic.c

# generic build details

CC=      cc
COPT=    -O
CFLAGS=

# compile to  object code

OBJ= $(SRC:.c=.o)

.c.o:
	$(CC) $(COPT) -c -o $@ $<

# build executable

$(EXE): $(OBJ)
	$(CC) $(OBJ) $(CFLAGS)	-lm -o $(EXE)

# clean up compilation

clean:
	rm -f $(OBJ) $(EXE)

# dependencies

main.o:	main.c	bubbleSort_header.h	quickSort_header.h	selectionSort_header.h
bubbleSortDynamic.o:	bubbleSortDynamic.c	bubbleSort_header.h
quickSortDynamic.o:	quickSortDynamic.c	quickSort_header.h
selectionSortDynamic.o: selectionSortDynamic.c	selectionSort_header.h
mergeSortDynamic.o:	mergeSortDynamic.c	mergeSort_header.h
