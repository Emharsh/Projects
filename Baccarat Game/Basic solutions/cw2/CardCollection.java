//cw1 package
package cw2;
//Import all packages
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;


/**
 * A class to represent a collection of playing cards.
 *
 * <p>The intent is that this should form the basis for new classes
 * useful in card games.  It isn't meant to be instantiated itself and
 * is therefore declared as abstract.</p>
 *
 * <p>Provided for use in COMP1721 Coursework 2.</p>
 *
 * @author Nick Efford
 */
public abstract class CardCollection
{
  protected List<Card> cards = new LinkedList<>();

  /**
   * @return Number of cards in this collection
   */
  public int size()
  {
    return cards.size();
  }

  /**
   * @return True if this collection is empty, false otherwise
   */
  public boolean isEmpty()
  {
    return cards.isEmpty();
  }

  /**
   * Indicates whether a particular card is present in this collection.
   *
   * @param card Card we are looking for
   * @return True if the card is present, false otherwise
   */
  public boolean contains(Card card)
  {
    return cards.contains(card);
  }

  /**
   * Adds the given card to this collection.
   *
   * @param card Card to be added
   */
  public void add(Card card)
  {
    cards.add(card);
  }

  /**
   * Discards all the cards from this collection.
   */
  public void discard() {
    cards.clear();
  }

  /**
   * Sorts this collection's cards into their natural order.
   */
  public void sort()
  {
    Collections.sort(cards);
  }
}
