/**********************************************************
 ***************Object Oriented Programming****************
 *********************Coursework_1*************************
 **********************TRack.java**************************
 *********************Harshit Verma************************
 *********************ID: 200978548************************
 **********************************************************/

//cw1 package
package cw1;
//Import the packages
//Scanner is in the java.util pacakage
import static java.lang.Math.*;
import java.util.ArrayList;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.File;
import java.util.NoSuchElementException;
import java.util.Scanner;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.Writer;

/*******************************************************************************
*********************************Basic Solution*********************************
********************************************************************************/

//Create a class 'Track'
public class Track
{
	//Create empty ArrayList and named as trackList
	private ArrayList<Point> trackList;

	//A default constructor that creates a track containing no points
	Track()
	{
		//trackList without no points
		trackList = new ArrayList<Point>();
	}

	//Use add() method to add points to the end of the track
	public void add(Point item)
	{
		//add  the point to trackList
		trackList.add(item);
	}

	//A method called size that returns the number of points currently stored in the trackList
	public int size()
	{
		//return number of points in trackList
		return trackList.size();
	}

  /*A method called totalDistance that returns the total distance travelled in metres when
	moving from point to point along the entire length of the track*/
	public double totalDistance() throws IOException
	{
		//Initialise distance to double
		double distance = 0.0;

		//opne 'for' loop to go to evry point in the trackList
		for (int i=0; i < (trackList.size()- 1); ++i)
		{
			distance += Point.greatCircleDistance(trackList.get(i), trackList.get(i+1));
		}
		//return the distance
		return distance;
	}

	/*****************************************************************************
	******************************Intermediate Solution***************************
	******************************************************************************/

 	/*A method called read that reads point details from a file with the given name, specified as a
  String parameter, and adds these points to the track*/
	public void read(String infile) throws FileNotFoundException
	{
		//Initialise latitude, longitude and elevation
		double elevation = 0;
		double longitude = 0;
		double latitude = 0;

		//Scan the file
		Scanner input =  new Scanner(new File(infile));
		System.out.println("Reading " + infile + " file for the Intermediate and Advanced Solution");

		//while loop
		/* 'hasNextDouble()' method returns true if the next token in this scanner's
		input can be interpreted as a double value using the nextDouble() method. */
		while (input.hasNextDouble())
		{
			// check if the scanner's next token is a double
		  longitude = input.nextDouble();
			latitude = input.nextDouble();
			elevation = input.nextDouble();
			//String line = input.nextLine();
			//Create a point
			Point item = new Point(longitude, latitude, elevation);
			//Add the point
			add(item);
		}
		//Close
		input.close();
	}

	//Create a constructor that simply calls read
	Track (String newRead)throws FileNotFoundException
	{
		this.read(newRead);
	}

	/*Methods called lowestPoint that return the Point objects having the lowest
	and highest elevations, respectively*/
	public Point lowestPoint() throws FileNotFoundException
	{
		 double elevationLow = 9999;
		 double longitudeLow = 0;
		 double latitudeLow = 0;

		//'for' loop
		for (Point p: trackList)
		{
			//Use if statement to get the lowest elevation
			if(p.getElevation() < elevationLow)
			{
				elevationLow = p.getElevation();
			}
		}
		//'for' loop
		for (Point p: trackList)
		{
			//using if statement to get the lowest longitude and latitude
			if(p.getElevation() == elevationLow)
			{
				longitudeLow = p.getLongitude();
				latitudeLow = p.getLatitude();
			}
		}
		//Create the point
		Point lowPoints = new Point(longitudeLow, latitudeLow, elevationLow );
		//Return the point
		return lowPoints;
	}

	/*Methods called highestPoint that return the Point objects having the lowest
	and highest elevations, respectively*/
	public Point highestPoint() throws FileNotFoundException, IOException
	{
		//Initialise
		double elevationHigh = 0;
		double longitudeHigh = 0;
		double latitudeHigh = 0;

		//'for' loop
		for (Point p: trackList)
		{
			//using if statement to get the highest elevation
			if(p.getElevation() > elevationHigh)
			{
				elevationHigh = p.getElevation();
			}
		}
		//'for' loop
		for (Point p: trackList)
		{
			//Using if statement to get highest longitude and elevation
			if(p.getElevation() == elevationHigh)
			{
				//Get the values
				longitudeHigh = p.getLongitude();
				latitudeHigh = p.getLatitude();
			}
		}
		//create new Points
		Point highPoints = new Point(longitudeHigh, latitudeHigh, elevationHigh );
		//Retrun the highPoints
		return highPoints;
	}

	/*****************************************************************************
	*******************************Advanced Solution******************************
	******************************************************************************/

