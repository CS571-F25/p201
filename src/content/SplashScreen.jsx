import { Card } from "react-bootstrap"
import BookCard from "./BookCard"
import {Container} from "react-bootstrap"
import { useState, useEffect } from "react"
function SplashScreen() {
const [bookOTD, setBookOTD] = useState()

useEffect(() => {
    fetchBooks()
}, [])
async function fetchBooks() {
    const apiBooks = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/books", {
        headers: {
            "X-CS571-ID": CS571.getBadgerId()
        }
    }).then(res => res.json()).then(res => Object.values(res.results))
    console.log(apiBooks)
    setBookOTD(apiBooks[2])
}




    
    return <div style={{ alignItems: "center", padding: 40}}>

        <h1>Welcome to Crossroads!</h1>
        <h1>Featured book of the day!</h1>
        <Container className="d-flex align-items-center justify-content-center h-100vh">
            <BookCard {...bookOTD}></BookCard>
        </Container>
        <p style={{fontSize: 60}}><strong>That's right! It's {`${bookOTD?.title} Winter!`}</strong></p>
        <h2>It's a work in progress</h2>
        <h3>We'll have the proper systems up shortly</h3>
    </div>
}

export default SplashScreen