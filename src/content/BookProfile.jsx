import { Row, Col, Button } from "react-bootstrap"
import BookCard from "./BookCard"
import BookReview from "./BookReview"
import StarRating from "./flair/StarRating"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { Form } from "react-bootstrap"
import { Card, Container } from "react-bootstrap"
import { useContext } from "react"

import CurrentRatingContext from "../contexts/CurrentRatingContext"
import DataContextProvider from "../contexts/DataContextProvider"


function BookProfile(props) {


    const params = new URLSearchParams(window.location.search)
    const page = params.get('bookname')
    const [currentBook, setCurrentBook] = useState({})
    const [userRating, setUserRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [aggregateScore, SetAggregateScore] = useState()
    const [websiteData, setWebsiteData] = useContext(DataContextProvider)
    
    const titleRef = useRef()
    const contentRef = useRef()
    const [feedbackMessage, setFeedbackMessage] = useState('')



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

    async function handleReviewSumbit(e) {
        e && e.preventDefault()
        setFeedbackMessage('')
        if (titleRef.current.value == '' || contentRef.current.value == '') {
            setFeedbackMessage('You must provide both a title and content for your review.')
            return
        }

        try {
            const date = new Date();
            await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/reviews", {
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    reviewedBook: page,
                    user: websiteData.curUser,
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
            setFeedbackMessage('Your review has been successfully submitted.')
            fetchCurrentBookReviews()
        } catch (err) {
            setFeedbackMessage('There was an error submitting your review. Please try again.')
            console.error(err)
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
        handleAggregateScore(bookReviews)
    }

    function handleAggregateScore(bookReviews){
        const numOfReviews = bookReviews.length
        let sumScore = 0
        bookReviews.forEach(r => sumScore += r.rating)
        SetAggregateScore((sumScore/numOfReviews).toFixed(2))
    }
    return (
        <div>
            <h1>{props.name}</h1>
            <Row>
                <Col xs={3}>
                    <Container  className="align-items-center justify-content-center h-100vh">
                        <BookCard title={page} name={page} >
                        </BookCard>
                        <h2>Aggregate Score: {aggregateScore}</h2>
                        <h3>Based on {reviews.length} reviews</h3>
                        <Link to={`/p201/bookpage?bookname=${page}`}>
                            <Button>READ</Button>
                        </Link>
                    </Container>
                </Col>
                <Col xs={9}>
                {websiteData.isLoggedIn ? (
                    <Card>
                        <h1>Write your review here!</h1>
                        <CurrentRatingContext.Provider value={[userRating, setUserRating]}>
                            <StarRating count={5}></StarRating>
                        </CurrentRatingContext.Provider>
                        <Form onSubmit={handleReviewSumbit} aria-labelledby="review-form-label">
                            <span id="review-form-label" className="visually-hidden">Review form</span>
                            <Form.Label htmlFor="titleInput">Review title</Form.Label>
                            <Form.Control id="titleInput" placeholder={"Review Title"} ref={titleRef}></Form.Control>
                            <Form.Label htmlFor="commentInput">Review content</Form.Label>
                            <Form.Control id="commentInput" ref={contentRef}></Form.Control>
                            <Button type="submit" aria-label="Submit review">Submit</Button>
                        </Form>
                        <div role="status" aria-live="polite" style={{marginTop: '0.5rem'}}>{feedbackMessage}</div>
                    </Card>
                ) : (
                    <h1>Sign-up today to leave your own review!</h1>
                )}
                    {reviews.length != 0 ? reviews.map(r => <BookReview key={crypto.randomUUID()}{...r}></BookReview>) : <h2>Hm... no reviews here, maybe you could be the first!</h2>}
                </Col>
            </Row>
        </div>
    )
}

export default BookProfile
