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


/*In a file called Hand.java, create a public class called Hand,inheriting from
CardCollection.In this class,override the default version of the toString
method with a new version that returns a string containing two-character
representations of each card,separated from each other by a space*/
public class Hand extends CardCollection
{
  @Override
  public String toString()
  {
    String cardString = new String();
    if (cards.size() == 2)
    {
      cardString = String.format("%s %s", cards.get(0).toString(), cards.get(1).toString());
    }
    if (cards.size() == 3)
    {
      cardString = String.format("%s %s %s", cards.get(0).toString(), cards.get(1).toString(), cards.get(2).toString());
    }
    return cardString;
  }

  /* Add to Hand a method called value that returns the total points value of
  the cards in the hand, according to the rules of Baccarat.*/
  public int value()
  {
    //Declare totalValue to int and initialise to zero
    int totalValue = 0;

    //Using for loop to walk until hit the last card
    for (int i = 0; i < cards.size(); i++)
    {
      //Count the value of the cards
      totalValue += cards.get(i).value();
    }
    //return the totalvalue, if total is in two digit then value at one's place will be count
    return totalValue % 10;
  }
}

/**********************************Hand.java***********************************/
