'''***********************************************
   *******COMP1011:Programming for the web********
   ***************Assignment 01 ******************
   ***************Harshit Verma*******************
   *************Python Programming****************
   ***********************************************'''

#Starting CourseWork 1.

'''Part 01'''

'''A function called anagram(str1,str2 ), which takes two strings as arguments
and returns True if the works have exactly the same letters in them and returns
False otherwise. Note that the order of the letters is unimportant, it is 
merely enough for the two words to contain the same letters.''' 
 
#Define the function    
def anagram(str1, str2):
    
    #aAssigning
    str1 = sorted(str1)   #sorted string1
    str2 = sorted(str2)   #sorted string2
    
    return str1 == str2   #Return True if string1 is same as string2
                          #if it's not return False

'''************************Done Part 01**********************************''' 

'''Part 02'''

'''This function should call the ’anagram’ function with different
strings to test if it is working correctly. The function should 
print out in a human readable format the tests that it is running 
and whether it passed or not.'''   
  
#Define the function    
def test_anagram():
    #Testing
    #It will print True if string1 is same as string2
    #if it will not print False
    print(anagram("normal", "mornal"))
    print(anagram("treag", "great"))
    print(anagram("harsh", "gender")) 
    print(anagram("python", "onthpy"))
    print(anagram("danger", "gender"))
test_anagram()  ##Checking the function 

'''************************Done Part 02**********************************''' 

'''Part 03'''
'''This function should return a list of words which have been read 
from the file dictionary.txt (the file is available in the coursework 
resources download). The file is formatted with a new word on each line.'''

#Define the function
def get_dictionary_wordlist():
    #Creating an empty list
    dictionary_file = []
    #open the given file
    with open('dictionary.txt') as fileobject:
        #using for loop
        for item in fileobject:
            dictionary_file.append(item[:-1])
        return dictionary_file #Return the dictionary
#print(get_dictionary_wordlist())     

'''************************Done Part 03**********************************''' 
        
'''Part 04'''

'''This function should call the ’get dictionary wordlist’ function
and should test if the function is working correctly. The function
should print out the number of words in the dictionary and should
print out the first 10 words.'''
        
#Define the function
def test_get_dictionary_wordlist():
    #Assigning file
    file = get_dictionary_wordlist()
    
    #Using print coomand below to test only
    '''I commented the print part below because it's print the whole
    words of dictionary.txt'''
    #print(file)
    
    #Numbers of words in dictionary.txt
    print("Numbers of words in file:")
    print (len(file))
    
    #Printing out this sentence before ten words from the dictionary.txt
    print("Ten word from the dictionary.txt:")
    #Loop to return only ten words from the given file
    for i in range(10):
        print (file[i])
test_get_dictionary_wordlist()   ##Call the function 
#Now function which is going to print number of words in the given file.

'''************************Done Part 04**********************************''' 

'''Part 05'''

'''This function should return a list of strings which are anagrams of the 
first argument. The second argument of the function is a list of words to 
check if they are anagrams of the first.'''

#Define the function find_anagrams_in_wordlist
def find_anagrams_in_wordlist(str,str_list):
    #create wordlist    
    wordlists = []
    for i in str_list:
        if anagram(str,i) == True:
            wordlists.append(i)
    return wordlists
#Using print command below to test only    
#print(find_anagrams_in_wordlist('ranged',['danger', "gander", "catter", "RAT"]))  

'''************************Done Part 05**********************************'''     
    
'''Part 06'''

'''This function should return a list of all the words in the 
dictionary file (dictionary.txt) that are anagrams of the first
argument.'''       
#define the find_angram        
def find_anagrams(str):
    #Assigning dictionary to get_dictonary_wordlist()
    dictionary = get_dictionary_wordlist()
    
    return find_anagrams_in_wordlist(str,dictionary) #This will return the
                                                     #angrams of dictionary    
'''************************Done Part 06**********************************''' 

'''Part 07'''

'''A function called test find anagrams() that accepts no arguments. This
function should call the ’find anagrams’ function for a set of different 
inputs to determine if it is working correctly.'''
        
#define the functiom test_find_anagram()        
def test_find_anagrams():
    #Testing
    #It will print True if str
    #if it will not print False
    print (find_anagrams("function"))
    print (find_anagrams("benchmark"))
    print (find_anagrams("python"))
    print (find_anagrams("com"))
    print (find_anagrams("apple"))
    
test_find_anagrams()    #call function

'''************************Done Part 07**********************************''' 


'''Part 08'''

'''A function called sub anagram(str1, str2 ) that takes two arguments. This
function should return True if str2 is a sub-anagram of str1. A string, str1, 
is a “sub-anagram” of str2 if and only if every letter that occurs in str1 
occurs at least as many times in str2. For example, “not” is a sub-anagram of 
“function” but neither “note” nor “tint” are sub-anagrams of “function”.'''

