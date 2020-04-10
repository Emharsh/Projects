/********************************Harshit Verma**********************************
*******************************COMP2221: Networks*******************************
*********************************Coursework 2**********************************/

/***************************ClientConnection.java file*************************/

//IMport all libraries
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
  private Socket clientSocket;
  private BufferedReader in = null;

  public ConnectionWithClient(Socket client)
  {
    this.clientSocket = client;
  }

  @Override
  public void run()
  {
    try
    {
      in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
      String clientSelection;
      while ((clientSelection = in.readLine()) != null)
      {
        switch (clientSelection)
        {
          case "1":
            receiveFile();
            break;
          case "2":
            String outGoingFileName = in.readLine();
            sendFile(outGoingFileName);
            break;
          default:
            System.out.println("Incorrect command received.");
            break;
        }

        in.close();
        break;
      }

    }
    catch (IOException ex)
    {
      Logger.getLogger(ConnectionWithClient.class.getName()).log(Level.SEVERE, null, ex);
    }
    // log = new BufferedWriter(new FileWriter("./log.txt",true));
    // log.write(formatDateTime + sockets.toString()+"\n");
    // log.flush()
  }

  public void receiveFile()
  {
    try
    {
      int bytesRead;
      DataInputStream clientData = new DataInputStream(clientSocket.getInputStream());

      String fileName = clientData.readUTF();
      OutputStream output = new FileOutputStream((fileName));
      long size = clientData.readLong();
      byte[] buffer = new byte[1024];

      while (size > 0 && (bytesRead = clientData.read(buffer, 0, (int) Math.min(buffer.length, size))) != -1)
      {
        output.write(buffer, 0, bytesRead);
        size -= bytesRead;
      }
      output.close();
      clientData.close();
      // unzip("./" + fileName + ".zip", ".");

      System.out.println("File "+fileName+" received from client.");
    }
    catch (IOException ex)
    {
      System.err.println("Client error. Connection closed.");
    }
  }

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

        // begin writing a new ZIP entry, positions the stream to the start of the entry data
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

  // public void accessFolder()
  // {
  //   for(int j = 0;j < files.length;j++)
  //   {
  //     if(files[j].isDirectory())
  //     {
  //       output.println(files[j]);
  //     }
  //   }
  // }
  // //this allow ther server to access to the given folder and display the files within it
  // public void viewFile(int num)
  // {
  //   File newPath = new File ("../folders/" + files[num-1]);
  //   String[] newFiles = newPath.list();
  //   int newI = newFiles.length;
  //   output.println(newI);
  //   for(int newJ = 0;newJ < newI;newJ++)
  //   {
  //     output.println(newFiles[newJ]);
  //   }
  // }
}

/******************************************************************************/
