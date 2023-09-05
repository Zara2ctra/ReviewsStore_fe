import {makeAutoObservable} from "mobx";

export default class Review {
    constructor() {
        this._types = []
        this._reviews = [
            {
                "id": 1,
                "title": "Movie 'Star Wars: Episode IV - A New Hope'",
                "content_text": "Great movie, worth rewatching! 'Star Wars: Episode IV - A New Hope' is a classic in the science fiction genre. Directed by George Lucas, this film takes us on an epic journey to a galaxy far, far away. The story follows Luke Skywalker, a young farm boy who becomes a key figure in the Rebel Alliance's struggle against the evil Galactic Empire. With iconic characters like Darth Vader, Princess Leia, and Han Solo, this movie has left a lasting impact on pop culture. The special effects, for its time, were groundbreaking, and the story's themes of hope, heroism, and the battle between good and evil resonate with audiences of all ages. If you haven't seen it yet, it's definitely a must-watch!",
                "score": 5,
                "rating": 4.1,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693250252/reviews/z1g6s19cqidnwf4m3o9l.jpg"
            },
            {
                "id": 2,
                "title": "Book '1984' by George Orwell",
                "content_text": "Didn't like it, weak and uninteresting plot. '1984' by George Orwell is a dystopian novel that explores a totalitarian society where Big Brother watches every move of its citizens. While some readers find it thought-provoking and relevant, others may not appreciate its dark and grim themes. The story follows Winston Smith, who rebels against the oppressive regime but faces severe consequences. The novel raises questions about surveillance, propaganda, and the erosion of individual freedom. Some may find it a classic work of literature, while others may find it too bleak and unsettling. It's a matter of personal taste whether you'll enjoy this book.",
                "score": 2,
                "rating": 1,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227811/samples/animals/kitten-playing.gif"
            },
            {
                "id": 3,
                "title": "Anime 'Halfway!'",
                "content_text": "Average anime, but has some interesting moments. 'Halfway!' is an anime series that falls into the slice-of-life genre. It follows the lives of a group of high school students as they navigate the challenges of adolescence and friendship. While the anime has its moments of humor and heartfelt interactions, it may not stand out as a masterpiece in the genre. Some episodes shine with character development and emotional depth, while others feel filler-like. If you enjoy slice-of-life anime with a mix of comedy and drama, 'Halfway!' might be worth a watch, but don't expect it to revolutionize the genre.",
                "score": 3,
                "rating": 3.5,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227804/samples/animals/three-dogs.jpg"
            },
            {
                "id": 4,
                "title": "Movie 'Mysterious Murder'",
                "content_text": "The movie meets expectations and is worth watching. 'Mysterious Murder' is a suspenseful thriller that keeps you on the edge of your seat. Directed by a renowned filmmaker, it weaves a complex plot filled with twists and turns. The cast delivers stellar performances, especially the lead actor who portrays a detective trying to solve a baffling murder case. As the story unfolds, you'll find yourself trying to piece together the clues and figure out the mystery. The film's cinematography and soundtrack enhance the overall experience. If you're a fan of suspenseful thrillers, 'Mysterious Murder' won't disappoint.",
                "score": 4,
                "rating": 4.3,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227799/samples/animals/reindeer.jpg"
            },
            {
                "id": 5,
                "title": "Book 'Master and Margarita' by Mikhail Bulgakov",
                "content_text": "Perfect quality, but the price is high. 'Master and Margarita' is a masterpiece of Russian literature, written by Mikhail Bulgakov. The novel blends elements of satire, fantasy, and social commentary. It tells the story of the Devil's visit to Moscow and the chaos that ensues. The writing is brilliant, and the characters are memorable. However, the downside is that this edition comes with a high price tag. While the quality of the book is impeccable, it might not be affordable for everyone. If you're a literature enthusiast and can splurge on a beautifully crafted edition, 'Master and Margarita' should be on your bookshelf.",
                "score": 5,
                "rating": 2.9,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227797/samples/animals/cat.jpg"
            },
            {
                "id": 6,
                "title": "Movie 'Saw'",
                "content_text": "Not recommended, too much blood and cruelty. 'Saw' is a horror film known for its gruesome and disturbing scenes. It revolves around a sadistic serial killer who puts his victims through torturous games to test their will to live. While some horror enthusiasts appreciate the film's creativity and suspense, it's not for the faint of heart. The movie is infamous for its graphic violence and gore, which can be overwhelming for many viewers. If you're sensitive to extreme violence and cruelty, it's best to avoid 'Saw' and choose a less intense horror film.",
                "score": 1,
                "rating": 1,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            },
            {
                "id": 7,
                "title": "Anime 'Attack on Titan'",
                "content_text": "Awesome! The best anime I've ever watched. 'Attack on Titan' is an anime series that has garnered a massive fan following, and for good reason. Set in a world where humanity is on the brink of extinction due to giant humanoid creatures known as Titans, the show is a thrilling mix of action, mystery, and complex characters. It's known for its intense battles, political intrigue, and thought-provoking themes. The character development is superb, and the plot keeps you hooked from the first episode. If you're looking for an anime that's both visually stunning and emotionally gripping, 'Attack on Titan' is a must-watch.",
                "score": 5,
                "rating": 5,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            },
            {
                "id": 8,
                "title": "Movie 'Interstellar'",
                "content_text": "Average quality, but cheap. 'Interstellar' is a science fiction film directed by Christopher Nolan. While it offers a visually stunning depiction of space and explores fascinating scientific concepts, some viewers may find the plot and pacing a bit uneven. The movie's ambition is commendable, but it may leave you with mixed feelings. On the plus side, it's often available at a reasonable price, making it accessible to a wide audience. If you're a fan of space exploration and don't mind some narrative complexities, 'Interstellar' might be worth a watch.",
                "score": 3,
                "rating": 3,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            },
            {
                "id": 9,
                "title": "Book 'Harry Potter and the Philosopher's Stone' by J.K. Rowling",
                "content_text": "Not bad, but has some flaws. 'Harry Potter and the Philosopher's Stone' is the first book in the beloved Harry Potter series by J.K. Rowling. It introduces readers to the magical world of Hogwarts and the young wizard Harry Potter. While the book is undeniably charming and full of wonder, some readers have noted minor flaws in the writing and pacing. However, these flaws are easily overshadowed by the book's ability to capture the imagination and create a sense of enchantment. If you're looking for a delightful adventure with memorable characters, 'Harry Potter and the Philosopher's Stone' is a great choice.",
                "score": 4,
                "rating": 3,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            },
            {
                "id": 10,
                "title": "Movie 'Inception'",
                "content_text": "Good movie at a reasonable price. 'Inception' is a mind-bending science fiction thriller directed by Christopher Nolan. The film explores the concept of entering people's dreams to steal or implant ideas. With its complex narrative and stunning visual effects, 'Inception' has earned critical acclaim. While some may find the plot confusing, others appreciate its intricate layers and thought-provoking themes. The best part is that it's often available at an affordable price, making it accessible to a wide audience. If you enjoy movies that challenge your perception of reality, 'Inception' is a must-see.",
                "score": 4,
                "rating": 4,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            },
            {
                "id": 11,
                "title": "Movie 'Jurassic Park'",
                "content_text": "Horrible quality, not recommended. 'Jurassic Park' is a classic science fiction adventure film directed by Steven Spielberg. However, this particular edition or release of the movie has received criticism for its poor quality. Viewers have reported issues with the video and sound, which significantly diminish the viewing experience. While 'Jurassic Park' itself is a beloved film known for its groundbreaking special effects and thrilling story, this version may not do justice to the original. It's advisable to seek a higher-quality release if you want to fully enjoy the dinosaur-filled adventure.",
                "score": 1,
                "rating": 1,
                "imageUrl": "https://res.cloudinary.com/dommnni4r/image/upload/v1693227828/samples/dessert-on-a-plate.jpg"
            }
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