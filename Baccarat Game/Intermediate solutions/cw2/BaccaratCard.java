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


/*In a file called BaccaratCard.java, create a public class called BaccaratCard,
inheriting from Card.Give this class the two constructors.
These should simply delegate to the corresponding superclass constructors*/
public class BaccaratCard  extends Card
{
  //Create a constructor and it will simply delegate to the corresponding superclass constructors
  BaccaratCard(char rank, char suit )
  {
    super(rank, suit);
  }

  //Create a constructor and it will simply delegate to the corresponding superclass constructors
  BaccaratCard(String code)
  {
    super(code);
  }
  /*override the default version of the toString method with a new version that returns a string
  containing two-character representations of each card.*/
  @Override public int value()
  {
    //calling the method defined in the super class and return it.
    return super.value() %10;
  }
}

/*******************************BaccaratCard.java******************************/
