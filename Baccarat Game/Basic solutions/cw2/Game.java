/*********************************************************
***************Object Oriented Programming****************
*********************Coursework_2*************************
***********************Game.java**************************
*********************Harshit Verma************************
*********************ID: 200978548************************
**********************************************************/

//cw1 package
package cw2;
//Import all packages
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import javafx.scene.image.Image;

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
//                              BASIC SOLUTIONS                               //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
public class Game
{
  public static void main(String[] args) throws IOException
  {
    System.out.println("******************************************");
    System.out.println("*       Play Baccarat Card Game          *");
    System.out.println("*            (Punto Banco)               *");
    System.out.println("*              Welcome!!!                *");
    System.out.println("******************************************" + "\n");

    //Scanner simply scan the text which can parse primitive types and strings
    //Create a scanner object
    Scanner reader = new Scanner(System.in);

    //Create Hand object i.e newHand
    Hand newHand = new Hand();

    //Prompt the user to enter first rank card
    System.out.format("Enter first rank card (A, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K): ");
    char first_rank = reader.next(".").charAt(0);

    //Prompt the user to enter first suit card
    System.out.format("Enter first suit card (C, D, H, S): ");
    char first_suit = reader.next(".").charAt(0);

    //Create BaccaratCard object
    BaccaratCard newCard1 = new BaccaratCard(first_rank, first_suit);
    //Add the cards
    newHand.add(newCard1);

    //Prompt the user to enter second rank card
    System.out.format("\nEnter second rank card (A, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K): " );
    char second_rank = reader.next(".").charAt(0);

    //Prompt the user to enter second suit card
    System.out.format("Enter second suit card (C, D, H, S): ");
    char second_suit = reader.next(".").charAt(0);

    //Create BaccaratCard object
    BaccaratCard newCard2 = new BaccaratCard(second_rank, second_suit);
    //Add the cards
    newHand.add(newCard2);

    //Display the hand contents and value of two cards
    System.out.println("\nHand contents both cards: " + newHand.toString());
    System.out.println("Player has an initial total of both cards: " + newHand.value());


    //using if statement
    //If player has an initial total of 0 to 5, he will draw third card
    if(newHand.value() <= 5)
    {
      System.out.println("\nIf player has a total of less than or equal to 5 then he has to draw a third card that is 'Player Rule'");

      //Prompt the user to enter third rank card
      System.out.format("\nEnter third rank card (A, 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K): ");
      char third_rank = reader.next(".").charAt(0);

      //Prompt the user to enter third suit card
      System.out.format("Enter third suit card (C, D, H, S): ");
      char third_suit = reader.next(".").charAt(0);
      BaccaratCard newCard3 = new BaccaratCard(third_rank, third_suit);
      newHand.add(newCard3);

      //Display the hand contents and value if third card is also added
      System.out.println("\nHand contents all three cards: " + newHand.toString());
      System.out.println("Player has an initial total of all three cards: " + newHand.value());
    }
    //Using else statement
    //Else player has an initial total of 6 or 7, then he stands
    else
    {

    }
  }
}

/**********************************Game.java***********************************/
