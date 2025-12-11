import 'bootstrap/dist/css/bootstrap.min.css'; 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './structural/App';
import ReactDOM from 'react-dom/client'
//TODO make it so you update a review rather than publish a review if you already have one
// 1. show userProfiles
// 2. show preferences in home screen
// 3. add an event to the splash screen MOBY DICK WINTER!
// 4. add a 'follow user' system, show thise in home screen
// 5. basic signup system, we'll need a context to keep track of who
// 6. make it so liking or disliking affects a users and a reviews reputation
// 7. add a user search system
// 8. add a book search system, by tag and by name
// 9. add user reputation and reputation levels.
// 10. make it so a user profiles shows their reputation, their reputation level, their favorite books, their finished books (and how many they've finished), and their reviews
// 11. add friends system in contrast to following system, following is one way except for block, friend is two way
createRoot(document.getElementById('root')).render(
    <App />
)
