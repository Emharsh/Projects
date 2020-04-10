## rh_search_tester.py
## This is the main file for running human robot search algorithm.

print( "Loading search_tester.py" )

import sys
from tree          import *
from queue_search  import *
from human_robot    import *


# Make Python wait between search tests.
def wait():
      raw_input('<Press enter to continue>')

def run_tests_on_eight_puzzle():
      search( human_robot_puzzle(3, 3), 'depth_first', 50000, ['loop_check']  )
      wait()
      search( human_robot_puzzle(4, 3), 'depth_first', 100000, ['loop_check'] )
      wait()
      search( human_robot_puzzle(4, 5), 'depth_first', 100000, ['loop_check'] )


## run tests on human robot puzzle problem
run_tests_on_eight_puzzle()
