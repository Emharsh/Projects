/********************************Harshit Verma**********************************
*******************************COMP2221: Networks*******************************
*********************************Coursework 2**********************************/

/***************************ClientConnection.java file*************************/

//Import all the libraries
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.Scanner;
import java.io.*;
import java.net.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.util.zip.ZipInputStream;

//Create the class for the Client connection which implements Runnable class/interface
public class ConnectionWithClient implements Runnable
{
  private static String fileName;
  private Socket clientSocket;
  private BufferedReader input = null;

  public ConnectionWithClient(Socket client)
  {
    this.clientSocket = client;
  }

  @Override
  public void run()
  {
    try
    {
      input = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
      String clientSelection;

      //Using while loop to give user to select the option(Client)
      while ((clientSelection = input.readLine()) != null)
      {
        //Switch method to do selection for client
        switch (clientSelection)
        {
          case "1":
            receiveFile();
            break;
          case "2":
            String outGoingFileName;

            while ((outGoingFileName = input.readLine()) != null)
            {
              sendFile(outGoingFileName);
            }
            break;
          default:
            System.out.println("Incorrect command received.");
            break;
          }
          //Close the InputStream
          input.close();
          break;
      }
    }
    catch (IOException ex)
    {
      Logger.getLogger(ConnectionWithClient.class.getName()).log(Level.SEVERE, null, ex);
    }
  }


  //Create the public class for the file to receive
  public void receiveFile()
  {
    try
    {
      //Declare the variable
      int bytesRead;

      DataInputStream clientData = new DataInputStream(clientSocket.getInputStream());

      String fileName = clientData.readUTF();
      OutputStream output = new FileOutputStream(("received_from_client_" + fileName));
      long size = clientData.readLong();
      byte[] buffer = new byte[1024];

      while (size > 0 && (bytesRead = clientData.read(buffer, 0, (int) Math.min(buffer.length, size))) != -1)
      {
        output.write(buffer, 0, bytesRead);
        size -= bytesRead;
      }

      //Close the OutputStream
      output.close();
      //Close the DataInputStream 'clientData'
      clientData.close();

      System.out.println("File "+fileName+" received from client.");
    }

    catch (IOException ex)
    {
      System.err.println("Client error. Connection closed.");
    }
  }

  //Create the class for Sending file from Client
  public void sendFile(String fileName)
  {
    try
    {
      //handle file read
      zip(fileName + ".zip", fileName);
      File myFile = new File("./" + fileName + ".zip");
      byte[] mybytearray = new byte[(int) myFile.length()];

      FileInputStream fis = new FileInputStream(myFile);
      BufferedInputStream bis = new BufferedInputStream(fis);
      //bis.read(mybytearray, 0, mybytearray.length);

      DataInputStream dis = new DataInputStream(bis);
      dis.readFully(mybytearray, 0, mybytearray.length);

      //handle file send over socket
      OutputStream os = clientSocket.getOutputStream();

      //Sending file name and file size to the server
      DataOutputStream dos = new DataOutputStream(os);
      dos.writeUTF(myFile.getName());
      dos.writeLong(mybytearray.length);
      dos.write(mybytearray, 0, mybytearray.length);
      dos.flush();
      System.out.println("File "+fileName+" sent to client.");
    }
    catch (Exception e)
    {
      System.err.println("File does not exist!");
    }
  }

  public static void zip(String zipFile, String scrDir)
  {
    try
    {
      // create byte buffer
      byte[] buffer = new byte[1024];

      FileOutputStream fos = new FileOutputStream(zipFile);

      ZipOutputStream zos = new ZipOutputStream(fos);

      File dir = new File(scrDir);

      File[] files = dir.listFiles();

      for (int i = 0; i < files.length; i++)
      {
        System.out.println("Adding file: " + files[i].getName());

        FileInputStream fis = new FileInputStream(files[i]);

        // begin writing a new ZIP entry, positions the stream to the start of the entry data
        zos.putNextEntry(new ZipEntry(files[i].getName()));

        int length;

        while ((length = fis.read(buffer)) > 0)
        {
          zos.write(buffer, 0, length);
        }

        zos.closeEntry();

        // close the InputStream
        fis.close();
      }

      // close the ZipOutputStream
      zos.close();

    }
    catch (IOException ioe)
    {
      System.out.println("Error creating zip file" + ioe);
    }
  }
}

/******************************************************************************/
