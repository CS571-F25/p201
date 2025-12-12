import { useEffect, useState } from "react"
function BookPage() {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('bookname')
    const [currentBook, setCurrentBook] = useState({})
    useEffect(() => { fetchBooks() }, [])

    async function fetchBooks() {

        console.log(page)
        const apiBooks = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/books", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(res => Object.values(res.results)).then(res => res.find(r => r.title === page))
        console.log(apiBooks)
        setCurrentBook(apiBooks)
    }
    return <div>
        <h1>
            {page}
        </h1>
        <p style={{textAlign: "justify", marginLeft: 250, marginRight: 250}}>
        {currentBook.text}
        </p>
    </div>
}


export default BookPage;