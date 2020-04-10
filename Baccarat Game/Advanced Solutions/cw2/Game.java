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
//                             ADVANCED SOLUTIONS                             //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////

/*A class to represent the Baccarat Game using the Punto Banco rulles*/
public class Game
{
  //Private Access Modifier
  private int playerWin_Hand = 0;
  private int bankerWin_Hand = 0;
  private int tie = 0;
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
    //Shuffle the cards, calling the function
    shoe.shuffle();
  }

  /*Create a function that decides the  winner of the game and give that function
  two arguments*/
  public int WinnerOfGame(int player_Value, int banker_Value)
  {
    //Declare the variable and initialise it
    int win = -1;

    //If value of player cards is equal to banker's  card then it's tie
    if( player_Value == banker_Value)
    {
      win = 0;
      tie++;
    }

    //else if banker's card value is greater than player's, then banker wins
    else if( player_Value < banker_Value)
    {
      win = 2;
      bankerWin_Hand++;
    }

    //else if player's card value is greater than banker's, then player wins
    else
    {
      win = 1;
      playerWin_Hand++;
    }
    return win;
  }

  /*Player's rule
  If Player has an initial total of 0–5, he draws a third card. If Player has
  an initial total of 6 or 7, he stands. */
  public void thirdCardDrew(int playerHand_Value, int bankerHand_Value)
  {
    //If Player drew a 2 or 3, Banker draws with 0–4 and stands with 5–7.
    if(playerHand_Value == 2 || playerHand_Value == 3)
    {
      if(bankerHand_Value < 5 ){
        thirdCardToBanker();
      }
    }

    //If Player drew a 4 or 5, Banker draws with 0–5 and stands with 6–7
    else if(playerHand_Value == 4 || playerHand_Value == 5)
    {
      if( bankerHand_Value < 6)
      {
        thirdCardToBanker();
      }
    }

    //If Player drew a 6 or 7, Banker draws with 0–6 and stands with 7.
    else if(playerHand_Value == 6 || playerHand_Value == 7)
    {
      if( bankerHand_Value < 7)
      {
        thirdCardToBanker();
      }
    }

    //If Player drew an 8, Banker draws with 0–2 and stands with 3–7.
    else if (playerHand_Value == 8)
    {
      if(bankerHand_Value < 2)
      {
        thirdCardToBanker();
      }
    }

    //If Player drew an ace, 9, 10, or face-card, the Banker draws with 0–3 and stands with 4–7
    else if (playerHand_Value == 1 || playerHand_Value == 9 || playerHand_Value == 0)
    {
      if(bankerHand_Value < 4)
      {
        thirdCardToBanker();
      }
    }
  }

  /*If Player stood pat (i.e., has only two cards), the banker regards only his
  own hand and acts according to the same rule as Player.
  Function which deals with the third card to the banker*/
  public void thirdCardToBanker()
  {
    //Add method
    banker_Hand.add(shoe.deal());

    System.out.println("***Dealing third card to banker***");
    System.out.println("Banker Cards: " + banker_Hand.toString() + " = " + banker_Hand.value());
  }

  /*Extend the implementation of playRound in Game so that it plays a realistic
  round of Baccarat, following the full Punto Banco rules.*/
  public void playRound()
  {
    // Dealing the two cards
    player_Hand.add(shoe.deal());
    banker_Hand.add(shoe.deal());

    player_Hand.add(shoe.deal());
    banker_Hand.add(shoe.deal());

    System.out.println("\nPlayer Cards: " + player_Hand.toString() + " = " + player_Hand.value());
    System.out.println("Banker Cards: " + banker_Hand.toString() + " = " + banker_Hand.value());

    //f neither the Player nor Banker is dealt a total of 8 or 9 in the first two cards (known as a "natural")
    if((player_Hand.value() == 8 || banker_Hand.value() == 8) || (player_Hand.value() == 9 || banker_Hand.value() == 9))
    {
      System.out.println("Natural case!!!");
    }

    //If Player has an initial total of 0–5, he draws a third card.
    else if (player_Hand.value() <= 5)
    {
      Card varCard = shoe.deal();
      player_Hand.add(varCard);
      System.out.println("***Dealing third card to player***");
      System.out.println("Player Cards: " + player_Hand.toString() + " = " + player_Hand.value());

      thirdCardDrew(varCard.value(),banker_Hand.value());
    }

    // The banker regards only his own hand and acts according to the same rule as Player.
    else
    {
      if(banker_Hand.value() <= 5)
      {
        thirdCardToBanker();
      }
    }
  }

  /*Create a function which print out the result of the Baccarat Card game*/
  public void print_Result (int player, int banker)
  {
    //Declare the variable and initialise it
    int result = WinnerOfGame(player_Hand.value(), banker_Hand.value());

    //If game result is equal to zero then there will be tie between player and banker
    if(result == 0)
    {
      System.out.println("Tie");
    }

    //else if game result is equal to zero then there will be tie between player and banker
    else if(result == 1)
    {
      System.out.println("Player win!");
    }

    //else if game result is equal to zero then there will be tie between player and banker
    else if (result == 2)
    {
      System.out.println("Banker win!");
    }
  }

 /*a method called play that repeatedly calls playRound until the shoe is
 exhausted. Once the game finished, your play method should display summary
 statistics showing the number of rounds played, number of player wins, number
 of banker wins and number of ties.*/
  public void play()
  {
    //Initialise the variable
    int current_Round = 1;

    //while loop
    while(shoe.size() >= 5)
    {
      System.out.println("Round " + current_Round);
      // repeatedly calls playRound until the shoe is exhausted.
      this.playRound();

      //callinng the function to get the result of the game
      print_Result(player_Hand.value(),banker_Hand.value());
      player_Hand.discard();
      banker_Hand.discard();
      //Increment in the round
      current_Round++;
    }
    // Displaying the statistics
    System.out.println("Rounds played: " +  current_Round);
    System.out.println("Player wins: " + playerWin_Hand);
    System.out.println("Banker wins: " + bankerWin_Hand);
    System.out.println("Ties " + tie);
    System.exit(1);
  }

 /*A method called playWithPrompt.This should behave in a similar way to play,
 except that it should end each round by asking the user if they want to play
 another round, terminating the game if they respond negatively.
 Note that summary statistics should still be displayed if a game is
 terminated early*/
 public void playWithPrompt()
  {
    //Initialise the variables
    int current_Round = 0;
    char another_Round = 'y';

    //while loop
    while(shoe.size() > 6)
    {
      Scanner user_input = new Scanner(System.in);
      if( another_Round == 'y')
      {
        current_Round++;
        System.out.println("\nRound " + current_Round);
        // repeatedly calls playRound until the shoe is exhausted.
        this.playRound();
        print_Result(player_Hand.value(),banker_Hand.value());

        //Empty both the hands
        player_Hand.discard();
        banker_Hand.discard();

        System.out.format("\nPlay another round? (y/n): ");
        another_Round = user_input.next().charAt(0);

      }

      else if(another_Round == 'n')
      {
        shoe.discard();
        // Displayign the statistics
        System.out.println("\nRounds played: " +  current_Round);
        System.out.println("Player wins: " + playerWin_Hand);
        System.out.println("Banker wins: " + bankerWin_Hand);
        System.out.println("Ties " + tie);
        System.exit(1);
      }

      else
      {
        System.out.println("INVALID ANSWER!!!! Answer should be y or n...");
        another_Round = user_input.next().charAt(0);
      }
    }

    /* Displayign the statistics, If show exhausted and there is no card
    then exit the program by printing statistics*/
    System.out.println("\nRounds played: " +  current_Round);
    System.out.println("Player wins: " + playerWin_Hand);
    System.out.println("Banker wins: " + bankerWin_Hand);
    System.out.println("Ties " + tie);
  }

  /********************************Main Routine********************************/
  public static void main(String[] args)
  {
    System.out.println("******************************************");
    System.out.println("*       Play Baccarat Card Game          *");
    System.out.println("*            (Punto Banco)               *");
    System.out.println("*              Welcome!!!                *");
    System.out.println("******************************************");

    Game new_game = new Game(4);

    /*If the user wishes to play and complete the whole game, then change the
    playWithPrompt() to simply play(), this will allow the game to autorun and show
    results of a single game at a time.*/

    //new_game.play();
    new_game.playWithPrompt();

  }
}

/*****************************Completed Game.java*******************************/
