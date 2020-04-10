/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.3.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QScrollArea>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QGridLayout *gridLayout;
    QScrollArea *scrollArea;
    QWidget *scrollAreaWidgetContents;
    QLabel *TopLandingSection;
    QLabel *UniversityLogo;
    QLabel *LeedsForLife_NavBar;
    QLabel *LeedsForLife_NavBar_2;
    QLabel *Opportunities_NavBar;
    QLabel *Broadening_NavBar;
    QLabel *Foundation_NavBar;
    QLabel *CaseStudies_NavBar;
    QLabel *LogIn_NavBar;
    QTextEdit *HeadingTopSection;
    QLabel *AboutBroadening;
    QTextEdit *HeadingSection2;
    QTextEdit *InfoAboutBroadening;
    QLabel *label;
    QLabel *DiscveryModules;
    QTextEdit *HeadingSection2_2;
    QTextEdit *InfoDiscoveryModules;
    QTextEdit *SubHeadingForModules;
    QLabel *PowerAndConflict;
    QLabel *Media;
    QLabel *Ethics;
    QLabel *Science;
    QLabel *Technology;
    QTextEdit *TextPower;
    QTextEdit *TextMedia;
    QTextEdit *TextEthics;
    QTextEdit *TextScience;
    QTextEdit *TextScience_2;
    QLabel *PowerAndConflict_2;
    QLabel *PowerAndConflict_3;
    QLabel *PowerAndConflict_4;
    QLabel *PowerAndConflict_5;
    QLabel *PowerAndConflict_6;
    QTextEdit *TextPower_2;
    QTextEdit *TextPower_3;
    QTextEdit *TextPower_4;
    QTextEdit *TextPower_5;
    QTextEdit *TextPower_6;
    QLineEdit *SearchBox;
    QPushButton *pushButton;
    QLabel *RSSandContactSection;
    QLabel *linkedinFeed;
    QLabel *fbFeed;
    QLabel *twitterFeed;
    QLabel *googleFeed;
    QTextEdit *textEdit;
    QLabel *label_2;
    QPushButton *SearchButtonForTheme1;
    QPushButton *SearchButtonForTheme2;
    QPushButton *SearchButtonForTheme3;
    QPushButton *SearchButtonForTheme4;
    QPushButton *SearchButtonForTheme5;
    QPushButton *SearchButtonForTheme10;
    QPushButton *SearchButtonForTheme9;
    QPushButton *SearchButtonForTheme8;
    QPushButton *SearchButtonForTheme7;
    QPushButton *SearchButtonForTheme6;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(1061, 2229);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        gridLayout = new QGridLayout(centralWidget);
        gridLayout->setSpacing(6);
        gridLayout->setContentsMargins(11, 11, 11, 11);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        scrollArea = new QScrollArea(centralWidget);
        scrollArea->setObjectName(QStringLiteral("scrollArea"));
        scrollArea->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOn);
        scrollArea->setWidgetResizable(false);
        scrollAreaWidgetContents = new QWidget();
        scrollAreaWidgetContents->setObjectName(QStringLiteral("scrollAreaWidgetContents"));
        scrollAreaWidgetContents->setGeometry(QRect(0, 0, 1027, 2209));
        TopLandingSection = new QLabel(scrollAreaWidgetContents);
        TopLandingSection->setObjectName(QStringLiteral("TopLandingSection"));
        TopLandingSection->setGeometry(QRect(0, 0, 1021, 391));
        QFont font;
        font.setFamily(QStringLiteral("Liberation Sans"));
        font.setPointSize(16);
        font.setBold(false);
        font.setItalic(false);
        font.setWeight(9);
        TopLandingSection->setFont(font);
        TopLandingSection->setStyleSheet(QLatin1String("background-color: rgb(54, 59, 72);\n"
"font: 75 16pt \"Liberation Sans\";\n"
"color: rgb(255, 255, 255);\n"
"\n"
""));
        TopLandingSection->setFrameShape(QFrame::Box);
        TopLandingSection->setFrameShadow(QFrame::Raised);
        TopLandingSection->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/TopLandingImage.png")));
        TopLandingSection->setScaledContents(false);
        TopLandingSection->setAlignment(Qt::AlignBottom|Qt::AlignHCenter);
        TopLandingSection->setWordWrap(false);
        TopLandingSection->setMargin(16);
        TopLandingSection->setTextInteractionFlags(Qt::NoTextInteraction);
        UniversityLogo = new QLabel(scrollAreaWidgetContents);
        UniversityLogo->setObjectName(QStringLiteral("UniversityLogo"));
        UniversityLogo->setGeometry(QRect(10, 10, 161, 41));
        UniversityLogo->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot186.png")));
        UniversityLogo->setOpenExternalLinks(true);
        UniversityLogo->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        LeedsForLife_NavBar = new QLabel(scrollAreaWidgetContents);
        LeedsForLife_NavBar->setObjectName(QStringLiteral("LeedsForLife_NavBar"));
        LeedsForLife_NavBar->setGeometry(QRect(0, 60, 101, 41));
        LeedsForLife_NavBar->setLayoutDirection(Qt::LeftToRight);
        LeedsForLife_NavBar->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        LeedsForLife_NavBar->setTextFormat(Qt::RichText);
        LeedsForLife_NavBar->setWordWrap(false);
        LeedsForLife_NavBar->setMargin(3);
        LeedsForLife_NavBar->setIndent(3);
        LeedsForLife_NavBar->setOpenExternalLinks(true);
        LeedsForLife_NavBar->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        LeedsForLife_NavBar_2 = new QLabel(scrollAreaWidgetContents);
        LeedsForLife_NavBar_2->setObjectName(QStringLiteral("LeedsForLife_NavBar_2"));
        LeedsForLife_NavBar_2->setGeometry(QRect(1660, 1120, 99, 41));
        LeedsForLife_NavBar_2->setLayoutDirection(Qt::LeftToRight);
        LeedsForLife_NavBar_2->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        LeedsForLife_NavBar_2->setTextFormat(Qt::RichText);
        LeedsForLife_NavBar_2->setWordWrap(false);
        LeedsForLife_NavBar_2->setMargin(3);
        LeedsForLife_NavBar_2->setIndent(3);
        LeedsForLife_NavBar_2->setOpenExternalLinks(true);
        LeedsForLife_NavBar_2->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        Opportunities_NavBar = new QLabel(scrollAreaWidgetContents);
        Opportunities_NavBar->setObjectName(QStringLiteral("Opportunities_NavBar"));
        Opportunities_NavBar->setGeometry(QRect(100, 60, 121, 41));
        Opportunities_NavBar->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        Opportunities_NavBar->setTextFormat(Qt::RichText);
        Opportunities_NavBar->setWordWrap(false);
        Opportunities_NavBar->setMargin(3);
        Opportunities_NavBar->setIndent(3);
        Opportunities_NavBar->setOpenExternalLinks(true);
        Opportunities_NavBar->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        Broadening_NavBar = new QLabel(scrollAreaWidgetContents);
        Broadening_NavBar->setObjectName(QStringLiteral("Broadening_NavBar"));
        Broadening_NavBar->setGeometry(QRect(220, 60, 101, 41));
        Broadening_NavBar->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        Broadening_NavBar->setTextFormat(Qt::RichText);
        Broadening_NavBar->setWordWrap(false);
        Broadening_NavBar->setMargin(3);
        Broadening_NavBar->setIndent(3);
        Broadening_NavBar->setOpenExternalLinks(true);
        Broadening_NavBar->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        Foundation_NavBar = new QLabel(scrollAreaWidgetContents);
        Foundation_NavBar->setObjectName(QStringLiteral("Foundation_NavBar"));
        Foundation_NavBar->setGeometry(QRect(320, 60, 171, 41));
        Foundation_NavBar->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        Foundation_NavBar->setTextFormat(Qt::RichText);
        Foundation_NavBar->setWordWrap(false);
        Foundation_NavBar->setMargin(3);
        Foundation_NavBar->setIndent(3);
        Foundation_NavBar->setOpenExternalLinks(true);
        Foundation_NavBar->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        CaseStudies_NavBar = new QLabel(scrollAreaWidgetContents);
        CaseStudies_NavBar->setObjectName(QStringLiteral("CaseStudies_NavBar"));
        CaseStudies_NavBar->setGeometry(QRect(490, 60, 111, 41));
        CaseStudies_NavBar->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        CaseStudies_NavBar->setTextFormat(Qt::RichText);
        CaseStudies_NavBar->setWordWrap(false);
        CaseStudies_NavBar->setMargin(3);
        CaseStudies_NavBar->setIndent(3);
        CaseStudies_NavBar->setOpenExternalLinks(true);
        CaseStudies_NavBar->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        LogIn_NavBar = new QLabel(scrollAreaWidgetContents);
        LogIn_NavBar->setObjectName(QStringLiteral("LogIn_NavBar"));
        LogIn_NavBar->setGeometry(QRect(600, 60, 421, 41));
        LogIn_NavBar->setLayoutDirection(Qt::RightToLeft);
        LogIn_NavBar->setStyleSheet(QStringLiteral("background-color: rgb(204,51,102);"));
        LogIn_NavBar->setTextFormat(Qt::RichText);
        LogIn_NavBar->setAlignment(Qt::AlignRight|Qt::AlignTrailing|Qt::AlignVCenter);
        LogIn_NavBar->setWordWrap(false);
        LogIn_NavBar->setMargin(9);
        LogIn_NavBar->setIndent(9);
        LogIn_NavBar->setOpenExternalLinks(true);
        LogIn_NavBar->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard);
        HeadingTopSection = new QTextEdit(scrollAreaWidgetContents);
        HeadingTopSection->setObjectName(QStringLiteral("HeadingTopSection"));
        HeadingTopSection->setGeometry(QRect(50, 100, 911, 51));
        HeadingTopSection->setStyleSheet(QLatin1String("background-color: rgb(54, 59, 72);\n"
"color: rgb(255, 255, 255);\n"
"font: 75 18pt \"Liberation Serif\";"));
        HeadingTopSection->setFrameShape(QFrame::NoFrame);
        HeadingTopSection->setAcceptRichText(false);
        HeadingTopSection->setTextInteractionFlags(Qt::NoTextInteraction);
        AboutBroadening = new QLabel(scrollAreaWidgetContents);
        AboutBroadening->setObjectName(QStringLiteral("AboutBroadening"));
        AboutBroadening->setGeometry(QRect(0, 390, 1021, 281));
        AboutBroadening->setStyleSheet(QStringLiteral("background-color: rgb(255, 255, 255);"));
        AboutBroadening->setFrameShape(QFrame::Box);
        AboutBroadening->setFrameShadow(QFrame::Plain);
        HeadingSection2 = new QTextEdit(scrollAreaWidgetContents);
        HeadingSection2->setObjectName(QStringLiteral("HeadingSection2"));
        HeadingSection2->setGeometry(QRect(20, 400, 311, 51));
        HeadingSection2->setStyleSheet(QLatin1String("background-color: rgb(255, 255, 255);\n"
"color: rgb(0, 0, 0);\n"
"font: 75 18pt \"Liberation Serif\";"));
        HeadingSection2->setFrameShape(QFrame::NoFrame);
        HeadingSection2->setAcceptRichText(false);
        HeadingSection2->setTextInteractionFlags(Qt::NoTextInteraction);
        InfoAboutBroadening = new QTextEdit(scrollAreaWidgetContents);
        InfoAboutBroadening->setObjectName(QStringLiteral("InfoAboutBroadening"));
        InfoAboutBroadening->setGeometry(QRect(340, 440, 671, 221));
        InfoAboutBroadening->setFrameShape(QFrame::NoFrame);
        InfoAboutBroadening->setFrameShadow(QFrame::Raised);
        label = new QLabel(scrollAreaWidgetContents);
        label->setObjectName(QStringLiteral("label"));
        label->setGeometry(QRect(20, 450, 301, 171));
        label->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot200.png")));
        DiscveryModules = new QLabel(scrollAreaWidgetContents);
        DiscveryModules->setObjectName(QStringLiteral("DiscveryModules"));
        DiscveryModules->setGeometry(QRect(0, 670, 1021, 1251));
        DiscveryModules->setStyleSheet(QLatin1String("background-color: rgb(255, 255, 255);\n"
""));
        DiscveryModules->setFrameShape(QFrame::Box);
        DiscveryModules->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        HeadingSection2_2 = new QTextEdit(scrollAreaWidgetContents);
        HeadingSection2_2->setObjectName(QStringLiteral("HeadingSection2_2"));
        HeadingSection2_2->setGeometry(QRect(20, 690, 311, 51));
        HeadingSection2_2->setStyleSheet(QLatin1String("background-color: rgb(255, 255, 255);\n"
"color: rgb(0, 0, 0);\n"
"font: 75 18pt \"Liberation Serif\";"));
        HeadingSection2_2->setFrameShape(QFrame::NoFrame);
        HeadingSection2_2->setAcceptRichText(false);
        HeadingSection2_2->setTextInteractionFlags(Qt::NoTextInteraction);
        InfoDiscoveryModules = new QTextEdit(scrollAreaWidgetContents);
        InfoDiscoveryModules->setObjectName(QStringLiteral("InfoDiscoveryModules"));
        InfoDiscoveryModules->setGeometry(QRect(40, 740, 941, 201));
        InfoDiscoveryModules->setFrameShape(QFrame::NoFrame);
        InfoDiscoveryModules->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        InfoDiscoveryModules->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        SubHeadingForModules = new QTextEdit(scrollAreaWidgetContents);
        SubHeadingForModules->setObjectName(QStringLiteral("SubHeadingForModules"));
        SubHeadingForModules->setGeometry(QRect(410, 940, 171, 41));
        SubHeadingForModules->setFrameShape(QFrame::NoFrame);
        SubHeadingForModules->setFrameShadow(QFrame::Plain);
        SubHeadingForModules->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        SubHeadingForModules->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        PowerAndConflict = new QLabel(scrollAreaWidgetContents);
        PowerAndConflict->setObjectName(QStringLiteral("PowerAndConflict"));
        PowerAndConflict->setGeometry(QRect(60, 980, 101, 101));
        PowerAndConflict->setMouseTracking(true);
        PowerAndConflict->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/Power1.png")));
        PowerAndConflict->setScaledContents(true);
        PowerAndConflict->setTextInteractionFlags(Qt::LinksAccessibleByMouse|Qt::TextSelectableByKeyboard|Qt::TextSelectableByMouse);
        Media = new QLabel(scrollAreaWidgetContents);
        Media->setObjectName(QStringLiteral("Media"));
        Media->setGeometry(QRect(240, 980, 101, 101));
        Media->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/Media.png")));
        Media->setScaledContents(false);
        Ethics = new QLabel(scrollAreaWidgetContents);
        Ethics->setObjectName(QStringLiteral("Ethics"));
        Ethics->setGeometry(QRect(440, 980, 101, 101));
        Ethics->setMaximumSize(QSize(1677, 1677));
        Ethics->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/Ethics.png")));
        Science = new QLabel(scrollAreaWidgetContents);
        Science->setObjectName(QStringLiteral("Science"));
        Science->setGeometry(QRect(640, 980, 101, 101));
        Science->setMaximumSize(QSize(1677, 1677));
        Science->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/Science.png")));
        Technology = new QLabel(scrollAreaWidgetContents);
        Technology->setObjectName(QStringLiteral("Technology"));
        Technology->setGeometry(QRect(830, 980, 101, 101));
        Technology->setMaximumSize(QSize(1677, 1677));
        Technology->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/Technology.png")));
        TextPower = new QTextEdit(scrollAreaWidgetContents);
        TextPower->setObjectName(QStringLiteral("TextPower"));
        TextPower->setGeometry(QRect(20, 1090, 171, 191));
        TextPower->setInputMethodHints(Qt::ImhHiddenText);
        TextPower->setFrameShape(QFrame::Box);
        TextPower->setFrameShadow(QFrame::Plain);
        TextPower->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower->setReadOnly(true);
        TextPower->setTextInteractionFlags(Qt::TextSelectableByMouse);
        TextMedia = new QTextEdit(scrollAreaWidgetContents);
        TextMedia->setObjectName(QStringLiteral("TextMedia"));
        TextMedia->setGeometry(QRect(210, 1090, 171, 191));
        TextMedia->setInputMethodHints(Qt::ImhHiddenText);
        TextMedia->setFrameShape(QFrame::Box);
        TextMedia->setFrameShadow(QFrame::Plain);
        TextMedia->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextMedia->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextMedia->setReadOnly(true);
        TextEthics = new QTextEdit(scrollAreaWidgetContents);
        TextEthics->setObjectName(QStringLiteral("TextEthics"));
        TextEthics->setGeometry(QRect(410, 1090, 171, 191));
        TextEthics->setInputMethodHints(Qt::ImhHiddenText);
        TextEthics->setFrameShape(QFrame::Box);
        TextEthics->setFrameShadow(QFrame::Plain);
        TextEthics->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextEthics->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextEthics->setReadOnly(true);
        TextScience = new QTextEdit(scrollAreaWidgetContents);
        TextScience->setObjectName(QStringLiteral("TextScience"));
        TextScience->setGeometry(QRect(610, 1090, 171, 191));
        TextScience->setInputMethodHints(Qt::ImhHiddenText);
        TextScience->setFrameShape(QFrame::Box);
        TextScience->setFrameShadow(QFrame::Plain);
        TextScience->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextScience->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextScience->setReadOnly(true);
        TextScience_2 = new QTextEdit(scrollAreaWidgetContents);
        TextScience_2->setObjectName(QStringLiteral("TextScience_2"));
        TextScience_2->setGeometry(QRect(810, 1090, 171, 191));
        TextScience_2->setInputMethodHints(Qt::ImhHiddenText);
        TextScience_2->setFrameShape(QFrame::Box);
        TextScience_2->setFrameShadow(QFrame::Plain);
        TextScience_2->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextScience_2->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        PowerAndConflict_2 = new QLabel(scrollAreaWidgetContents);
        PowerAndConflict_2->setObjectName(QStringLiteral("PowerAndConflict_2"));
        PowerAndConflict_2->setGeometry(QRect(50, 1430, 111, 101));
        PowerAndConflict_2->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot202.png")));
        PowerAndConflict_2->setScaledContents(true);
        PowerAndConflict_3 = new QLabel(scrollAreaWidgetContents);
        PowerAndConflict_3->setObjectName(QStringLiteral("PowerAndConflict_3"));
        PowerAndConflict_3->setGeometry(QRect(230, 1430, 121, 101));
        PowerAndConflict_3->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot205.png")));
        PowerAndConflict_3->setScaledContents(false);
        PowerAndConflict_4 = new QLabel(scrollAreaWidgetContents);
        PowerAndConflict_4->setObjectName(QStringLiteral("PowerAndConflict_4"));
        PowerAndConflict_4->setGeometry(QRect(440, 1430, 101, 101));
        PowerAndConflict_4->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot204.png")));
        PowerAndConflict_4->setScaledContents(false);
        PowerAndConflict_5 = new QLabel(scrollAreaWidgetContents);
        PowerAndConflict_5->setObjectName(QStringLiteral("PowerAndConflict_5"));
        PowerAndConflict_5->setGeometry(QRect(640, 1430, 101, 101));
        PowerAndConflict_5->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot206.png")));
        PowerAndConflict_5->setScaledContents(false);
        PowerAndConflict_6 = new QLabel(scrollAreaWidgetContents);
        PowerAndConflict_6->setObjectName(QStringLiteral("PowerAndConflict_6"));
        PowerAndConflict_6->setGeometry(QRect(850, 1430, 101, 101));
        PowerAndConflict_6->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/snapshot203.png")));
        PowerAndConflict_6->setScaledContents(false);
        TextPower_2 = new QTextEdit(scrollAreaWidgetContents);
        TextPower_2->setObjectName(QStringLiteral("TextPower_2"));
        TextPower_2->setGeometry(QRect(20, 1550, 171, 191));
        TextPower_2->setInputMethodHints(Qt::ImhHiddenText);
        TextPower_2->setFrameShape(QFrame::Box);
        TextPower_2->setFrameShadow(QFrame::Plain);
        TextPower_2->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_2->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_2->setReadOnly(true);
        TextPower_2->setTextInteractionFlags(Qt::TextSelectableByMouse);
        TextPower_3 = new QTextEdit(scrollAreaWidgetContents);
        TextPower_3->setObjectName(QStringLiteral("TextPower_3"));
        TextPower_3->setGeometry(QRect(210, 1550, 171, 191));
        TextPower_3->setInputMethodHints(Qt::ImhHiddenText);
        TextPower_3->setFrameShape(QFrame::Box);
        TextPower_3->setFrameShadow(QFrame::Plain);
        TextPower_3->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_3->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_3->setReadOnly(true);
        TextPower_3->setTextInteractionFlags(Qt::TextSelectableByMouse);
        TextPower_4 = new QTextEdit(scrollAreaWidgetContents);
        TextPower_4->setObjectName(QStringLiteral("TextPower_4"));
        TextPower_4->setGeometry(QRect(410, 1550, 171, 191));
        TextPower_4->setInputMethodHints(Qt::ImhHiddenText);
        TextPower_4->setFrameShape(QFrame::Box);
        TextPower_4->setFrameShadow(QFrame::Plain);
        TextPower_4->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_4->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_4->setReadOnly(true);
        TextPower_4->setTextInteractionFlags(Qt::TextSelectableByMouse);
        TextPower_5 = new QTextEdit(scrollAreaWidgetContents);
        TextPower_5->setObjectName(QStringLiteral("TextPower_5"));
        TextPower_5->setGeometry(QRect(610, 1550, 171, 191));
        TextPower_5->setInputMethodHints(Qt::ImhHiddenText);
        TextPower_5->setFrameShape(QFrame::Box);
        TextPower_5->setFrameShadow(QFrame::Plain);
        TextPower_5->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_5->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_5->setReadOnly(true);
        TextPower_5->setTextInteractionFlags(Qt::TextSelectableByMouse);
        TextPower_6 = new QTextEdit(scrollAreaWidgetContents);
        TextPower_6->setObjectName(QStringLiteral("TextPower_6"));
        TextPower_6->setGeometry(QRect(820, 1550, 171, 191));
        TextPower_6->setInputMethodHints(Qt::ImhHiddenText);
        TextPower_6->setFrameShape(QFrame::Box);
        TextPower_6->setFrameShadow(QFrame::Plain);
        TextPower_6->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_6->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        TextPower_6->setReadOnly(true);
        TextPower_6->setTextInteractionFlags(Qt::TextSelectableByMouse);
        SearchBox = new QLineEdit(scrollAreaWidgetContents);
        SearchBox->setObjectName(QStringLiteral("SearchBox"));
        SearchBox->setGeometry(QRect(10, 1860, 181, 31));
        pushButton = new QPushButton(scrollAreaWidgetContents);
        pushButton->setObjectName(QStringLiteral("pushButton"));
        pushButton->setGeometry(QRect(200, 1860, 91, 31));
        pushButton->setStyleSheet(QLatin1String("color:rgb(252, 252, 252);\n"
"background-color: rgb(204, 51, 102);\n"
"background-color: rgb(54, 53, 52);"));
        RSSandContactSection = new QLabel(scrollAreaWidgetContents);
        RSSandContactSection->setObjectName(QStringLiteral("RSSandContactSection"));
        RSSandContactSection->setGeometry(QRect(0, 1920, 1021, 161));
        RSSandContactSection->setStyleSheet(QStringLiteral("background-color: rgb(54, 59, 72);"));
        RSSandContactSection->setFrameShape(QFrame::Box);
        RSSandContactSection->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        linkedinFeed = new QLabel(scrollAreaWidgetContents);
        linkedinFeed->setObjectName(QStringLiteral("linkedinFeed"));
        linkedinFeed->setGeometry(QRect(20, 1960, 91, 91));
        linkedinFeed->setMaximumSize(QSize(300, 300));
        linkedinFeed->setBaseSize(QSize(50, 50));
        linkedinFeed->setStyleSheet(QStringLiteral(""));
        linkedinFeed->setTextFormat(Qt::PlainText);
        linkedinFeed->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/linkedin_.png")));
        linkedinFeed->setScaledContents(true);
        linkedinFeed->setOpenExternalLinks(true);
        linkedinFeed->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        fbFeed = new QLabel(scrollAreaWidgetContents);
        fbFeed->setObjectName(QStringLiteral("fbFeed"));
        fbFeed->setGeometry(QRect(180, 1960, 91, 91));
        fbFeed->setMaximumSize(QSize(300, 300));
        fbFeed->setBaseSize(QSize(50, 50));
        fbFeed->setStyleSheet(QStringLiteral(""));
        fbFeed->setTextFormat(Qt::PlainText);
        fbFeed->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/fb.ico")));
        fbFeed->setScaledContents(true);
        fbFeed->setOpenExternalLinks(true);
        fbFeed->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        twitterFeed = new QLabel(scrollAreaWidgetContents);
        twitterFeed->setObjectName(QStringLiteral("twitterFeed"));
        twitterFeed->setGeometry(QRect(360, 1960, 91, 91));
        twitterFeed->setMaximumSize(QSize(300, 300));
        twitterFeed->setBaseSize(QSize(50, 50));
        twitterFeed->setStyleSheet(QStringLiteral(""));
        twitterFeed->setTextFormat(Qt::PlainText);
        twitterFeed->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/twitter_.png")));
        twitterFeed->setScaledContents(true);
        twitterFeed->setOpenExternalLinks(true);
        twitterFeed->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        googleFeed = new QLabel(scrollAreaWidgetContents);
        googleFeed->setObjectName(QStringLiteral("googleFeed"));
        googleFeed->setGeometry(QRect(540, 1960, 91, 91));
        googleFeed->setMaximumSize(QSize(300, 300));
        googleFeed->setBaseSize(QSize(50, 50));
        googleFeed->setStyleSheet(QStringLiteral(""));
        googleFeed->setTextFormat(Qt::PlainText);
        googleFeed->setPixmap(QPixmap(QString::fromUtf8("../../../../../csunix/sc15hv/qtcreatorwork/Broadeningwebpage/images/g+.ico")));
        googleFeed->setScaledContents(true);
        googleFeed->setOpenExternalLinks(true);
        googleFeed->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        textEdit = new QTextEdit(scrollAreaWidgetContents);
        textEdit->setObjectName(QStringLiteral("textEdit"));
        textEdit->setGeometry(QRect(720, 1930, 281, 131));
        textEdit->setStyleSheet(QLatin1String("background-color: rgb(54, 59, 72);\n"
""));
        textEdit->setFrameShape(QFrame::NoFrame);
        textEdit->setVerticalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        textEdit->setHorizontalScrollBarPolicy(Qt::ScrollBarAlwaysOff);
        label_2 = new QLabel(scrollAreaWidgetContents);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setGeometry(QRect(0, 2080, 1021, 41));
        label_2->setStyleSheet(QLatin1String("color: rgb(255, 255, 255);\n"
"background-color: rgb(41, 49, 55);"));
        label_2->setFrameShape(QFrame::Box);
        label_2->setLineWidth(0);
        label_2->setMidLineWidth(-1);
        label_2->setTextFormat(Qt::AutoText);
        label_2->setScaledContents(false);
        label_2->setWordWrap(true);
        label_2->setMargin(7);
        label_2->setIndent(4);
        label_2->setOpenExternalLinks(true);
        label_2->setTextInteractionFlags(Qt::LinksAccessibleByKeyboard|Qt::LinksAccessibleByMouse);
        SearchButtonForTheme1 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme1->setObjectName(QStringLiteral("SearchButtonForTheme1"));
        SearchButtonForTheme1->setGeometry(QRect(40, 1310, 111, 31));
        SearchButtonForTheme1->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme2 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme2->setObjectName(QStringLiteral("SearchButtonForTheme2"));
        SearchButtonForTheme2->setGeometry(QRect(230, 1310, 111, 31));
        SearchButtonForTheme2->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme3 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme3->setObjectName(QStringLiteral("SearchButtonForTheme3"));
        SearchButtonForTheme3->setGeometry(QRect(440, 1310, 111, 31));
        SearchButtonForTheme3->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme4 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme4->setObjectName(QStringLiteral("SearchButtonForTheme4"));
        SearchButtonForTheme4->setGeometry(QRect(640, 1310, 111, 31));
        SearchButtonForTheme4->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme5 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme5->setObjectName(QStringLiteral("SearchButtonForTheme5"));
        SearchButtonForTheme5->setGeometry(QRect(840, 1310, 111, 31));
        SearchButtonForTheme5->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme10 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme10->setObjectName(QStringLiteral("SearchButtonForTheme10"));
        SearchButtonForTheme10->setGeometry(QRect(850, 1750, 111, 31));
        SearchButtonForTheme10->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme9 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme9->setObjectName(QStringLiteral("SearchButtonForTheme9"));
        SearchButtonForTheme9->setGeometry(QRect(640, 1750, 111, 31));
        SearchButtonForTheme9->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme8 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme8->setObjectName(QStringLiteral("SearchButtonForTheme8"));
        SearchButtonForTheme8->setGeometry(QRect(440, 1750, 111, 31));
        SearchButtonForTheme8->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme7 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme7->setObjectName(QStringLiteral("SearchButtonForTheme7"));
        SearchButtonForTheme7->setGeometry(QRect(230, 1750, 111, 31));
        SearchButtonForTheme7->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        SearchButtonForTheme6 = new QPushButton(scrollAreaWidgetContents);
        SearchButtonForTheme6->setObjectName(QStringLiteral("SearchButtonForTheme6"));
        SearchButtonForTheme6->setGeometry(QRect(50, 1750, 111, 31));
        SearchButtonForTheme6->setStyleSheet(QStringLiteral("background-color: rgb(204, 51, 102);"));
        scrollArea->setWidget(scrollAreaWidgetContents);
        TopLandingSection->raise();
        DiscveryModules->raise();
        AboutBroadening->raise();
        UniversityLogo->raise();
        LeedsForLife_NavBar->raise();
        LeedsForLife_NavBar_2->raise();
        Opportunities_NavBar->raise();
        Broadening_NavBar->raise();
        Foundation_NavBar->raise();
        CaseStudies_NavBar->raise();
        LogIn_NavBar->raise();
        HeadingTopSection->raise();
        HeadingSection2->raise();
        InfoAboutBroadening->raise();
        label->raise();
        HeadingSection2_2->raise();
        InfoDiscoveryModules->raise();
        SubHeadingForModules->raise();
        PowerAndConflict->raise();
        Media->raise();
        Ethics->raise();
        Science->raise();
        Technology->raise();
        TextPower->raise();
        TextMedia->raise();
        TextEthics->raise();
        TextScience->raise();
        TextScience_2->raise();
        PowerAndConflict_2->raise();
        PowerAndConflict_3->raise();
        PowerAndConflict_4->raise();
        PowerAndConflict_5->raise();
        PowerAndConflict_6->raise();
        TextPower_2->raise();
        TextPower_3->raise();
        TextPower_4->raise();
        TextPower_5->raise();
        TextPower_6->raise();
        SearchBox->raise();
        pushButton->raise();
        RSSandContactSection->raise();
        linkedinFeed->raise();
        fbFeed->raise();
        twitterFeed->raise();
        googleFeed->raise();
        textEdit->raise();
        label_2->raise();
        SearchButtonForTheme1->raise();
        SearchButtonForTheme2->raise();
        SearchButtonForTheme3->raise();
        SearchButtonForTheme4->raise();
        SearchButtonForTheme5->raise();
        SearchButtonForTheme10->raise();
        SearchButtonForTheme9->raise();
        SearchButtonForTheme8->raise();
        SearchButtonForTheme7->raise();
        SearchButtonForTheme6->raise();

        gridLayout->addWidget(scrollArea, 0, 0, 1, 1);

        MainWindow->setCentralWidget(centralWidget);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0));
        TopLandingSection->setText(QString());
        UniversityLogo->setText(QString());
        LeedsForLife_NavBar->setText(QApplication::translate("MainWindow", "    LeedsForLife   ", 0));
        LeedsForLife_NavBar_2->setText(QApplication::translate("MainWindow", "    LeedsForLife   ", 0));
        Opportunities_NavBar->setText(QApplication::translate("MainWindow", "OPPORTUNITIES", 0));
        Broadening_NavBar->setText(QApplication::translate("MainWindow", "BROADENING", 0));
        Foundation_NavBar->setText(QApplication::translate("MainWindow", "FOUNDATION FUNDING", 0));
        CaseStudies_NavBar->setText(QApplication::translate("MainWindow", "CASE STUDIES", 0));
        LogIn_NavBar->setText(QApplication::translate("MainWindow", "                                                                                                                  LOG IN", 0));
        HeadingTopSection->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Liberation Serif'; font-size:18pt; font-weight:72; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:24pt; font-weight:600;\">      BROADENING: EXPAND YOUR ACEDEMIC HORIZONS</span></p></body></html>", 0));
        AboutBroadening->setText(QString());
        HeadingSection2->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Liberation Serif'; font-size:18pt; font-weight:72; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:24pt; font-weight:600;\">   About Broadening</span></p></body></html>", 0));
        InfoAboutBroadening->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt;\">As a student at the University of Leeds, you will engage with a broad education which challenges, complements and reinforces the value of your degree subject. Broadening develops skills and intellectual flexibility which benefit your education whilst at university, and will enable you to compete and contribute in the workplace and wider society after graduation. </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><sp"
                        "an style=\" font-family:'Cantarell'; font-size:11pt;\">To enable you to take advantage of the breadth of expertise at Leeds, we have developed 10 interdisciplinary Discovery Themes. During your programme of study you will either explore the Themes as part of your programme (ie through your core and optional modules) or by taking discovery modules.\302\240Watch the video, produced by LSTV - a student-run society - to find out more about broadening, the Discovery Themes and the opportunities they offer.</span></p></body></html>", 0));
        label->setText(QString());
        DiscveryModules->setText(QString());
        HeadingSection2_2->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Liberation Serif'; font-size:18pt; font-weight:72; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:24pt; font-weight:600;\">   Discovery Modules</span></p></body></html>", 0));
        InfoDiscoveryModules->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:11pt;\">Discovery modules reinforce the value and interest of your degree by offering the opportunity to broaden your learning and pursue your own personal interests, while developing skills that will help prepare you for life after University. Your School can provide you with more information about the part that discovery modules play in your particular degree programme. </span></p>\n"
