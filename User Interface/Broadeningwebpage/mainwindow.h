#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private slots:
    void on_PowerAndConflict_linkHovered(const QString &link);

    void on_textBrowser_highlighted(const QString &arg1);

    void on_pushButton_clicked(bool checked);

    void on_linkedinFeed_linkActivated(const QString &link);

private:
    Ui::MainWindow *ui;
};

#endif // MAINWINDOW_H
