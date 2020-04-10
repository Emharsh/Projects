/********************************Harshit Verma**********************************
*******************************COMP2221: Networks*******************************
*********************************Coursework 2**********************************/

/********************************Client.java file******************************/

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

//Create the class for the Client
public class FileClient
{
  //Private static variable that points to the only instance of this class
  private static Socket socket;
  private static String fileName;
  private static BufferedReader stdin;
  private static PrintStream os;

  public static void main(String[] args) throws IOException
  {
    try
    {
      socket = new Socket("localhost", 4444);
      stdin = new BufferedReader(new InputStreamReader(System.in));
    }
    catch (Exception e)
    {
      System.err.println("Cannot connect to the server, try again later.");
      System.exit(1);
    }

    os = new PrintStream(socket.getOutputStream());
    try
    {
      switch (Integer.parseInt(selectAction()))
      {
        case 1:
          os.println("1");
          sendFile();
          break;
        case 2:
          os.println("2");
          System.err.print("Enter file name: ");
          fileName = stdin.readLine();
          os.println(fileName);
          receiveFile(fileName);
          break;
      }
    }
    catch (Exception e)
    {
      System.err.println("not valid input");
    }

    socket.close();
  }

  public static String selectAction() throws IOException
  {
    System.out.println("*****************************************");
    System.out.println("**            Coursework 2             **");
    System.out.println("**           FileClient.java           **");
    System.out.println("*****************************************");

    System.out.println("\n1. View files.");
    System.out.println("2. Recieve file.");
    System.out.println("3. Send file.");
    // System.out.println("3. Recieve file.");
    System.out.print("\nSelect the option: ");

    return stdin.readLine();
  }

  public static void sendFile()
  {
    try
    {
      System.err.print("Enter file name: ");
      fileName = stdin.readLine();
      zip(fileName + ".zip", fileName);
      File myFile = new File("./" + fileName + ".zip");
      byte[] mybytearray = new byte[(int) myFile.length()];
      FileInputStream fis = new FileInputStream(myFile);
      BufferedInputStream bis = new BufferedInputStream(fis);
      //bis.read(mybytearray, 0, mybytearray.length);

      DataInputStream dis = new DataInputStream(bis);
      dis.readFully(mybytearray, 0, mybytearray.length);
      OutputStream os = socket.getOutputStream();

      //Sending file name and file size to the server
      DataOutputStream dos = new DataOutputStream(os);
      dos.writeUTF(myFile.getName());
      dos.writeLong(mybytearray.length);
      dos.write(mybytearray, 0, mybytearray.length);
      dos.flush();
      System.out.println("File "+fileName+" sent to Server.");
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

        //Close the zip entry
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

  /***Extracts a zip file specified by the zipFilePath to a directory specified
  by destDirectory (will be created if does not exists)
  @param zipFilePath
  @param destDirectory
  @throws IOException***/

  public static void unzip(String zipFilePath, String destDirectory) throws IOException
  {
    System.out.println(zipFilePath);
    System.out.println(destDirectory);

    File destDir = new File(destDirectory);
    if (!destDir.exists())
    {
      destDir.mkdir();
    }
    ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath));
    ZipEntry entry = zipIn.getNextEntry();

    // iterates over entries in the zip file
    while (entry != null)
    {
      String filePath = destDirectory + File.separator + entry.getName();
      if (!entry.isDirectory())
      {
        // if the entry is a file, extracts it
        extractFile(zipIn, filePath);
      }
      else
      {
        // if the entry is a directory, make the directory
        File dir = new File(filePath);
        dir.mkdir();
      }
      zipIn.closeEntry();
      entry = zipIn.getNextEntry();
    }
    zipIn.close();
  }

  /***Extracts a zip entry (file entry)
  @param zipIn
  @param filePath
  @throws IOException***/

  private static void extractFile(ZipInputStream zipIn, String filePath) throws IOException
  {
    BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
    byte[] bytesIn = new byte[4096];
    int read = 0;

    while ((read = zipIn.read(bytesIn)) != -1)
    {
      bos.write(bytesIn, 0, read);
    }
    bos.close();
  }

  public static void receiveFile(String fileName)
  {
    try
    {
      int bytesRead;
      InputStream input = socket.getInputStream();

      DataInputStream clientData = new DataInputStream(input);

      fileName = clientData.readUTF();
      OutputStream output = new FileOutputStream((fileName));
      long size = clientData.readLong();
      byte[] buffer = new byte[1024];

      while (size > 0 && (bytesRead = clientData.read(buffer, 0, (int) Math.min(buffer.length, size))) != -1)
      {
        output.write(buffer, 0, bytesRead);
        size -= bytesRead;
      }

      output.close();
      input.close();
      // unzip(fileName,fileName);
      System.out.println("File "+fileName+" received from Server.");
    }
    catch (IOException ex)
    {
      Logger.getLogger(ConnectionWithClient.class.getName()).log(Level.SEVERE, null, ex);
    }
  }
}

/******************************************************************************/
