/**********************************************************
 ***************Object Oriented Programming****************
 *********************Coursework_1*************************
 ***********************Test.java**************************
 *********************Harshit Verma************************
 *********************ID: 200978548************************
 **********************************************************/

//cw1 package
package cw1;
//Import the packages
//Scanner is in the java.util pacakage
import static java.lang.Math.*;
import java.io.*;
import java.util.ArrayList;
import java.io.IOException;
import java.io.File;
import java.util.NoSuchElementException;
import java.util.Scanner;
import java.io.FileWriter;
import java.io.Writer;
import java.io.FileNotFoundException;

//Create class 'Test'
public class Test
{
	//Main method
	public static void main(String[] args) throws FileNotFoundException, IOException
	{

		/***************************************************************************
		*******************************Basic Solution*******************************
		***************************************************************************/

		/* Object creation */
		//Create five Point objects
		Point point_1 = new Point(-119.417932, 36.778261);  //Create a point_1
		Point point_2 = new Point(80.946166, 26.846694 );		//Create a point_2
		Point point_3 = new Point(-115.13983, 36.169941);		//Create a point_3
		Point point_4 = new Point(-74.005941,40.712784);		//Create a point_4
		Point point_5 = new Point(77.209021, 28.613939);		//Create a point_5
		Point target1 = new Point(28.978359, 41.008238);		//Create a target1

		//Create Track objects for Basic solutions and add the points to it
		Track basicTrack = new Track();

		/*Adding point to basicTrack*/
		basicTrack.add(point_1);   //add point_1 to basicTrack
		basicTrack.add(point_2);	 //add point_2 to basicTrack
		basicTrack.add(point_3);   //add point_3 to basicTrack
		basicTrack.add(point_4);   //add point_4 to basicTrack
		basicTrack.add(point_5);   //add point_5 to basicTrack


		/*      Print commands       */
		System.out.println("--------------------------------------Basic Solution----------------------------------------------");
		System.out.println(basicTrack.size() + " points in track \n");          //Print the size of the file i.e total number of points.
		System.out.println("Total Distance: " + basicTrack.totalDistance()/1000 + " kilometers" + " or " + basicTrack.totalDistance() + " meters" + "\n"); //Print the total distance in km
		System.out.println("Lowest Points: " + basicTrack.lowestPoint() + "\n");    //Print the lowest point
		System.out.println("Highest Points: " + basicTrack.highestPoint() + "\n");	//Print the highest point
		System.out.println("Nearest Points:" + basicTrack.nearestPointTo(target1)); //Print the nearest point
		System.out.println("-------------------------------------------------------------------------------------------------- \n \n");


		/***************************************************************************
		**********************Intermediate & Advanced Solution**********************
		****************************************************************************/


		//create a new point 'target'
		Point target = new Point(-1.5492, 53.7002);
		//Create Track objects for Basic solutions and add the points to it
		Track intermediateTrack = new Track();
		//read the file and add to track_1
		intermediateTrack.read("walk.txt");
		//write the file in gpx version
		intermediateTrack.write("walk.gpx");
		//write the file in kml version
		intermediateTrack.write("walk.kml");

		/*      Print commands       */
		System.out.println("-------------------------------Intermediate & Advanced Solution------------------------------------");
		System.out.println(intermediateTrack.size() + " points in track \n");          //Print the size of the file i.e total number of points.
	 	System.out.println("Total Distance: " + intermediateTrack.totalDistance()/1000 + " kilometers" + " or " + intermediateTrack.totalDistance() + " meters" + "\n"); //Print the total distance in km
		System.out.println("Lowest Points: " + intermediateTrack.lowestPoint() + "\n");    //Print the lowest point
		System.out.println("Highest Points: " + intermediateTrack.highestPoint() + "\n");	//Print the highest point
		System.out.println("Nearest Points:" + intermediateTrack.nearestPointTo(target) + "\n"); //Print the nearest point
		System.out.println("---------------------------------------------------------------------------------------------------");

	}
}

//****************************************************************************//
//                                                                            //
//                              COMPLETED                                     //
//                                                                            //
//****************************************************************************//
