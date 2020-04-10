//cw1 package
package cw2;
//Import all packages
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import javafx.scene.image.Image;

/*In a file called Shoe.java, create a public class Shoe. Shoe class should
inherit from CardCollection and should have a constructor that allows the
number of decks to be specified as 4, 6 or 8.  The constructor should ensure
that cards from the given number of decks are stored in a Shoe object,
using the inherited list for this purpose.*/
public class Shoe extends CardCollection
{
  //constructor that allows the number of decks to be specified as 4,6 or 8
  public Shoe(int numDecks)
  {
    //Using if statement
    //If numDecks is not equal to 4,6 or 8 then show invalid number of decks.
    if (numDecks != 4 && numDecks != 6 && numDecks != 8)
    {
      throw new IllegalArgumentException("Invalid number of Decks");
    }

    //Using else statement
    //Else cards from the number of decks are stored in a object.
    else
    {
      //for loop to walk until hit the last deck
      for(int i = 0; i < numDecks; i++)
      {
        //for loop to walk until hit the last suit
        for(char rank: Card.getRanks())
        {
          //for loop to walk until hit the last rank
          for(char suit: Card.getSuits())
          {
            //Create BaccaratCard object
            BaccaratCard newCard = new BaccaratCard(rank, suit);

            //Add method, add card in it
            cards.add(newCard);
          }
        }
      }
    }
  }

  //The deal method should remove the ‘top card’ from the shoe and return it.
  public Card deal()
  {
    Card topCard = cards.get(0);
    cards.remove(topCard);
    return topCard;
  }

  //The shuffle method should randomly shuffle the cards in the shoe.
  public void shuffle()
  {
    Collections.shuffle(cards);
  }
}
