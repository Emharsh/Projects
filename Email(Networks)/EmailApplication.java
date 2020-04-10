/*********************Harshit Verma**********************/
/***********************Main File************************/
/********************EmailApplication********************/

//Import all the libraries
import java.util.Properties;
import java.io.Console;
import java.util.Scanner;
// Import java files from the JavaxMail API
import javax.mail.*;
import javax.mail.internet.*;

//Main public class, it will execute the CheckingEmailApplication and
// SendEmailApplication files
public class EmailApplication
{
  public static void main(String[] args)
  {
    // Collect the users information
    Console console = System.console();
    //Declare the variable
    String host;

    System.out.println("\tLogin\n_______________________");
    String username = console.readLine("%s: ", "\nUsername");
    char[] password = console.readPassword("%s: ", "Password");

    //While loop; to provide the options to choose which file user want to run.
    while(true)
    {
      // use this information to decide which application to call
      Scanner input = new Scanner(System.in);
      System.out.println("Email options\nCheck e-mail:\t[0]\nSend e-mail:\t[1]\nSelect the choice");
      int option = input.nextInt();
      // 'if statement' to choose CheckingEmailApplication file
      if(option == 0)
      {
        host = "pop.gmail.com";
        String storeType = "pop3";

        CheckingEmailApplication inbox = new CheckingEmailApplication(host, storeType, username, new String(password));
        inbox.check();
        break;
      }
      // 'elseif statement' to choose SendEmailApplication file
      else if(option == 1)
      {
        //host = "smtp.gmail.com";
        String recipient_email = console.readLine("%s: ", "\nRecipient's Email");
        String subject = console.readLine("%s : ", "\nSubject");
        String text = console.readLine("%s : ", "text");

        SendEmailApplication send = new SendEmailApplication( recipient_email, username, password, subject, text);
        send.run();
        break;
      }
      // 'else' if user enter wrong option
      else if(option != 0 || option != 1)
      {
        System.out.println("Wrong choice re-enter");
      }
    }
  }
}
