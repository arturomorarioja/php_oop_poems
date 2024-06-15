<?php
/**
 * API of the poets application
 * 
 * @author  Arturo Mora-Rioja (amri@kea.dk)
 * @version 1.0, August 2022
 */

require_once __DIR__ . '/../classes/utils.php';

if (!isset($_GET['entity']) || !isset($_GET['information'])) {
    Utils::leave();
} else {
    $entity = $_GET['entity'];
    $information = $_GET['information'];
    
    switch ($entity) {
        case 'catalog':
            require_once __DIR__ . '/../classes/catalog.php';
            $catalog = new Catalog();
            
            switch ($information) {
                case 'authors':
                    echo json_encode($catalog->getAuthors());
                    break;
                default:
                    Utils::leave();
                }
                break;
        case 'author':
            if (!isset($_GET['name'])) {
                Utils::leave();
            } else {
                require_once __DIR__ . '/../classes/author.php';
                $name = $_GET['name'];

                $author = new Author($name);
                switch ($information) {
                    case 'info':
                        echo json_encode($author->getInfo());
                        break;
                    case 'poems':
                        echo json_encode($author->getPoems());
                        break;
                    default:
                        Utils::leave();
                }
            }                    
            break;
        case 'poem':
            if (!isset($_GET['authorName']) || !isset($_GET['title'])) {
                Utils::leave();
            } else {
                require_once __DIR__ . '/../classes/poem.php';
                $authorName = $_GET['authorName'];
                $title = $_GET['title'];

                $poem = new Poem($authorName, $title);
                switch ($information) {
                    case 'text':
                        echo json_encode($poem->getText());
                        break;
                    default: 
                        Utils::leave();
                }
            }
            break;
        default:
            Utils::leave();
    }
}