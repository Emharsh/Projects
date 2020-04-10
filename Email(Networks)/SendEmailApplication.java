//Import libraries
import java.util.Properties;
import java.io.Console;

//Import java files from the JavaxMail API
import javax.mail.*;
import javax.mail.internet.*;

//Public class for the sendemail
public class SendEmailApplication
{
  //Declare all the variables
  private String recipient_email;
  private String username;
  private char[] password;
  private String subject;
  private String text;

  //default constructor for the SendEmailApplication
  SendEmailApplication(String reciever, String user, char[] password, String subject, String text)
  {
    this.recipient_email = reciever;
    this.username = user;
    this.password = password;
    this.subject = subject;
    this.text = text;
  }

  //Public class for the SendEmailApplication file
  //Send Emails
  public void run()
  {
    final String host = "smtp.gmail.com";
    // Sending email using 'smtp.gmail.com' host
    Properties props = new Properties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.host", host);
    props.put("mail.smtp.port", "587");

    // Get the Session object.
    //To interact with the host
    Session session = Session.getInstance(props,new javax.mail.Authenticator()
    {
      protected PasswordAuthentication getPasswordAuthentication()
      {
        return new PasswordAuthentication(username, new String(password));
      }
    });

    try
    {
      // Create a default MimeMessage object.
      Message message = new MimeMessage(session);
      // Set From: header field of the header.
      message.setFrom(new InternetAddress(username));
      // Set To: header field of the header.
      message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(recipient_email));
      // Set Subject: header field
      message.setSubject(subject);
      // Now set the actual message
      message.setText(text);
      // Send message
      Transport.send(message);
      System.out.println("Message sent successfully.");
    }

    //catch all the exceptions
    catch (MessagingException e)
    {
      throw new RuntimeException(e);
    }
  }
}
