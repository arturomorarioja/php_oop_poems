<?php

class Poem {
    private string $author;
    private string $title;

    public function __construct($author, $title)
    {
        $this->author = $author;
        $this->title = $title;
    }
    
    public function getText(): array
    {
        $poemFile = __DIR__ . '/../poems/' . $this->author . '/' . $this->title . '.json';
        return json_decode(file_get_contents($poemFile), true);
    } 
}