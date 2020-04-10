## queens.py by John Stell
## adapted from eight_puzzle.py by Brandon Bennett

## Specification of "n Queens puzzle" search problem
## designed for use with queue_search.py

print( "Loading queens.py" )

### Print out problem info
def queens_problem_info():
        print( "The n Queens Problem" )

## "deepcopy" is used to make a copy of a state and then change
## it to create a new state.
## This is needed because of the way Python handles lists.
## If you just assign a list to a new variable then you will
## just get a new pointer to the same list.


from copy import deepcopy

## produces a square matrix of zeros
def square_of_zeros(X):
    return [ [0 for x in range(X)] for y in range(X)]

## Takes a square matrix (square) and returns a new square matrix (rotated)
## The rows and columns of rotated contain the entries on each diagonal
## in square but with zeros interspersed
##
##                         1 2 3           0 0 3 0 0
## For example the matrix  4 5 6  returns  0 2 0 6 0
##                         7 8 9           1 0 5 0 9
##                                         0 4 0 8 0
##                                         0 0 7 0 0
##
## The purpose of this to be able to count the number of 1s on
## each diagonal using a function to count numbers in each row and column

def rotate(square):
    n = len(square) - 1
    rotated = square_of_zeros(2*n + 1)
    for i in range(n+1):
        for j in range(n+1):
            rotated[i+n-j][i+j] = square[i][j]
    return rotated

## Counts number of 1s in each row of a square matrix
## Returns a list of the counts for each row.

def count_row(square):
    counts = []
    for row in range(len(square)):
        count = 0
        for col in range(len(square[row])):
            if square[row][col] == 1:
                count = count + 1
        counts = counts + [count]
    return counts

## Counts number of 1s in each column of a square matrix
## Returns a list of the counts for each column.

def count_col(square):
    counts = []
    for col in range(len(square)):
        count = 0
        for row in range(len(square)):
            if square[row][col] == 1:
                count = count + 1
        counts = counts + [count]
    return counts

## Returns True of a list has more than one 1, False otherwise

def more_than_one(seq):
    for i in range(len(seq)):
        if seq[i] > 1:
            return True
    return False

## Returns the number of 1s in a list
def count_ones(seq):
    total = 0
    for i in range(len(seq)):
        if seq[i] == 1:
            total = total + 1
    return total

## A state in the Queens puzzle is OK provided no row, column or diagonal
## has more than one queen in it.
## Queens are represented by 1s. Other entries should be 0

def queens_ok(square):
    if more_than_one(count_row(square)):
        return False
    if more_than_one(count_col(square)):
        return False
    rotated = rotate(square)
    if more_than_one(count_row(rotated)):
        return False
    if more_than_one(count_col(rotated)):
        return False
    return True

## A state for the Queens puzzle is a goal state if it is OK (no queens
## threaten each other) and also there is one queen in each row.

def queens_test_goal_state(square):
    return queens_ok(square) and count_ones(count_row(square)) == len(square)

### Define the possible actions

## Given a state this returns a list of possible actions.
## Each action is a pair consisting of the row and column
## where the next queen is to be placed

def queens_possible_actions(state):
    actions = []
    next_row = get_first_non_empty_row(state)
    if next_row < len(state):
        newstate = deepcopy(state)
        for i in range(len(state)):
            newstate[next_row] = place_queen(i,len(state))
            if queens_ok(newstate): actions = actions + [(next_row,i)]
    return actions

def get_first_non_empty_row(state):
    max = len(state) # number of rows altogether
    for row in range(max):
            if count_ones(state[row]) == 0:
                    return row
    return max # return max if no rows contain only zeros
    

## This is used in queen_poss_actions and returns a row of length n having
## zeros in each position apart from one 1 at index position i.
## For example, place_queen(2,5) returns [0, 0, 1, 0, 0]

def place_queen(i,n):
    row = [0 for x in range(n)]
    row[i] = 1
    return row

## The successor state function
        
## Note that the original state is first copied using the
## deepcopy function and then this copy is modified and returned.

def queens_successor_state( action, state ):
    newstate = deepcopy(state)
    row = action[0]  # First component of action is row in which to place queen
    col = action[1]  # Second component is column
    newstate[row][col] = 1
    return newstate

## Make Queens Puzzle with n queens

def make_Queens_puzzle(n):
    queens_initial_state = square_of_zeros(n)
    queens_puzzle = ( None,
                      queens_problem_info,
                      queens_initial_state,
                      queens_possible_actions,
                      queens_successor_state,
                      queens_test_goal_state
                    )
    return queens_puzzle

