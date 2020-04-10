## humanrobot.py
## Solve the cannibals and missionaries game, however do so in the form of
## robots and human where robot take the place of cannibals and humans the
## missionaries.

from __future__ import print_function

print( "Loading humanrobot.py" )
from copy import deepcopy
#
#--------------------------------------------------------------------->
## Problem information
#   Print out the problem space
def human_robot_position( ):
    print( "Humans and Robots puzzle" )
    print( "Problem space:\n______________________" )
    print( "Humans", humansNO, "robots", robotsNO, "\n" )

#
#--------------------------------------------------------------------->
## Declaration of states -: Create the goal and initial states for any number
## [ left human, left robot, lboat, right human, right robot] ]
def human_robot_goal_state( humans, robots ):
    return [ humans, robots, 0, 0, 0 ]
# initialise
def human_robot_initial_state(humans, robots):
    return [ 0, 0, 1, humans, robots ]

#
#--------------------------------------------------------------------->
## Possible moves
def human_robot_possible_actions( state ):
    #list of possible action
    actions = []
    #typeof actions MOVES(0-2 LEFT TO RIGHT AND 3+ RIGHT TO LEFT)
    moves = ( ('right_2humans'),('right_1human_1robot'),('right_1human'), ('left_2humans'),('left_1human_1robot'),('left_1human') )
    #       (       0                       1                   2               3                       4               5

    # When the boat is on the right shore
    if state[2] == 1 and state[3] >= 0 and state[4]>=0:
        if state[3] == state[4]:
            actions.append(moves[4])
            if state[3] - 2 == 0:
                actions.append(moves[3])
        elif state[3] > state [4]:
            actions.append(moves[4])
            if state[3]-2 == 0 or state[3]-2 == state[4]:
                actions.append(moves[3])
        elif state[3] < state [4]:
            if state[3]-1 == 0:
                actions.append(moves[4])

    # When the boat is on the left shore
    if state[2] == 0 and state[0] >= 0 and state[1]>=0:
        if state[0] == state[1]:
            if state[0] - 1 != 0:
                actions.append(moves[1])
            if state[0] - 1 == 0:
                actions.append(moves[2])
            if state[0] - 2 == 0:
                actions.append(moves[0])
        if state[0] > state[1]:
            actions.append(moves[2])
        if state[0] < state[1]:
            if state[0] - 2 == 0:
                actions.append(moves[0])
            if state[0] - 1 == 0:
                actions.append(moves[2])
    #print actions
    return actions
#
#--------------------------------------------------------------------->
#Moves that can be made
def human_robot_successor_state( action, state ):
    newstate = deepcopy(state)
    ## embark from the left
    if action == 'right_2humans':
        newstate[0] -= 2
        newstate[3] += 2
        newstate[2] = 1
    if action == 'right_1human':
        newstate[0] -= 1
        newstate[3] += 1
        newstate[2] = 1
    if action == 'right_1human_1robot':
        newstate[0] -= 1
        newstate[3] += 1
        newstate[1] -= 1
        newstate[4] += 1
        newstate[2] = 1

    ## embark from the right going to the left
    if action == 'left_2humans':
        newstate[0] += 2
        newstate[3] -= 2
        newstate[2] = 0
    if action == 'left_1human':
        newstate[0] += 1
        newstate[3] -= 1
        newstate[2] = 0
    if action == 'left_1human_1robot':
        newstate[0] += 1
        newstate[3] -= 1
        newstate[1] += 1
        newstate[4] -= 1
        newstate[2] = 0
    return newstate
#
#--------------------------------------------------------------------->
## Call and test the goal state
def humanrobot_test_goal_state( state ):
    global human_robot_goal_state
    humans = state[0] + state[3]
    robots = state[1] + state[4]
    return human_robot_test_goal_state( state, human_robot_goal_state(humans,robots) )

#
#--------------------------------------------------------------------->
## check if the goal state has been reached
def human_robot_test_goal_state(s1, s2):
    if s2 == []:
        return False
    for i in range(5):
        if (not s1[i] == s2[i]):
            return False
    print(s1)
    return True
#
#--------------------------------------------------------------------->
#### humanrobot Puzzle problem specification
def human_robot_puzzle(h, r):
    # information used in problem space
    global humansNO, robotsNO
    humansNO = h
    robotsNO = r

    # return the functions
    humanrobot_initial_state = human_robot_initial_state(h, r)
    return( None, human_robot_position, humanrobot_initial_state,
    human_robot_possible_actions, human_robot_successor_state,
    humanrobot_test_goal_state)
