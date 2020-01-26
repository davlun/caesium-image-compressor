cmake_minimum_required(VERSION 3.5)

set(APP_NAME "Caesium Image Compressor")
set(TARGET_NAME "caesium-image-compressor")
project(${TARGET_NAME} LANGUAGES CXX)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
set(Qt5_DIR /Users/lymphatus/Qt/5.14.0/clang_64/lib/cmake/Qt5)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt5 COMPONENTS Widgets LinguistTools REQUIRED)

set(TS_FILES locale/en_US.ts)

if (APPLE)
    set(MACOSX_BUNDLE_BUNDLE_NAME ${APP_NAME})
    set(MACOSX_BUNDLE_GUI_IDENTIFIER "com.saerasoft.caesium")
    set(MACOSX_BUNDLE_INFO_STRING "A cross-platform image compressor")
    add_executable(${TARGET_NAME} MACOSX_BUNDLE src/main.cpp
            src/mainwindow.cpp
            src/mainwindow.h
            views/mainwindow.ui
            ${TS_FILES}
            )
else()
    add_executable(${TARGET_NAME}
            src/main.cpp
            src/mainwindow.cpp
            src/mainwindow.h
            views/mainwindow.ui
            ${TS_FILES}
            )
endif()

set_target_properties(${TARGET_NAME} PROPERTIES OUTPUT_NAME ${APP_NAME})
set_target_properties(${TARGET_NAME} PROPERTIES MACOSX_BUNDLE_INFO_PLIST ${CMAKE_SOURCE_DIR}/Info.plist)

if (APPLE)
#    set_target_properties(
#        ${APP_NAME}
#        PROPERTIES
#        RESOURCE "icons/shadowsocks-qt5.icns"
#        )
    add_custom_command(
        TARGET ${TARGET_NAME}
        POST_BUILD
        COMMAND /Users/lymphatus/Qt/5.14.0/clang_64/bin/macdeployqt ${APP_NAME}.app
        WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
        )
endif()

target_link_libraries(${TARGET_NAME} PRIVATE Qt5::Widgets)

qt5_create_translation(QM_FILES ${CMAKE_SOURCE_DIR} ${TS_FILES})
