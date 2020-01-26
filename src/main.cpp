#include "mainwindow.h"

#include <QApplication>
#include <QMenuBar>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    QApplication::setAttribute(Qt::AA_UseHighDpiPixmaps);
    MainWindow w;
    w.show();


    return a.exec();
}
