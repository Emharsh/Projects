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


/**
 * Simple representation of a playing card.
 *
 * <p>Provided for use in COMP1721 Coursework 2.</p>
 *
 * @author Nick Efford
 */
public class Card implements Comparable<Card>
{
  /*--------------------------- Class-level code ---------------------------*/

  private static final List<Character> RANKS = Arrays.asList(
   'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
  );

  private static final List<Character> SUITS = Arrays.asList(
   'C', 'D', 'H', 'S'
  );

  private static Map<String,Image> images = new HashMap<>();

  static {
    try (ZipFile zip = new ZipFile("images.zip")) {
      for (char suit : Card.getSuits()) {
        for (char rank : Card.getRanks()) {
          String card = String.format("%c%c", rank, suit);
          String filename = card + ".png";
          ZipEntry entry = zip.getEntry(filename);
          Image image = new Image(zip.getInputStream(entry));
          images.put(card, image);
        }
      }
    }
    catch (IOException error) {
      // Do nothing if images cannot be loaded
    }
  }

  /**
   * @return An unmodifiable list of the characters representing card ranks
   */
  public static List<Character> getRanks()
  {
    return Collections.unmodifiableList(RANKS);
  }

  /**
   * @return An unmodifiable list of the characters representing card suits
   */
  public static List<Character> getSuits()
  {
    return Collections.unmodifiableList(SUITS);
  }

  /*------------------------- Instance-level code --------------------------*/

  private char rank;
  private char suit;

  /**
   * Creates a Card object.
   *
   * @param rank Rank of the card
   * @param suit Suit of the card
   * @throws IllegalArgumentException if rank or suit are invalid
   */
  public Card(char rank, char suit)
  {
    set(rank, suit);
  }

  /**
   * Creates a Card object, given rank and suit as a string.
   *
   * @param code Two-character code representing the card - e.g., "AC"
   * @throws IllegalArgumentException if string is invalid
   */
  public Card(String code)
  {
    if (code.length() != 2) {
      throw new IllegalArgumentException("card codes must be two characters");
    }

    set(code.charAt(0), code.charAt(1));
  }

  /**
   * @return This card's rank
   */
  public char getRank()
  {
    return rank;
  }

  /**
   * @return This card's suit
   */
  public char getSuit()
  {
    return suit;
  }

  /**
   * @return Image associated with this card
   */
  public Image getImage()
  {
    return images.get(this.toString());
  }

  /**
   * Computes the hash code for this card.
   *
   * @return Hash code
   */
  @Override public int hashCode()
  {
    // Implementation comes from Josh Bloch's "Effective Java"

    final int prime = 37;
    int result = 17;
    result = prime*result + rank;
    result = prime*result + suit;

    return result;
  }

  /**
   * Tests whether this card is equal to another object.
   *
   * @param thing Object with which this card is being compared
   * @return true if thing is equal to this card, false otherwise
   */
  @Override
  public boolean equals(Object thing)
  {
    boolean same = false;

    if (thing == this) {
      same = true;
    }
    else if (thing != null && thing instanceof Card) {
      final Card card = (Card) thing;
      if (rank == card.rank && suit == card.suit) {
        same = true;
      }
    }

    return same;
  }

  /**
   * Creates a two-character string representation of this card.
   *
   * <p>The first character represents rank, the second represents suit.</p>
   *
   * @return String representation of this card
   */
  @Override
  public String toString()
  {
    return String.format("%c%c", rank, suit);
  }

  /**
   * Compares this card to another, using their natural ordering
   * (by suit, then by rank).
   *
   * @return A negative integer if this card comes before the other, 0 if
   *   they are the same, a positive integer if this card comes after
   */
  @Override
  public int compareTo(Card other)
  {
    int mySuit = SUITS.indexOf(suit);
    int otherSuit = SUITS.indexOf(other.suit);
    int difference = mySuit - otherSuit;

    if (difference == 0) {
      int myRank = RANKS.indexOf(rank);
      int otherRank = RANKS.indexOf(other.rank);
      difference = myRank - otherRank;
    }

    return difference;
  }

  /**
   * Computes the value of this card.
   *
   * <p>Value is based on rank and disregards suit. Aces score 1
   * and picture cards all score 10.</p>
   *
   * @return Card value
   */
  public int value()
  {
    return Math.min(RANKS.indexOf(rank) + 1, 10);
  }

  /*------------------------ Private helper methods ------------------------*/

  private void set(char rank, char suit)
  {
    if (! RANKS.contains(rank)) {
      throw new IllegalArgumentException("invalid rank");
    }

    if (! SUITS.contains(suit)) {
      throw new IllegalArgumentException("invalid suit");
    }

    this.rank = rank;
    this.suit = suit;
  }
}
