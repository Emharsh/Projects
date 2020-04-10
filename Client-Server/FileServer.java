/********************************Harshit Verma**********************************
*******************************COMP2221: Networks*******************************
*********************************Coursework 2**********************************/

/********************************Server.java file******************************/

//Import all the libraries
import java.io.*;
import java.net.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

//Create class for the server
public class FileServer
{

  //Private static variable that points to the only instance of this class
  private static ServerSocket serverSocket;
  private static Socket clientSocket = null;

  public static void main(String[] args) throws IOException
  {
    try
    {
      serverSocket = new ServerSocket(4444);
      System.out.println("**************Server started*************\n");
      System.out.println("*****************************************");
      System.out.println("**            Coursework 2             **");
      System.out.println("**           FileServer.java           **");
      System.out.println("*****************************************");
    }
    catch (Exception e)
    {
      System.err.println("Port already in use.");
      System.exit(1);
    }

    while (true)
    {
      try
      {
        clientSocket = serverSocket.accept();
        System.out.println("Accepted connection : " + clientSocket);

        Thread t = new Thread(new ConnectionWithClient(clientSocket));
        t.start();

      }
      catch (Exception e)
      {
        System.err.println("Error in connection attempt.");
      }
    }
  }
}

/******************************************************************************/
