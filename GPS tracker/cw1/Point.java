/**********************************************************
 ***************Object Oriented Programming****************
 *********************Coursework_1*************************
 **********************Point.java**************************
 *********************Harshit Verma************************
 *********************ID: 200978548************************
 **********************************************************/

 //cw1 package
package cw1;
//Import the pacakages
//Scanner is in the java.util pacakage
import static java.lang.Math.*;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.Scanner;

//Create a class 'Point'
public class Point
{
  // Constants useful for bounds checking
  private static final double MIN_LONGITUDE = -180.0;
  private static final double MAX_LONGITUDE = 180.0;
  private static final double MIN_LATITUDE = -90.0;
  private static final double MAX_LATITUDE = 90.0;
  private static final double MEAN_EARTH_RADIUS = 6.371009e+6;

  // Fields of a point
  private double longitude;   // in degrees, West is negative
  private double latitude;    // in degrees
  private double elevation;   // above sea level, in metres

  //A constructor that accepts values for longitude and latitude
  public Point(double newLongitude, double newLatitude)
  {
    longitude = newLongitude;
    latitude = newLatitude;
    elevation = 0.0;
  }

  //A constructor that accepts values for longitude, latitude and elevation
  public Point(double newLongitude, double newLatitude, double newElevation)
  {
    longitude = newLongitude;
    latitude = newLatitude;
    elevation = newElevation;
  }

  //create toString method
  public String toString()
  {
    //Return the String
    return "(" + "Longitude: " + longitude + ", " + "Latitude: "  + latitude + ", " + "Elevation: "  + elevation+")";
  }

  /**
   * @return Longitude of this point, in degrees
   */
  public double getLongitude()
  {
    return longitude;
  }

  /**
   * @return Latitude of this point, in degrees
   */
  public double getLatitude()
  {
    return latitude;
  }

  /**
   * @return Elevation of this point above sea level, in metres
   */
  public double getElevation()
  {
    return elevation;
  }

  /**
   * Computes the great-circle distance or orthodromic distance between
   * two points on a spherical surface, using Vincenty's formula.
   *
   * @param p First point
   * @param q Second point
   * @return Distance between the points, in metres
   */
  public static double greatCircleDistance(Point p, Point q)
  {
    double phi1 = toRadians(p.getLatitude());
    double phi2 = toRadians(q.getLatitude());

    double lambda1 = toRadians(p.getLongitude());
    double lambda2 = toRadians(q.getLongitude());
    double delta = abs(lambda1 - lambda2);

    double firstTerm = cos(phi2)*sin(delta);
    double secondTerm = cos(phi1)*sin(phi2) - sin(phi1)*cos(phi2)*cos(delta);
    double top = sqrt(firstTerm*firstTerm + secondTerm*secondTerm);

    double bottom = sin(phi1)*sin(phi2) + cos(phi1)*cos(phi2)*cos(delta);

    return MEAN_EARTH_RADIUS * atan2(top, bottom);
  }
}

//****************************************************************************//
//                                                                            //
//                              COMPLETED                                     //
//                                                                            //
//****************************************************************************//
