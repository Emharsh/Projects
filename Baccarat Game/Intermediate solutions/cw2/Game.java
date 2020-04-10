/*********************************************************
***************Object Oriented Programming****************
*********************Coursework_2*************************
**********************Game.java**************************
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
//                         INTERMEDITAE SOLUTIONS                             //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
public class Game
{

  private Shoe shoe;
  private Hand player_Hand;
  private Hand banker_Hand;

  /*Give the class the constructor. This constructor should initialise the
  fields and set things up ready for the start of the game*/
  public Game(int numDecks)
  {
    //Create Shoe object and initialise to numDecks
    shoe = new Shoe(numDecks);
    //Create Hand object i.e player_Hand
    player_Hand = new Hand();
    //Create Hand object i.e banker_Hand
    banker_Hand = new Hand();

  }

  public void playRound()
  {
    System.out.println("******************************************");
    System.out.println("*       Play Baccarat Card Game          *");
    System.out.println("*            (Punto Banco)               *");
    System.out.println("*              Welcome!!!                *");
    System.out.println("******************************************" + "\n");

    /*************************Dealing two cards to Player***********************/

    //Shuffe the cards
    //Calling the function
    shoe.shuffle();

    //Create BaccaratCard objects for the first card
    BaccaratCard player_Dealt1 = new BaccaratCard(shoe.deal().toString());
    //Add the cards
    player_Hand.add(player_Dealt1);

    //Create BaccaratCard objects for the second card
    BaccaratCard player_Dealt2 =  new BaccaratCard(shoe.deal().toString());
    //Add the cards
    player_Hand.add(player_Dealt2);

    //Display the hand contents and value of two cards
    System.out.println("\nPlayer Cards: " + player_Hand.toString() + " = " + player_Hand.value());

    /************************Dealing two cards to banker************************/

    //Shuffe the cards
    //Calling the function
    shoe.shuffle();

    //Create BaccaratCard objects for the first card
    BaccaratCard banker_Dealt1 = new BaccaratCard(shoe.deal().toString());
    //Add the cards
    banker_Hand.add(banker_Dealt1);

    //Create BaccaratCard objects for the second card
    BaccaratCard banker_Dealt2 =  new BaccaratCard(shoe.deal().toString());
    //Add the cards
    banker_Hand.add(banker_Dealt2);

    //Display the hand contents and value of two cards
    System.out.println("\nBanker Cards: " + banker_Hand.toString() + " = " + banker_Hand.value());

    /************************Dealing third card to Player**********************/

    //using if statement
    //If player has an initial total of 0 to 5, he will draw third card
    if(player_Hand.value() <= 5)
    {
      //Calling the function, shuffling the cards
      shoe.shuffle();

      //Create BaccaratCard objects for the first card
      BaccaratCard player_Dealt3 = new BaccaratCard(shoe.deal().toString());
      //Add the cards
      player_Hand.add(player_Dealt3);

      //Display the hand contents and value if third card is also added
      System.out.println("\n***Dealing third card to player***");
      //Display the hand contents and value of two cards
      System.out.println("\nPlayer Cards: " + player_Hand.toString() + " = " + player_Hand.value());;
    }
    //Using else statement
    //Else player has an initial total of 6 or 7, then he stands
    else
    {

    }

    /************************Dealing third card to banker**********************/

    if(banker_Hand.value() <= 5)
    {
      //Calling the function, shuffling the cards
      shoe.shuffle();

      //Create BaccaratCard objects for the first card
      BaccaratCard banker_Dealt3 = new BaccaratCard(shoe.deal().toString());
      //Add the cards
      banker_Hand.add(banker_Dealt3);

      //shuffling
      shoe.shuffle();

      //Display the hand contents and value if third card is also added
      System.out.println("\n***Dealing third card to banker***");
      //Display the hand contents and value of two cards
      System.out.println("\nBanker Cards: " + banker_Hand.toString() + " = " + banker_Hand.value());;
    }
    //Using else statement
    //Else banker has an initial total of 6 or 7, then he stands
    else
    {

    }

    //Now using if statement, to check who win the hand; player or banker
    if(player_Hand.value() > banker_Hand.value())
    {
      System.out.println("\nPlayer Win!!!\n");
    }
    else if(banker_Hand.value() > player_Hand.value())
    {
      System.out.println("\nBanker Win!!!\n");
    }
    else
    {
      System.out.println("\nTie!!!!\n");
      System.out.println("");
    }
  }

  /*****************************Main Routine***********************************/

  public static void main(String[] args)
  {
    //Create Game object with 4 decks
    Game new_Game = new Game(6);
    //Calling the function
    new_Game.playRound();
  }

}

/*****************************Completed Game.java*******************************/
