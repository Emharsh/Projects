
# code details

EXE_DIR = .
EXE = $(EXE_DIR)/tree

SRC= main.c	make_node.c	make_children.c	printout.c	output.c	destroy.c	linked_LeafList.c

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

main.o:	main.c	node_structure.h	node_function.h
make_node.o:	make_node.c	node_structure.h	node_function.h
make_children.o:	make_children.c	node_structure.h	node_function.h
output.o:	output.c	node_structure.h	node_function.h
printout.o:	printout.c	node_structure.h	node_function.h
destroy.o:	destroy.c	node_structure.h	node_function.h
linked_LeafList.o:	linked_LeafList.c	node_structure.h	node_function.h
