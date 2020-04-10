//cw1 package
package cw2;
//Import all packages
import javafx.animation.*;
import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.util.Duration;


/**
 * Simple JavaFX program to animate a playing card.
 *
 * <p>Provided for use in COMP1721 Coursework 2.</p>
 *
 * @author Nick Efford
 */
public class Animate extends Application
{
  @Override
  public void start(Stage primaryStage)
  {
    // Create a group of objects and a scene to display the group

    Group root = new Group();
    Scene scene = new Scene(root, 640, 400, Color.DARKGREEN);

    // Add an ImageView to the group, representing a card

    Card card = new Card("JC");
    root.getChildren().add(new ImageView(card.getImage()));

    // Configure some geometric transformations

    TranslateTransition translate = new TranslateTransition(Duration.millis(1500));
    translate.setToX(560);
    translate.setToY(300);

    RotateTransition rotate = new RotateTransition(Duration.millis(1500));
    rotate.setToAngle(180);

    // Apply the transitions in parallel, in both directions, forever

    ParallelTransition transition = new ParallelTransition(root, translate, rotate);
    transition.setCycleCount(Timeline.INDEFINITE);
    transition.setAutoReverse(true);
    transition.play();

    // Stage the scene and make everything visible

    primaryStage.setTitle("Card Animation Demo");
    primaryStage.setScene(scene);
    primaryStage.show();
  }

  public static void main(String[] args)
  {
    launch(args);
  }
}