"<p style=\" margin-top:14px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:1"
                        "1pt; font-weight:600;\">How discovery modules are organised</span><span style=\" font-size:11pt;\"> </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:11pt;\">To help you navigate the extensive choice of modules on offer, we have organised them into 10 Discovery Themes which together represent the breadth of the University\342\200\231s teaching from arts to sciences, and from theory to practice. You can click on any of the 10 Discovery icons below to learn more about each Theme. You will also find more specific guidance about taking your interests forward from year to year, so that your discovery module choices fit together to form a coherent addition to your degree.</span></p></body></html>", 0));
        SubHeadingForModules->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:14pt; font-weight:600;\">SELECT THEMES</span></p></body></html>", 0));
#ifndef QT_NO_WHATSTHIS
        PowerAndConflict->setWhatsThis(QApplication::translate("MainWindow", "<html><head/><body><a href = \"#\"></a><p><br/></p></body></html>", 0));
#endif // QT_NO_WHATSTHIS
        PowerAndConflict->setText(QString());
        Media->setText(QString());
        Ethics->setText(QString());
        Science->setText(QString());
        Technology->setText(QString());
        TextPower->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600;\">     </span><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600;\">Power and Conflict </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell';\">\342\200\234The day the power of love overrules the love of power, the world will know peace\342\200\235 (Mahatma Gandhi) </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px;"
                        " margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell';\">\342\200\234Every period of human development has had its own particular type of human conflict\342\200\235 (Isaac Asimov)</span></p></body></html>", 0));
        TextMedia->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600;\">Media, Culture and Creativity </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell';\">Are you interested in art, heritage, literature, music or theatre? What about film, photography, popular culture, technology and design? Cultural connoisseur or simply curious?</span></p></body></html>", 0));
        TextEthics->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600;\">Ethics, Religion and Law </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt;\">Ethics, religion and law: three societal pillars on the basis of which cultures are built, wars fought and lives lived.</span></p></body></html>", 0));
        TextScience->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600;\">Exploring the Sciences </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt;\">\342\200\234Science is a way of thinking much more than it is a body of knowledge.\342\200\235 (Sagan)</span></p></body></html>", 0));
        TextScience_2->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600;\">Exploring the Sciences </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt;\">\342\200\234Science is a way of thinking much more than it is a body of knowledge.\342\200\235 (Sagan)</span></p></body></html>", 0));
        PowerAndConflict_2->setText(QString());
        PowerAndConflict_3->setText(QString());
        PowerAndConflict_4->setText(QString());
        PowerAndConflict_5->setText(QString());
        PowerAndConflict_6->setText(QString());
        TextPower_2->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:medium; font-weight:600;\">Mind and Body</span> </p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">What are the processes that influence our bodies and minds?\302\240</p></body></html>", 0));
        TextPower_3->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:medium; font-weight:600;\">Personal and Professional Development</span> </p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">Do you want to discover modules that inspire exciting ideas and transform your development at university?</p></body></html>", 0));
        TextPower_4->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:medium; font-weight:600;\">Enterprise and Innovation</span> </p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">They say necessity is the mother of invention.\302\240But where do ideas for new products and services come from, and how are they translated into solutions and delivered to users?</p></body></html>", 0));
        TextPower_5->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:medium; font-weight:600;\">Language and Intercultural Understanding</span> </p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">\342\200\234The limits of my language means the limits of my world.\342\200\235 (Wittgenstein)</p></body></html>", 0));
        TextPower_6->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:medium; font-weight:600;\">Creating Sustainable Futures</span> </p>\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\">Discover the environmental, social and economic issues facing society, such as climate change and poverty. This Theme is the winner of the UK Green Gown Awards 2015. <a href=\"http://www.greengownawards.org\"><span style=\" text-decoration: underline; color:#0000ff;\">http://www.greengownawards.org</span></a></p></body></html>", 0));
        SearchBox->setPlaceholderText(QApplication::translate("MainWindow", "Search By Subject: ", 0));
        pushButton->setText(QApplication::translate("MainWindow", "Search", 0));
        RSSandContactSection->setText(QString());
        linkedinFeed->setText(QString());
        fbFeed->setText(QString());
        twitterFeed->setText(QString());
        googleFeed->setText(QString());
        textEdit->setHtml(QApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:'Sans Serif'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p style=\" margin-top:12px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-family:'Cantarell'; font-size:11pt; font-weight:600; color:#adadad;\">       Contact</span><span style=\" font-family:'Cantarell'; font-size:11pt; color:#adadad;\"> </span></p>\n"
"<p style=\" margin-top:12px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:1; text-indent:0px;\"><a href=\"mailto:itservicedesk@leeds.ac.uk?subject=Leeds%20for%20Life%20Enquiry\"><span style=\" font-family:'Cantarell'; font-size:10pt; text-decoration: underline; color:#adadad;\">IT Service Desk</span></a><span style=\" font-family:'Canta"
                        "rell'; font-size:10pt; color:#adadad;\"> </span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:1; text-indent:0px;\"><a href=\"mailto:leedsforlife@leeds.ac.uk?subject=Leeds%20for%20Life%20Enquiries\"><span style=\" font-family:'Cantarell'; font-size:10pt; text-decoration: underline; color:#adadad;\">Leeds for Life Enquiries &amp; Feedback</span></a><span style=\" font-family:'Cantarell'; font-size:10pt; color:#adadad;\"> </span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:1; text-indent:0px;\"><a href=\"mailto:lflamb@leeds.ac.uk?subject=Leeds%20for%20Life%20Ambassadors\"><span style=\" font-family:'Cantarell'; font-size:10pt; text-decoration: underline; color:#adadad;\">Leeds for Life Ambassadors</span></a><span style=\" font-family:'Cantarell'; font-size:10pt; color:#adadad;\"> </span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-ind"
                        "ent:1; text-indent:0px;\"><a href=\"https://leedsforlife.leeds.ac.uk/leedsnetwork/feedback\"><span style=\" font-family:'Cantarell'; font-size:10pt; text-decoration: underline; color:#adadad;\">Leeds Network Feedback &amp; Comments</span></a><span style=\" font-family:'Cantarell'; font-size:10pt; color:#adadad;\"> </span></p>\n"
"<p style=\" margin-top:0px; margin-bottom:12px; margin-left:0px; margin-right:0px; -qt-block-indent:1; text-indent:0px;\"><a href=\"mailto:volunteer@leeds.ac.uk?subject=Leeds%20for%20Life%20Volunteering\"><span style=\" font-family:'Cantarell'; font-size:10pt; text-decoration: underline; color:#adadad;\">Leeds for Life Volunteering</span></a><span style=\" font-family:'Cantarell'; font-size:10pt; color:#adadad;\"> </span></p></body></html>", 0));
        label_2->setText(QApplication::translate("MainWindow", "  Leeds for life     University of Leeds Accessibility   Privacy   Freedom of information   Terms & Conditions", 0));
        SearchButtonForTheme1->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme2->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme3->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme4->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme5->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme10->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme9->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme8->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme7->setText(QApplication::translate("MainWindow", "Search Theme", 0));
        SearchButtonForTheme6->setText(QApplication::translate("MainWindow", "Search Theme", 0));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