	/*A method nearestPointTo that finds and returns the point in the Track that
	is nearest to the given point (where ‘nearest’ means ‘smallest great-circle
	distance between’).*/
	public Point nearestPointTo(Point target)
	{
		//Initialise the variables
		double minDistance = 0;
		double nLongitude = 0;
		double nLatitude = 0;
		//double distance = 0;

		//create the point
		Point nearestTo = new Point(nLongitude, nLatitude);
		//'for' loop
		for (Point p: trackList)
		{
			double distance = Point.greatCircleDistance(target, p);
			//Using if statement to get the nearest point
			if(distance >= minDistance)
			{
				//assiging to distance to minDistance
				distance = minDistance;
				nearestTo = p;
			}
		}
		//return the nearest point
		return nearestTo;
	}

	/*A method called write that writes out details of the track to a file in
	either GPX or KML format (see below), with the filename specified via a
	String parameter*/

	/*Creating both gpx and kml*/

	public void write(String infile) throws FileNotFoundException, IOException
	{
	  //Create a file
		FileWriter fileWriter = new FileWriter(infile);
		/*BufferedWriter writes text to a character-output stream, buffering characters
		so as to provide for the efficient writing of single characters, arrays,
		and strings*/
		Writer output = new BufferedWriter(fileWriter);

		//Initialise the variables
		double longitude = 0;
		double latitude = 0;
		double elevation = 0;

		//File length
		int fileLength = infile.length();

		//File type i.e kml
		String fileType = "kml";

		//using if statement to compare
		if (infile.charAt(fileLength - 3) == fileType.charAt(0))
		{
			//Using print command to print the infile, filelength and filetype
			/*** only checking ***/
			//System.out.println("Infile: " + infile + ", " + "FileLength: " + (fileLength-3) + ", " + "FileType: " + fileType);

			//Path for the kml version
			output.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
			output.write("<kml xmlns='http://earth.google.com/kml/2.0'> \n");
			output.write("<Document> \n");
			output.write("<Placemark> \n");
			output.write("<LineString> \n");
			output.write("<coordinates> \n");

			//Initialise i to int
			int i = 0;
			//'for' loop to get values from trackList
			for (Point p : trackList)
			{
				//getting the latitude and longitude from the trackList
				longitude = p.getLongitude();
				latitude = p.getLatitude();
				elevation = p.getElevation();
				//Using if statement to walk through every points.
				if(i == 0)
				{
					//write out the longitude, latitude and elevation in  file i.e kml file
					output.write(longitude + "," + latitude + "," + elevation + "\n");
					//increment
					i++;
				}
				//else statement
				else
				{
					//write out the longitude, latitude and elevation in  file i.e kml file
					output.write("					"+ longitude + "," + latitude + "," + elevation + "\n" );
				}
			}
			output.write("</coordinates> \n");
			output.write("<altitudeMode>absolute</altitudeMode> \n");
			output.write("</LineString> \n");
			output.write("<Style> \n");
			output.write("<LineStyle> \n");
			output.write("<color>#ff0000ff</color> \n");
			output.write("<width>5</width> \n");
			output.write("</LineStyle> \n");
			output.write("</Style> \n");
			output.write("</Placemark> \n");
			output.write("</Document> \n");
			output.write("</kml> \n");
		}

		//File type i.e gpx
		String fileType2 = "gpx";
		//using if statement
		//charAt method returns the character located at the String's specified index.
		if (infile.charAt(fileLength - 3) == fileType2.charAt(0))
		{
			//Using print command to print the infile, filelength and filetype
			/*** only checking ***/
			//System.out.println("Infile: " + infile + ", " + "FileLength: " + (fileLength-3) + ", " + "FileType: " + fileType2);

			//Path for the gpx version
			output.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n");
			output.write("<gpx>\n");

			output.write("	<trk>\n");
			output.write("		<name>gps.gpx</name>\n");
			output.write("		<trkseg>\n");

		  //'for' loop to get values from trackList
			for (Point p : trackList)
			{
				//getting the latitude and longitude from the trackList
				longitude = p.getLongitude();
				latitude = p.getLatitude();
				//elevation = p.getElevation();

				//write the latitude and longitude in gpx version file
				output.write("			<trkpt lat=" + "\"" + latitude + "\" lon=\"" + longitude + "\">\n"  + "			</trkpt>\n");

			}
      output.write("		</trkseg>\n");
      output.write("	</trk>\n");
      output.write("</gpx>\n");
			//gpx path completed
		}
		//close the file
		output.close();
		System.out.println("Writing in the " + infile);
	}
}
// close the method

//****************************************************************************//
//                                                                            //
//                              COMPLETED                                     //
//                                                                            //
//****************************************************************************//
