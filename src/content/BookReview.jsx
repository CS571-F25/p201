import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import DataContextProvider from "../contexts/DataContextProvider";
import { Link } from "react-router";
function BookReview(props) {
    const [websiteData, setWebsiteData] = useContext(DataContextProvider)
    const [reviewReputation, setReviewReputation] = useState(props.reputation)
    const params = new URLSearchParams(window.location.search)
    const page = params.get('bookname')
    // lets say props are user, time, title, and content

    // we need the like buttons and dislike buttons to not just update the reputation of the reviews, but the reputations of the user. 


    async function whoAmI() {
        const IamThisGuy = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/users", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        }).then(res => res.json()).then(res => Object.entries(res.results)).then(res => res.find(r => r[1]["username"] === props.user))
        return IamThisGuy
    }

    async function whichAmI() {
        const IamThisReview = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/reviews", {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        }).then(res => res.json()).then(res => Object.entries(res.results)).then(res => res.find(r => r[1]["id"] === props.id))
        return IamThisReview
    }

    async function likeButton() {
        const thisReview = await whichAmI()
        const thisUser = await whoAmI()
        const newReputation = reviewReputation + 1
        setReviewReputation(newReputation)

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/reviews?id=${thisReview[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                id: props.id,
                reviewedBook: page,
                user: props.user,
                title: props.title,
                reputation: newReputation,
                rating: props.rating,
                content: props.content,
                publishDate: props.publishDate
            })
        })

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/users?id=${thisUser[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: thisUser[1].username,
                password: thisUser[1].password,
                reputation: thisUser[1].reputation + 1,
                favorites: thisUser[1].favorites,
                readBooks: thisUser[1].readBooks
            })
        })

    }

    async function dislikeButton() {
        const thisReview = await whichAmI()
        const thisUser = await whoAmI()
        const newReputation = reviewReputation -1
        setReviewReputation(newReputation)

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/reviews?id=${thisReview[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                id: props.id,
                reviewedBook: page,
                user: props.user,
                title: props.title,
                reputation: newReputation,
                rating: props.rating,
                content: props.content,
                publishDate: props.publishDate
            })
        })

        fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/users?id=${thisUser[0]}`, {
            method: "PUT",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                username: thisUser[1].username,
                password: thisUser[1].password,
                reputation: thisUser[1].reputation - 1,
                favorites: thisUser[1].favorites,
                readBooks: thisUser[1].readBooks
            })
        })

    }

    return <div>
        <Card>
            <h1>{props.title}</h1>
            <h2>{`Rating: ${props.rating}`}</h2>
            <Link to={`/p201/userprofile?user=${props.user}`}>
            <h4>{`By ${props.user} on ${new Date(props.publishDate).toLocaleString()}`}</h4>
            </Link>
            <p style={{ fontSize: 25 }}>
                {props.content}
            </p>
            <p style={{ fontSize: 25 }}><strong>Reputation: </strong> {reviewReputation}</p>
            <Button onClick={likeButton}>Like</Button>
            <Button onClick={dislikeButton}>Dislike</Button>
        </Card>

    </div>
}

export default BookReview