#Define the function   
def sub_anagram(str1, str2):
    
    str1 = list(str1)  #Assigning string1 to list of str1
    str2 = list(str2)  #Assignong string2 to list of str2
    #Using for loop
    for x in str2:   #for loop
        if x in str1:  #If any 'x' word is in string1
            str1.remove(x)   #Remove
            if len(str1) == 0: 
                return True  #Return true if char from string1 is in string2
    else:
        return False #Return false if char from string1 is not in string2
#using print command below only for test    
#print(sub_anagram('note','function')) 

'''************************Done Part 08**********************************'''         
                

'''Part 09'''

'''find_sub_anagram_in_wordlist(str, str_list ) which takes 
two arguments. This function should return a list of words that 
are in the second argument that are sub-anagrams of the first argument.'''

#define the function    
def find_sub_anagram_in_wordlist(str,str_list):  
    #Create empty list 
    sub_anagram_list = []
    for x in str_list:  #For loop
        if sub_anagram(str,x)  ==  True:  #If statement
            sub_anagram_list.append(x)   #append() appends a passed obj into the existing list
    return sub_anagram_list  #Return sub_anagram
#using print command below only for test    
#print(find_sub_anagram_in_wordlist('fun',['function', "funny", "dummy"])) 
#print(find_sub_anagram_in_wordlist('com',['boy', "computer", "company"])) 
#print(find_sub_anagram_in_wordlist('har',['niharika', "harshit", "karan"]))  

'''************************Done Part 09**********************************''' 
  
'''Part 10'''

'''This function should return a list of words that are in the
second argument that are sub-anagrams of the first argument.'''

    #define the function 
def test_find_sub_anagram_in_wordlist():
     #Testing
    #It will print word if string2 is having some character from the string2
    #otherwise, it will print nothing.
    print(find_sub_anagram_in_wordlist('har', ['harshit', 'python', 'computer']))
    print (find_sub_anagram_in_wordlist('mark', ['benchmark', 'markone', 'programming']))
    print(find_sub_anagram_in_wordlist('py', ['harshit', 'python', 'pynoe']))
    print (find_sub_anagram_in_wordlist('pro', ['procedural', 'mark0ne', 'programming']))

test_find_sub_anagram_in_wordlist() #call the function

'''************************Done Part 10**********************************''' 

'''Part 11'''

'''a function called remove letters(str1, str2 ) which takes two arguments.
This function should return a string that is obtained by removing the letters of the
second argument from the first argument. Each occurence of a letter in str2 should
remove at most one matching letter from str1.''' 

#Define the function remove_letters(str1,str2)
def remove_letters(str1,str2):
    #Assigning list_of_letters to list of string2
    list_of_letters= list(str1)
    
     # Loop for every character in string2
    for char in str1:
        #if character is in string1 then remove that charcter from the string2
        if char in str2:
             list_of_letters.remove(char)  #Remove the string1 character from the string 2
    return "".join(list_of_letters) #Return new word

#Using print command below only for checking that function is working or not.
#print(remove_letters('harshit','it'))    
#print(remove_letters('niharika','arika'))

'''************************Done Part 11**********************************'''   

'''Part 12'''

'''a function called test remove letters() which takes no arguments. This
function should call the remove letters function on different inputs to 
determine if the function is working correctly.'''


#define the function 
def test_remove_letters():
    #Test the remove_letters function
    #Prints the words after removiing the char of string2.
    print(remove_letters('harshit','it'))
    print(remove_letters('programming','ming'))
    print(remove_letters('procedural','pro'))
    print(remove_letters('physics','sics'))
    print(remove_letters('astrophysics','astro'))
    #Testing remove letters by printing it.
    
'''************************Done Part 12**********************************''' 
   
'''Part 13'''

'''A function called find two word anagrams(str ) which takes one argument.
This function should return a list of all strings made up of two words, 
separated by a space. You should try to find all pairs of words in the 
dictionary provided on the website such that those two words contain the 
same letters as the letters in the argument.'''

#Define the function    
def find_two_word_anagrams(str):
    #Create empty list
    two_word_anagrams = []
    #Assign str_list to get_dictionary_wordlist
    str_list = get_dictionary_wordlist()
    #Assign List
    List = find_sub_anagram_in_wordlist(str,str_list)
    #Create another empty list
    #remains = []
    #Using for loop
    for part_anagram in List:
        #Assign remains remove_letters(part_anagram, str)
        remains = remove_letters(part_anagram, str)
        #Assign w to find_anagrams_in_wordlist(remains,str_list)
        w = (find_anagrams_in_wordlist(remains,str_list))
        for word in w: #for loop
#            remaining_letters = part_anagram + (y)
            two_word_anagrams.append(part_anagram + " " + word)
        #Checking only    
        #print(w)
            
    return two_word_anagrams  #Return two_word_anagram
    
#using print to check that function is working correctly or not        
print(find_two_word_anagrams("mark"))    

'''************************Done Part 13**********************************'''  

'''**********************************************************************
   **********************Done Coursework 1*******************************  
   *********************************************************************'''
