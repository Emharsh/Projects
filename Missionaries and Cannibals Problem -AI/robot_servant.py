## robot_servant.py

## This code implements a search space model for a robot
## that can move around a house and pick up and put down
## objects.

## The function calls provided for a general search algorithm are:

## robot_print_problem_info()
## robot_initial_state
## robot_possible_actions(state)
## robot_successor_state(action,state)
## robot_goal_state( state )
## robot_display_state( state )  ## not yet implemented

print( "Loading robot_servant.py" )

ROBOT_GOAL = "undefined" ## will be defined when problem is initialised

def robot_initialise_1():
    global permanent_facts, initial_state, ROBOT_GOAL
    permanent_facts = robot_permanent_facts_1
    initial_state   = robot_initial_state_1
    ROBOT_GOAL      = robot_goal_1


robot_permanent_facts_1 = [
                    ('connected', 'kitchen', 'garage', 'door_kg'),
                    ('connected', 'kitchen', 'larder', 'door_kl'),
                  ]

robot_initial_state_1 = [
                  ('locked', 'door_kl'),
                  ('unlocked', 'door_kg'),
                  ('located', 'robot', 'kitchen'),
                  ('located', 'key', 'garage' ),
                  ('located', 'spade', 'garage' ),
                  ('located', 'ring', 'larder' ),
                  ('located', 'sausages', 'larder')
                ]

robot_goal_1 =  ('and', ('carrying','ring'), ('located', 'sausages', 'kitchen'))

robot_goal_easy =  ('carrying','ring')









def robot_possible_actions(state):
    pickup_actions = possible_pickup_actions(state)
    move_actions   = possible_move_actions(state)
    drop_actions   = possible_drop_actions(state)
    unlock_actions = possible_unlock_actions(state)
    return pickup_actions + move_actions + drop_actions + unlock_actions


def robot_successor_state( action, state ):
    newstate = list(state)  ## set newstate to a copy of state
    robloc   = get_robot_location(state)

    if action[0] == 'pickup':
       item = action[1]
       newstate.remove(('located', item, robloc))
       newstate.append(('carrying', item))
       newstate.sort()
       return newstate

    if action[0] == 'drop':
       item = action[1]
       newstate.remove(('carrying', item))
       newstate.append(('located', item, robloc))
       newstate.sort()
       return newstate

    if action[0] == 'move':
       dest = action[1]
       newstate.remove(('located', 'robot', robloc))
       newstate.append(('located', 'robot', dest))
       newstate.sort()
       return newstate

    if action[0] == 'unlock':
       door = action[1]
       newstate.remove(('locked', door))
       newstate.append(('unlocked', door))
       newstate.sort()
       return newstate

    print( "ERROR: unrecognised action: " + action )
    return ['error']


def possible_pickup_actions(state):
       loc = get_robot_location(state)
       items = get_location_items(loc, state)
       items.remove('robot')
       return [('pickup', item) for item in items]

def possible_move_actions(state):
    robloc = get_robot_location(state)
    destinations = []
    for fact in permanent_facts:
        ##print fact
        if (fact[0] == 'connected'):
           r1   = fact[1]
           r2   = fact[2]
           door = fact[3]
           if holds(('unlocked', door), state):
              if r1 == robloc:
                 destinations = destinations + [r2]
              if r2 == robloc:
                 destinations = destinations + [r1]
    return [('move', dest) for dest in destinations]

def possible_drop_actions(state):
       items = []
       for fact in state:
           if fact[0]=='carrying':
              items = items + [fact[1]]
       return [('drop',i) for i in items]

def possible_unlock_actions(state):
      if not(holds( ('carrying', 'key'), state)):
         return []
      robloc = get_robot_location(state)
      doors = []
      for fact in permanent_facts:
          if (fact[0] == 'connected'):
             r1   = fact[1]
             r2   = fact[2]
             door = fact[3]
             if holds(('locked', door), state):
                if (r1 == robloc) | (r2 == robloc):
                   doors = doors + [door]
      return [('unlock', d) for d in doors]


def get_robot_location(state):
    for fact in state:
        if ((fact[0] == 'located') & (fact[1] == 'robot')):
           return fact[2]

def get_location_items( loc, state ):
      items = []
      for fact in state:
          if (fact[0] == 'located'):
             if (fact[2] == loc):
                items = items + [ fact[1] ]
      return items

def goal_string():
         global ROBOT_GOAL
         ##return " ".join(ROBOT_GOAL)
         return str(ROBOT_GOAL)

def robot_print_problem_info():
         print( "Problem: Robot in the Kitchen" )
         print( "Goal: " + goal_string() )


def set_robot_goal( goal ):
         global ROBOT_GOAL
         ROBOT_GOAL = goal
         return robot_goal_state

def robot_goal_state( state ):
         global ROBOT_GOAL
         return holds( ROBOT_GOAL, state )  


def holds(fact,state):
       if fact[0] == 'and':
          return conjunction_holds( fact, state )
       if fact in permanent_facts:
            return True
       if fact in state:
            return True
       return False

def conjunction_holds( conjunction, state ):
       for i in range(1, len(conjunction)):
           if not( holds(conjunction[i],state) ):
              return False
       return True


robot_search_problem_1 = ( robot_initialise_1,
                           robot_print_problem_info,
                           robot_initial_state_1, 
                           robot_possible_actions,
                           robot_successor_state,
                           robot_goal_state,
                         )






