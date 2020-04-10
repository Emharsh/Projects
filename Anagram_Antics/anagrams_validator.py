import sys
import anagrams as anna

nt = type(None)

functions = {
			("anagram",bool) : ["",""],
			("test_anagram",nt) : [],
			("get_dictionary_wordlist",list) : [],
			("test_get_dictionary_wordlist",nt) : [],
			("find_anagrams_in_wordlist",list) : ["",[]],
			("find_anagrams",list) : [""],
			("test_find_anagrams",nt) :[],
			("sub_anagram",bool) : ["",""],
			("find_sub_anagram_in_wordlist",list) : ["",[]],
			("test_find_sub_anagram_in_wordlist",nt) : [],
			("remove_letters",str) : ["",""],
			("test_remove_letters",nt) : [],
			("find_two_word_anagrams",list): [""]
			}


missing_functions = []

retvals = []

def check_function_exists(elm):
		if elm[0] in dir(anna):
			return True
		else :
			missing_functions.append(elm)
			return False

def check_return_type(elm):

	a = getattr(anna, elm[0])
	b = None
	if functions[elm] != []:
		b = type(a(*functions[elm]))
	else :
		b = type(a())

	if b != elm[1]:
		retvals.append("Function " + str(elm[0]) + " returned " + str(b) + " but expected " + str(elm[1]) )
	

if __name__ == '__main__':
	print("Checking your submission....")
	print("this may take a short time")
	tmp = sys.stdout
	sys.stdout = None
	for elm in functions:
		if check_function_exists(elm):
			check_return_type(elm)

	sys.stdout = tmp
	if missing_functions != [] :
		print("Could not find the following functions:")
		for func in missing_functions:
			print("-",func[0])

	if retvals != []:
		print("The following functions were not defined according to the specification")
		for func in retvals:
			print("-",func)
	if missing_functions == [] and retvals == []:
		print("Great everything seems to be good. You might be ready to submit.")
