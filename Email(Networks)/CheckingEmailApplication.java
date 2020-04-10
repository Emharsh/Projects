// Import libraries
import java.util.Properties;
import java.io.Console;
import java.util.Scanner;
// Import java files from the JavaxMail API
import javax.mail.*;
import javax.mail.internet.*;

//Create a class to check the e-mails
public class CheckingEmailApplication
{
  private String host;
  private String storeType;
  private String username;
  private String password;

  //Create default contructor for checking emails
  CheckingEmailApplication( String host, String storeType, String username, String password )
  {
    this.host = host;
    this.storeType = storeType;
    this.username = username;
    this.password = password;
  }
    //Public class for the CheckingEmailApplication file
  //check emails
  public void check()
  {
    try
    {
      //create properties field
      Properties properties = new Properties();

      properties.put("mail.pop3.host", host);
      properties.put("mail.pop3.port", "587");
      properties.put("mail.pop3.starttls.enable", "true");

      //Create authentication, and get session
      Session emailSession = Session.getInstance(properties,
          new javax.mail.Authenticator()
          {
            protected PasswordAuthentication getPasswordAuthentication()
            {
              return new PasswordAuthentication(username, password);
            }
          });
      //POP3s, a standard protocol for receiving e-maiL
      //create the POP3 store object
      //connect with the pop server
      Store store = emailSession.getStore("pop3s");

      store.connect(host, username, password);

      //Create the object for the folder
      //open it
      Folder emailFolder = store.getFolder("INBOX");
      emailFolder.open(Folder.READ_ONLY);

      //Give the number of emails to check
      //int numberOfEmails = 12;
      Scanner scanner = new Scanner(System.in);
      //int numberOfEmails = 12 ;
      System.out.format("Number of emails to check: ");
      int numberOfEmails = scanner.nextInt();
      // retrieve the messages from the folder in an array and print it
      Message[] messages = emailFolder.getMessages();
      // System.out.println("numberOfEmails---" + numberOfEmails);

      //'for loop' to go through number of emails
      for (int i = 0, n = numberOfEmails; i < n; i++)
      {
         Message message = messages[i];
         System.out.println("---------------------------------");
         System.out.println("Email Number " + (i + 1));
         System.out.println("Subject: " + message.getSubject());
         System.out.println("From: " + message.getFrom()[0]);
        //  System.out.println("Text: " + message.getContent().toString());
      }

      //close the store and folder objects
      emailFolder.close(false);
      store.close();

    }
    //catch all the exceptions
    catch (NoSuchProviderException e)
    {
      e.printStackTrace();
    }
    catch (MessagingException e)
    {
      e.printStackTrace();
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
  }
}
