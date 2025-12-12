import { useContext, useState, useEffect } from "react"
import { Link } from "react-router"
import { Row, Col} from "react-bootstrap"
import DataContextProvider from "../contexts/DataContextProvider"
import BookCard from "./BookCard"
function Home(props) {
    const [websiteData, setWebsiteData] = useContext(DataContextProvider)
    const [books, setBooks] = useState([])
    const [tags, setTags] = useState([])
    console.log("home rendered")

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
        setBooks(apiBooks)
        recommendations(apiBooks)
    }


    function recommendations(thisBooks) {
        let recarray = []
        thisBooks.forEach(r => recarray.push(r.tags))
        recarray = recarray.flat(2)
        let setArray = [...new Set([...recarray])]
        setTags(setArray)
    }

    return <div>
        {websiteData.isLoggedIn ? websiteData.favorites.length == 0 ? <p style={{ fontSize: 25 }}>  <br />
            if only we had your favorite books to give you recommendations off of... may I suggest heading to the <Link to={"/p201/catalog"}>Catalog?</Link></p> :
            <>
             <h1>Recommendations</h1>
                <div style={{textAlign: "left"}}>{tags?.map(tag => (
                    <section key={tag}>
                       
                        <hr></hr>
                        <h2 style={{fontWeight: "bold"}}>{tag}</h2>
                      
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4" style={{borderBottom: 20}}>
                            {books
                                .filter(x => x.tags.includes(tag))
                                .map(z => (
                                    <Col key={z.title ?? z.id}>
                                        <BookCard {...z} />
                                    </Col>
                                ))}
                        </Row>
                       
                    </section>
                ))}</div>
            </>
            : <div style={{ fontSize: 40 }}>
                <p><strong>If only you had an account....</strong></p>
                <p><strong>Then maybe, here, you would see some....</strong></p>
                <p><strong>Recommendations, and other great books you could read!</strong></p>
                <Link to={"/p201/signup"}>
                    <p>Considering Signing Up?</p>
                </Link>
            </div>
        }
    </div>
}


export default Home;