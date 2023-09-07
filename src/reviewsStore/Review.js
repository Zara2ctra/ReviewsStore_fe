import {makeAutoObservable} from "mobx";

export default class Review {
    constructor() {
        this._types = []
        this._reviews = [
            {
                "id": 1,
                "artWorkName": "Star Wars: Episode IV - A New Hope",
                "artWorkType": "MOVIE",
                "name": "A Glimpse into the Future",
                "content_text": `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`

`,
                "score":
                    5,
                "rating":
                    4.1,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693250252/reviews/z1g6s19cqidnwf4m3o9l.jpg"
            },
            {
                "id":
                    2,
                "artWorkName":
                    "Escape Room Experience",
                "artWorkType":
                    "OTHERS",
                "name":
                    "Thrilling Escape Room",
                "content_text":
                    "Embark on a thrilling 'Escape Room Experience' where you and your team must solve puzzles and unravel mysteries to escape within the time limit. It's an adrenaline-pumping adventure that tests your wits and teamwork.",
                "score":
                    4,
                "rating":
                    4.0,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227811/samples/animals/kitten-playing.gif"
            }
            ,
            {
                "id":
                    3,
                "artWorkName":
                    "SpongeBob SquarePants",
                "artWorkType":
                    "CARTOON",
                "name":
                    "Underwater Hijinks",
                "content_text":
                    "'SpongeBob SquarePants' is a beloved animated series that follows the adventures of SpongeBob and his friends in the underwater city of Bikini Bottom. With its quirky humor and memorable characters, it's a timeless cartoon that appeals to both kids and adults.",
                "score":
                    4,
                "rating":
                    4.2,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227804/samples/animals/three-dogs.jpg"
            }
            ,
            {
                "id":
                    4,
                "artWorkName":
                    "Stranger Things",
                "artWorkType":
                    "SERIES",
                "name":
                    "Upside Down Mysteries",
                "content_text":
                    "Dive into the supernatural world of 'Stranger Things.' Set in the 1980s, this gripping series follows a group of kids as they encounter strange occurrences in their small town. With a mix of horror, sci-fi, and '80s nostalgia, it's a binge-worthy show that keeps you on the edge of your seat.",
                "score":
                    5,
                "rating":
                    4.7,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227799/samples/animals/reindeer.jpg"
            }
            ,
            {
                "id":
                    5,
                "artWorkName":
                    "The Great Gatsby' by F. Scott Fitzgerald",
                "artWorkType":
                    "BOOK",
                "name":
                    "A Jazz Age Classic",
                "content_text":
                    "Step into the glamour and decadence of the Roaring Twenties with 'The Great Gatsby.' This literary masterpiece by F. Scott Fitzgerald explores the lives of the wealthy elite and their pursuit of the American Dream. It's a tale of love, wealth, and the darker side of excess.",
                "score":
                    4,
                "rating":
                    4.5,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227797/samples/animals/cat.jpg"
            }
            ,
            {
                "id":
                    6,
                "artWorkName":
                    "The Legend of Zelda: Breath of the Wild",
                "artWorkType":
                    "GAME",
                "name":
                    "A Legendary Adventure",
                "content_text":
                    "An epic adventure awaits in 'The Legend of Zelda: Breath of the Wild.' Explore the vast open world of Hyrule, solve puzzles, battle formidable foes, and uncover the secrets of this legendary game. With stunning visuals and immersive gameplay, it's a must-play for gamers of all ages.",
                "score":
                    5,
                "rating":
                    4.8,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
            ,
            {
                "id":
                    7,
                "artWorkName":
                    "The Legend of Zelda: Breath of the Wild",
                "artWorkType":
                    "GAME",
                "name":
                    "A Legendary Adventure",
                "content_text":
                    "An epic adventure awaits in 'The Legend of Zelda: Breath of the Wild.' Explore the vast open world of Hyrule, solve puzzles, battle formidable foes, and uncover the secrets of this legendary game. With stunning visuals and immersive gameplay, it's a must-play for gamers of all ages. Embark on a quest to defeat the evil Calamity Ganon and save Princess Zelda, all while discovering the rich lore and history of the kingdom. Whether you're climbing mountains, paragliding through the skies, or cooking up delicious meals, this game offers endless possibilities and unforgettable moments.",
                "score":
                    5,
                "rating":
                    4.8,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
            ,
            {
                "id":
                    8,
                "artWorkName":
                    "The Great Gatsby' by F. Scott Fitzgerald",
                "artWorkType":
                    "BOOK",
                "name":
                    "A Jazz Age Classic",
                "content_text":
                    "Step into the glamour and decadence of the Roaring Twenties with 'The Great Gatsby.' This literary masterpiece by F. Scott Fitzgerald explores the lives of the wealthy elite and their pursuit of the American Dream. It's a tale of love, wealth, and the darker side of excess. Follow the enigmatic Jay Gatsby as he throws extravagant parties in the hope of rekindling a lost love. Through the eyes of narrator Nick Carraway, you'll witness the extravagance and tragedy of Gatsby's world, where dreams collide with reality in a whirlwind of passion and disillusionment.",
                "score":
                    4,
                "rating":
                    4.5,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
            ,
            {
                "id":
                    9,
                "artWorkName":
                    "Stranger Things",
                "artWorkType":
                    "SERIES",
                "name":
                    "Upside Down Mysteries",
                "content_text":
                    "Dive into the supernatural world of 'Stranger Things.' Set in the 1980s, this gripping series follows a group of kids as they encounter strange occurrences in their small town. With a mix of horror, sci-fi, and '80s nostalgia, it's a binge-worthy show that keeps you on the edge of your seat. Join Eleven, Mike, Dustin, and the rest of the gang as they confront otherworldly creatures and government conspiracies. As secrets unravel and dimensions collide, friendships are tested, and the fate of their town hangs in the balance. 'Stranger Things' is a rollercoaster of suspense and nostalgia that will leave you craving more.",
                "score":
                    5,
                "rating":
                    4.7,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
            ,
            {
                "id":
                    10,
                "artWorkName":
                    "SpongeBob SquarePants",
                "artWorkType":
                    "CARTOON",
                "name":
                    "Underwater Hijinks",
                "content_text":
                    "'SpongeBob SquarePants' is a beloved animated series that follows the adventures of SpongeBob and his friends in the underwater city of Bikini Bottom. With its quirky humor and memorable characters, it's a timeless cartoon that appeals to both kids and adults. Join SpongeBob, Patrick, Squidward, and Mr. Krabs as they embark on hilarious escapades beneath the sea. From working at the Krusty Krab to Jellyfishing in Jellyfish Fields, every episode is packed with laughter and heartwarming moments. Dive into the ocean of fun and laughter with 'SpongeBob SquarePants.'",
                "score":
                    4,
                "rating":
                    4.2,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
            ,
            {
                "id":
                    11,
                "artWorkName":
                    "Escape Room Experience",
                "artWorkType":
                    "OTHERS",
                "name":
                    "Thrilling Escape Room",
                "content_text":
                    "Embark on a thrilling 'Escape Room Experience' where you and your team must solve puzzles and unravel mysteries to escape within the time limit. It's an adrenaline-pumping adventure that tests your wits and teamwork. Step into a world of hidden clues and cryptic riddles as you race against the clock. Will you unravel the mystery and escape in time, or will the secrets of the room remain locked forever? Gather your friends and challenge your problem-solving skills in this heart-pounding escape room adventure.",
                "score":
                    4,
                "rating":
                    4.0,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
            ,
            {
                "id":
                    12,
                "artWorkName":
                    "Escape Room Experience",
                "artWorkType":
                    "OTHERS",
                "name":
                    "Thrilling Escape Room",
                "content_text":
                    "Embark on a thrilling 'Escape Room Experience' where you and your team must solve puzzles and unravel mysteries to escape within the time limit. It's an adrenaline-pumping adventure that tests your wits and teamwork.",
                "score":
                    4,
                "rating":
                    4.0,
                "imageUrl":
                    "https://res.cloudinary.com/dommnni4r/image/upload/v1693227811/samples/animals/kitten-playing.gif"
            }
            ,
        ]
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setReviews(devices) {
        this._review = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }

    get reviews() {
        return this._reviews
    }

    get selectedType() {
        return this._selectedType
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}