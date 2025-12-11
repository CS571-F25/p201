import { Row, Col, Button } from "react-bootstrap"
import BookCard from "./BookCard"
import BookReview from "./BookReview"
import StarRating from "./flair/StarRating"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { Form } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { useContext } from "react"

import CurrentRatingContext from "../contexts/CurrentRatingContext"


function BookProfile(props) {


    const params = new URLSearchParams(window.location.search)
    const page = params.get('bookname')
    const [currentBook, setCurrentBook] = useState({})
    const [userRating, setUserRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [aggregateScore, SetAggregateScore] = useState()

    const titleRef = useRef()
    const contentRef = useRef()



    useEffect(() => { 
        fetchCurrentBook()
        fetchCurrentBookReviews()
     }, [])


    async function fetchCurrentBook() {

        console.log(page)
        const apiBooks = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/books", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(res => Object.values(res.results)).then(res => res.find(r => r.title === page))
        console.log(apiBooks)
        setCurrentBook(apiBooks)
    }

    function handleReviewSumbit() {
        if (titleRef.current.value == '' || contentRef.current.value == '') {
            alert("You must provide both a title and a content")
        }
        else {

            const date = new Date();
            fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/reviews", {
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    reviewedBook: page,
                    user: "placeholderUsercrypto",
                    title: titleRef.current.value,
                    reputation: 0,
                    rating: userRating,
                    content: contentRef.current.value,
                    publishDate: date
                })
            }).then(res => res.json()).then(res => console.log(res.msg))
            titleRef.current.value = ''
            contentRef.current.value = ''
            setUserRating(0)
            alert("your review has been successfully submitted")
            fetchCurrentBookReviews()
        }
    }

    async function fetchCurrentBookReviews() {
        const bookReviews = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/reviews", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(res => Object.values(res.results)).then(res => res.filter(r => r.reviewedBook === page)).then(res => res.reverse()) // the title of the reviewed book is reviewedBook, not title, which is the title of the review in this context
        console.log(bookReviews)
        setReviews(bookReviews)
        handleAggregateScore()
    }

    function handleAggregateScore(){
        const numOfReviews = reviews.length
        let sumScore = 0
        reviews.forEach(r => sumScore += r.rating)
        SetAggregateScore((sumScore/numOfReviews).toFixed(2))
    }
    return (
        <div>
            <h1>{props.name}</h1>
            <Row>
                <Col xs={3}>
                    <BookCard title={page} name={page} >
                    </BookCard>
                    <h2>Aggregate Score: {aggregateScore}</h2>
                    <h3>Based on {reviews.length} reviews</h3>
                    <Link to={`/p201/bookpage?bookname=${page}`}>
                        <Button>READ</Button>
                    </Link>
                </Col>
                <Col xs={9}>
                    <Card>
                        <h2>Write your review here!</h2>
                        <CurrentRatingContext.Provider value={[userRating, setUserRating]}>
                            <StarRating count={5}></StarRating>
                        </CurrentRatingContext.Provider>
                        <Form>
                            <Form.Label htmlFor="titleInput"></Form.Label>
                            <Form.Control id="titleInput" placeholder={"Review Title"} ref={titleRef}></Form.Control>
                            <Form.Label htmlFor="commentInput"></Form.Label>
                            <Form.Control id="commentInput" ref={contentRef}></Form.Control>
                        </Form>
                        <Button onClick={handleReviewSumbit}>Submit</Button>
                    </Card>
                    {reviews.map(r => <BookReview key={crypto.randomUUID()}{...r}></BookReview>)}
                </Col>
            </Row>
            <p>
                it would be funny if there were some books here i think
            </p>
        </div>
    )
}

export default BookProfile
