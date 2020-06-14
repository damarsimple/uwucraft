<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit4456e367b63a8dbed061ad9fb21f58ca
{
    public static $prefixLengthsPsr4 = array (
        'U' => 
        array (
            'Uwucraft\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Uwucraft\\' => 
        array (
            0 => __DIR__ . '/../..' . '/App',
        ),
    );

    public static $classMap = array (
        'Uwucraft\\Controller\\Database' => __DIR__ . '/../..' . '/App/Controller/Database.php',
        'Uwucraft\\Model\\Database' => __DIR__ . '/../..' . '/App/Model/Database.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit4456e367b63a8dbed061ad9fb21f58ca::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit4456e367b63a8dbed061ad9fb21f58ca::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit4456e367b63a8dbed061ad9fb21f58ca::$classMap;

        }, null, ClassLoader::class);
    }
}
