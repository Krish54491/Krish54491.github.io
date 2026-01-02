// this will a while so I'll start by writing what it should do first
// This component is not in pages because it will be used in almost every page

// Function that takes in a PageName: string and then returns the comments for that page
// The comments will be stored in a database, my first choice is supabase

// I'm going to make a backend api route to handle the comments, so the component will call that route
// The api route will handle fetching and adding comments to the database
export default function Comments({ pageName }) {

    // check if the page has a table for comments
    
    // else, fetch comments from the table for that page
}
// if the page has no table yet, create one
// The table will have the following columns:
// id: integer, primary key, auto increment
// username: string
// comment: string
// timestamp: datetime

// To add a comment, the user will input their username and comment in a form, however, I may change this to not use an account system later
// On submit the comment will go through validation (no empty comments, no profanity)
// Afterward, the comment will be added to the database with the current timestamp

// To fetch comments, the component will query the database for all comments in the table for that page, ordered by timestamp descending
// I may change it to have likes later, so the comments can be ordered by likes instead
// another thing I'll have to be aware of is pagination, I don't want to load 1000s of comments at once