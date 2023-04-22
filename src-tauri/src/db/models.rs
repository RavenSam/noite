use crate::schema::notes; // refers to the schema file generated by diesel
use serde::{Serialize};

#[derive(Queryable, Serialize, Debug)] // these annotation adds extra functionality to objects of this struct, Debug is for printing in console `dbg!(todo)`
pub struct Note {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub done: bool,
}

#[derive(Insertable, Serialize, Debug, Clone)]
#[table_name = "notes"]
pub struct NewNote<'a> {  // this struct will be use when inserting into the db, a struct can be Queryable and Insertable at the same time too. 
    pub title: &'a str,
    pub body: &'a str,
}